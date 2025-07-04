import * as fs from 'fs';
import * as path from 'path';

interface Fact {
  id: string;
  date: string;
  translations: {
    'zh-TW': string;
    'zh-CN': string;
    'en': string;
    'ja': string;
    'ko': string;
  };
  source?: string;
}

interface ValidationError {
  index: number;
  id: string;
  field: string;
  message: string;
}

function validateFacts(): void {
  const factsPath = path.join(process.cwd(), 'data', 'facts.json');
  
  if (!fs.existsSync(factsPath)) {
    console.error('❌ facts.json 檔案不存在');
    process.exit(1);
  }

  let facts: Fact[];
  try {
    const content = fs.readFileSync(factsPath, 'utf-8');
    facts = JSON.parse(content);
  } catch {
    console.error('❌ facts.json 不是有效的 JSON 格式');
    process.exit(1);
  }

  if (!Array.isArray(facts)) {
    console.error('❌ facts.json 應該是一個陣列');
    process.exit(1);
  }

  const errors: ValidationError[] = [];
  const seenIds = new Set<string>();
  const seenDates = new Set<string>();

  // 檢查每個 fact 的格式
  facts.forEach((fact, index) => {
    // 檢查 id 格式
    if (!fact.id) {
      errors.push({
        index,
        id: 'N/A',
        field: 'id',
        message: 'id 欄位不能為空'
      });
    } else {
      const idPattern = /^\d{8}-\d{3}$/;
      if (!idPattern.test(fact.id)) {
        errors.push({
          index,
          id: fact.id,
          field: 'id',
          message: 'id 格式應為 YYYYMMDD-001'
        });
      } else {
        // 檢查重複 id
        if (seenIds.has(fact.id)) {
          errors.push({
            index,
            id: fact.id,
            field: 'id',
            message: '重複的 id'
          });
        } else {
          seenIds.add(fact.id);
        }
      }
    }

    // 檢查 date 格式
    if (!fact.date) {
      errors.push({
        index,
        id: fact.id || 'N/A',
        field: 'date',
        message: 'date 欄位不能為空'
      });
    } else {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!datePattern.test(fact.date)) {
        errors.push({
          index,
          id: fact.id || 'N/A',
          field: 'date',
          message: 'date 格式應為 YYYY-MM-DD'
        });
      } else {
        // 檢查重複日期
        if (seenDates.has(fact.date)) {
          errors.push({
            index,
            id: fact.id || 'N/A',
            field: 'date',
            message: '重複的日期'
          });
        } else {
          seenDates.add(fact.date);
        }

        // 檢查 id 和 date 是否對應
        if (fact.id && fact.date) {
          const idDate = fact.id.substring(0, 8);
          const expectedDate = fact.date.replace(/-/g, '');
          if (idDate !== expectedDate) {
            errors.push({
              index,
              id: fact.id,
              field: 'id/date',
              message: `id 日期 (${idDate}) 與 date (${expectedDate}) 不匹配`
            });
          }
        }
      }
    }

    // 檢查 translations
    if (!fact.translations) {
      errors.push({
        index,
        id: fact.id || 'N/A',
        field: 'translations',
        message: 'translations 欄位不能為空'
      });
    } else {
      const requiredLanguages = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'];
      
      for (const lang of requiredLanguages) {
        if (!fact.translations[lang as keyof typeof fact.translations]) {
          errors.push({
            index,
            id: fact.id || 'N/A',
            field: `translations.${lang}`,
            message: `缺少 ${lang} 翻譯`
          });
        } else if (fact.translations[lang as keyof typeof fact.translations] === '') {
          errors.push({
            index,
            id: fact.id || 'N/A',
            field: `translations.${lang}`,
            message: `${lang} 翻譯不能為空字串`
          });
        }
      }
    }
  });

  // 輸出結果
  if (errors.length > 0) {
    console.error('❌ facts.json 格式有誤：');
    errors.forEach(error => {
      console.error(`  第 ${error.index + 1} 筆 (${error.id}): ${error.field} - ${error.message}`);
    });
    process.exit(1);
  } else {
    console.log('✅ facts.json 格式正確');
    console.log(`   總共 ${facts.length} 筆資料`);
  }
}

// 執行驗證
validateFacts(); 
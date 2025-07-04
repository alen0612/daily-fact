"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
function validateFacts() {
    var factsPath = path.join(process.cwd(), 'data', 'facts.json');
    if (!fs.existsSync(factsPath)) {
        console.error('❌ facts.json 檔案不存在');
        process.exit(1);
    }
    var facts;
    try {
        var content = fs.readFileSync(factsPath, 'utf-8');
        facts = JSON.parse(content);
    }
    catch (_a) {
        console.error('❌ facts.json 不是有效的 JSON 格式');
        process.exit(1);
    }
    if (!Array.isArray(facts)) {
        console.error('❌ facts.json 應該是一個陣列');
        process.exit(1);
    }
    var errors = [];
    var seenIds = new Set();
    var seenDates = new Set();
    // 檢查每個 fact 的格式
    facts.forEach(function (fact, index) {
        // 檢查 id 格式
        if (!fact.id) {
            errors.push({
                index: index,
                id: 'N/A',
                field: 'id',
                message: 'id 欄位不能為空'
            });
        }
        else {
            var idPattern = /^\d{8}-\d{3}$/;
            if (!idPattern.test(fact.id)) {
                errors.push({
                    index: index,
                    id: fact.id,
                    field: 'id',
                    message: 'id 格式應為 YYYYMMDD-001'
                });
            }
            else {
                // 檢查重複 id
                if (seenIds.has(fact.id)) {
                    errors.push({
                        index: index,
                        id: fact.id,
                        field: 'id',
                        message: '重複的 id'
                    });
                }
                else {
                    seenIds.add(fact.id);
                }
            }
        }
        // 檢查 date 格式
        if (!fact.date) {
            errors.push({
                index: index,
                id: fact.id || 'N/A',
                field: 'date',
                message: 'date 欄位不能為空'
            });
        }
        else {
            var datePattern = /^\d{4}-\d{2}-\d{2}$/;
            if (!datePattern.test(fact.date)) {
                errors.push({
                    index: index,
                    id: fact.id || 'N/A',
                    field: 'date',
                    message: 'date 格式應為 YYYY-MM-DD'
                });
            }
            else {
                // 檢查重複日期
                if (seenDates.has(fact.date)) {
                    errors.push({
                        index: index,
                        id: fact.id || 'N/A',
                        field: 'date',
                        message: '重複的日期'
                    });
                }
                else {
                    seenDates.add(fact.date);
                }
                // 檢查 id 和 date 是否對應
                if (fact.id && fact.date) {
                    var idDate = fact.id.substring(0, 8);
                    var expectedDate = fact.date.replace(/-/g, '');
                    if (idDate !== expectedDate) {
                        errors.push({
                            index: index,
                            id: fact.id,
                            field: 'id/date',
                            message: "id \u65E5\u671F (".concat(idDate, ") \u8207 date (").concat(expectedDate, ") \u4E0D\u5339\u914D")
                        });
                    }
                }
            }
        }
        // 檢查 translations
        if (!fact.translations) {
            errors.push({
                index: index,
                id: fact.id || 'N/A',
                field: 'translations',
                message: 'translations 欄位不能為空'
            });
        }
        else {
            var requiredLanguages = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'];
            for (var _i = 0, requiredLanguages_1 = requiredLanguages; _i < requiredLanguages_1.length; _i++) {
                var lang = requiredLanguages_1[_i];
                if (!fact.translations[lang]) {
                    errors.push({
                        index: index,
                        id: fact.id || 'N/A',
                        field: "translations.".concat(lang),
                        message: "\u7F3A\u5C11 ".concat(lang, " \u7FFB\u8B6F")
                    });
                }
                else if (fact.translations[lang] === '') {
                    errors.push({
                        index: index,
                        id: fact.id || 'N/A',
                        field: "translations.".concat(lang),
                        message: "".concat(lang, " \u7FFB\u8B6F\u4E0D\u80FD\u70BA\u7A7A\u5B57\u4E32")
                    });
                }
            }
        }
    });
    // 輸出結果
    if (errors.length > 0) {
        console.error('❌ facts.json 格式有誤：');
        errors.forEach(function (error) {
            console.error("  \u7B2C ".concat(error.index + 1, " \u7B46 (").concat(error.id, "): ").concat(error.field, " - ").concat(error.message));
        });
        process.exit(1);
    }
    else {
        console.log('✅ facts.json 格式正確');
        console.log("   \u7E3D\u5171 ".concat(facts.length, " \u7B46\u8CC7\u6599"));
    }
}
// 執行驗證
validateFacts();

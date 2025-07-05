'use client';

import { useEffect, useRef, useState } from 'react';

// 擴展 Window 介面以包含 adsbygoogle
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface GoogleAdProps {
  adSlot?: string;
  adStyle?: React.CSSProperties;
}

// 全域變數追蹤 script 是否已載入
let scriptLoaded = false;
let scriptLoading = false;

const GoogleAd: React.FC<GoogleAdProps> = ({ adStyle }) => {
  const adRef = useRef<HTMLModElement>(null);
  const [isAdInitialized, setIsAdInitialized] = useState(false);

  // 根據環境決定廣告單位 ID
  const getAdUnitId = (): string | null => {
    if (process.env.NODE_ENV !== 'production') {
      // 測試環境使用 Google 提供的測試廣告單位
      return 'ca-app-pub-3940256099942544/6300978111';
    }
    
    // 正式環境使用環境變數
    return process.env.NEXT_PUBLIC_ADSENSE_UNIT_ID || null;
  };

  // 載入 Google AdSense script
  const loadAdSenseScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // 如果 script 已經載入，直接 resolve
      if (scriptLoaded) {
        resolve();
        return;
      }

      // 如果 script 正在載入中，等待載入完成
      if (scriptLoading) {
        const checkLoaded = setInterval(() => {
          if (scriptLoaded) {
            clearInterval(checkLoaded);
            resolve();
          }
        }, 100);
        return;
      }

      // 開始載入 script
      scriptLoading = true;
      
      // 檢查是否已經存在 script 標籤
      const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
      if (existingScript) {
        scriptLoaded = true;
        scriptLoading = false;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        scriptLoaded = true;
        scriptLoading = false;
        resolve();
      };

      script.onerror = () => {
        scriptLoading = false;
        reject(new Error('Failed to load Google AdSense script'));
      };

      document.head.appendChild(script);
    });
  };

  // 初始化廣告
  const initializeAd = (): void => {
    if (!adRef.current || isAdInitialized) return;

    try {
      // 確保 window.adsbygoogle 存在
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setIsAdInitialized(true);
      }
    } catch (error) {
      console.error('Failed to initialize Google Ad:', error);
    }
  };

  useEffect(() => {
    const adUnitId = getAdUnitId();
    
    // 如果沒有廣告單位 ID，不顯示廣告
    if (!adUnitId) {
      return;
    }

    // 載入 script 並初始化廣告
    const setupAd = async (): Promise<void> => {
      try {
        await loadAdSenseScript();
        
        // 等待一小段時間確保 script 完全載入
        setTimeout(() => {
          initializeAd();
        }, 100);
      } catch (error) {
        console.error('Failed to setup Google Ad:', error);
      }
    };

    setupAd();
  }, [isAdInitialized]);

  const adUnitId = getAdUnitId();

  // 如果沒有廣告單位 ID，不渲染任何內容
  if (!adUnitId) {
    return null;
  }

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{
        display: 'block',
        width: '100%',
        height: '90px',
        ...adStyle,
      }}
      data-ad-client="ca-pub-3940256099942544"
      data-ad-slot={adUnitId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default GoogleAd; 
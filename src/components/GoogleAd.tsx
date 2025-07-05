'use client';

import { useEffect, useRef } from 'react';

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

const GoogleAd: React.FC<GoogleAdProps> = ({ adStyle }) => {
  const adRef = useRef<HTMLModElement>(null);
  const scriptLoadedRef = useRef(false);

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
  const loadAdSenseScript = (): void => {
    if (scriptLoadedRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      scriptLoadedRef.current = true;
    };

    document.head.appendChild(script);
  };

  useEffect(() => {
    const adUnitId = getAdUnitId();
    
    // 如果沒有廣告單位 ID，不顯示廣告
    if (!adUnitId) {
      return;
    }

    // 載入 AdSense script
    loadAdSenseScript();

    // 等待 script 載入完成後執行廣告
    const initAd = (): void => {
      if (adRef.current && window.adsbygoogle) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.error('Failed to initialize Google Ad:', error);
        }
      }
    };

    // 如果 script 已經載入，直接初始化廣告
    if (scriptLoadedRef.current) {
      initAd();
    } else {
      // 等待 script 載入完成
      const checkScriptLoaded = setInterval(() => {
        if (scriptLoadedRef.current) {
          clearInterval(checkScriptLoaded);
          initAd();
        }
      }, 100);
    }
  }, []);

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
        textAlign: 'center',
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
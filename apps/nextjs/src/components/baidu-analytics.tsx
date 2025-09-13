"use client";

import Script from "next/script";

// 百度统计 Site ID - 可以通过环境变量配置
const BAIDU_ANALYTICS_ID = process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID || "05660bc858c568ae60f756691253464c";

export function BaiduAnalytics() {
  // 只在生产环境加载百度统计
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  // 如果没有配置 ID，不加载统计代码
  if (!BAIDU_ANALYTICS_ID) {
    return null;
  }

  return (
    <Script
      id="baidu-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?${BAIDU_ANALYTICS_ID}";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
        `,
      }}
    />
  );
}
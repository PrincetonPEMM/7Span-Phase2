import { IS_PRODUCTION } from "@/utils/seo";
import Script from "next/script";

// Keeps the Google Analytics property that was previously hard-coded on a few
// pages until the client's new property id is set in NEXT_PUBLIC_GA_ID.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-L1XB3HXBQM";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

// Tracking only runs on the production site, so local, dev and staging
// visits do not show up in the analytics.
const Analytics = () =>
  !IS_PRODUCTION ? null : (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
          </Script>
        </>
      )}
      {CLARITY_ID && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","${CLARITY_ID}");
        `}
        </Script>
      )}
    </>
  );

export default Analytics;

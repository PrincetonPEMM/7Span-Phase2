import React from "react";
import Stories from "../components/Stories";
import Script from 'next/script'

export const dynamic = "force-dynamic";

const StoryPage = async () => {
  return 
  <>
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-L1XB3HXBQM" />
    <Script id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-L1XB3HXBQM');
      `}
    </Script>
    <Stories />;
  </>
};

export default StoryPage;

import React from "react";
import Script from "next/script";
import Stories from "../components/Stories";

export const dynamic = "force-dynamic";

const StoryPage = async () => {
  return (
    <main>
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
    </main>
  );
};

export default StoryPage;

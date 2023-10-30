import React from "react";
import ManuScripts from "../components/ManuScripts";
import Script from 'next/script'

export const dynamic = "force-dynamic";

const page = () => {
  return (
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
      <div>
        <ManuScripts />
      </div>
    </>
  );
};

export default page;

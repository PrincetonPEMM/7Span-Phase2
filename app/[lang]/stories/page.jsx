import React from "react";
import Script from "next/script";
import Stories from "../components/Stories";

export const dynamic = "force-dynamic";

const StoryPage = async ({ params }) => {
  const localStr = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}string_localization?language=${params.lang}`
  );
  const localData = await localStr.json();

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
      <Stories localData={localData} />;
    </main>
  );
};

export default StoryPage;

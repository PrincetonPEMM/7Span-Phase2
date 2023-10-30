import React from "react";
import Paintings from "../components/Paintings";
import Script from 'next/script'

export const dynamic = "force-dynamic";

const Page = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/filters`
  );
  const filters = await res.json();

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
      <Hero data={result} />
      <div>
        <Paintings {...filters} />
      </div>
    </>
  );
};

export default Page;

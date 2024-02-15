import React from "react";
import PaintingDetail from "../../components/PaintingDetail";
import Script from "next/script";

export const dynamic = "force-dynamic";

const Page = async ({ params }) => {
  const { slug } = params;

  let data = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/${slug}`
    );

    data = await response.json();
  } catch (error) {
    console.log("Error", error);
  }

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
      <PaintingDetail data={data[0]} localData={localData} />
    </main>
  );
};

export default Page;

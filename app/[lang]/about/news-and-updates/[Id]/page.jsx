export const dynamic = "force-dynamic";
import DetailPage from "@/app/[lang]/components/DetailPage";
import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import React from "react";
import { buildDetailMetadata, pick } from "@/utils/seo";
import { getCmsSeo } from "@/utils/seoData";

export async function generateMetadata({ params }) {
  const { Id, lang } = await params;
  let data = null;
  try {
    const items = await client.request(
      readItems("news_and_updates", {
        fields: ["*.*.*"],
        filter: { id: Id },
      }),
    );
    data = items[0];
  } catch (e) {
    console.log(e);
  }

  const seo = Id
    ? await getCmsSeo("news_and_updates", { id: { _eq: Id } }, lang)
    : {};

  return buildDetailMetadata({
    title: pick(seo.title, data?.title),
    description: pick(seo.description, data?.intro, data?.description),
    path: `/about/news-and-updates/${Id}`,
    lang,
    image: seo.image,
    noIndex: seo.noIndex,
    noFollow: seo.noFollow,
  });
}

const Page = async ({ params }) => {
  const { Id } = await params;
  let data = null;

  try {
    data = await client.request(
      readItems("news_and_updates", {
        fields: ["*.*.*"],
        filter: { id: Id },
      }),
    );
    data = data[0];
  } catch (e) {
    console.log(e);
  }

  return data ? (
    <DetailPage
      image={data?.image_link}
      title={data?.title}
      author={data?.author}
      date={data?.date}
      intro={data?.intro}
      description={data?.description}
    />
  ) : (
    <div className="flex items-center py-36 justify-center w-full text-2xl text-primary-500 font-bold">
      <h1>Records Not Found</h1>
    </div>
  );
};

export default Page;

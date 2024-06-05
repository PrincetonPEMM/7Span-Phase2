import { createDirectus, rest } from "@directus/sdk";

export const client = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL).with(
  rest()
);

export const checkPathWiseWorningMsg = (selectedLanguage, pathname) => {
  if (selectedLanguage.code === "en-us") return true;
  let path = pathname.split("/");
  path.shift();
  path.shift();
  let detailPath = path;
  path = path.join("/") || "";
  detailPath[detailPath.length - 1] = "id";
  detailPath = detailPath.join("/");

  return (
    selectedLanguage?.translated_pages?.includes(`/${path}`) ||
    (pathname.split("/").length > 3 &&
      selectedLanguage?.translated_pages?.includes(`/${detailPath}`))
  );
};

// import { readItems, Directus } from "@directus/sdk";
// version -- 10.1.1
// const directus = new Directus("https://pemm-directus.preview.im/");
// const result = await directus.get("stories");
// const result = await client.request(
//   readItems("home", {
//     fields: ["*.*.*"],
//     // fields: ["title", "date_created", { authors: ["name"] }],
//   })
// );
// const result = await directus.transport.get("stories");
// const result = await directus.transport.get("items/home");
// const result = await directus.collections.readOne("home");

// const result = await directus.items("home");

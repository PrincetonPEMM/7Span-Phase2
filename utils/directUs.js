import { createDirectus, rest } from "@directus/sdk";

export const client = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL).with(
  rest()
);

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

// console.log("Hello", directus);
// const result = await directus.items("home");

// console.log("Hello ", result, await result.transport.axios.get());

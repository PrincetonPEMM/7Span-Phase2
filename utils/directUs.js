import { createDirectus, rest } from "@directus/sdk";

export const client = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL).with(
  rest()
);

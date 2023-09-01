import React from "react";
import Paintings from "../components/Paintings";

export const dynamic = "force-dynamic";

const Page = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/filters`
  );
  const filters = await res.json();

  console.log(filters, "Filters");

  return (
    <div>
      <Paintings {...filters} />
    </div>
  );
};

export default Page;

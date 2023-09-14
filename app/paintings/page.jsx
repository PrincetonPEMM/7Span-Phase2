import React from "react";
import Paintings from "../components/Paintings";

export const dynamic = "force-dynamic";

const Page = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}paintings/filters`
  );
  const filters = await res.json();

  return (
    <div>
      <Paintings {...filters} />
      {/* <ComingSoon/> */}
    </div>
  );
};

export default Page;

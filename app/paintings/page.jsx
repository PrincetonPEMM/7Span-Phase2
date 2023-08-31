import React from "react";
import Paintings from "../components/Paintings";
import ComingSoon from "../components/ComingSoon";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <div>
      {/* <ComingSoon /> */}
      <Paintings />
    </div>
  );
};

export default Page;

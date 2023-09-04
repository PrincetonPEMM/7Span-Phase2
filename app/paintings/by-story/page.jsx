import React from "react";
import PaintingByStoryIndex from "@/app/components/PaintingByStoryIndex";
import ComingSoon from "@/app/components/ComingSoon";

export const dynamic = "force-dynamic";

const Page = async () => {
  return <ComingSoon />; //<PaintingByStoryIndex />;
};

export default Page;

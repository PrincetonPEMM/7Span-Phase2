import { redirect, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  redirect("/about/mission#our-mission");
  return <div>Loading...</div>;
};

export default page;

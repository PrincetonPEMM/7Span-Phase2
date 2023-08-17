import React from "react";
import ManuscriptDetail from "../components/ManuscriptDetail";

const page = () => {
  const menudetail = [
    {
      text: "lorem ipsum dolor site amrt ",
    },
  ];
  return (
    <div>
      <ManuscriptDetail menudetail={menudetail} />
    </div>
  );
};

export default page;

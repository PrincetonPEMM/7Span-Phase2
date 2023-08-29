import React from "react";
import Table from "./Table";
import { MANUSCRIPT_DETAIL } from "@/utils/constant";

const ManuscriptDetail = ({ menudetail }) => {
  const tableData = [
    { earliest_attestation: "hello" },
    {
      canonical_story_id: "hello",
    },
  ];
  const tableHeader = [
    {
      name: "id",
    },
    {
      name: "Story TItle",
    },
    {
      name: "Id Certa inty",
    },
    {
      name: "Location in MS",
    },
    {
      name: "Location in MS",
    },
    {
      name: "Inipit",
    },
    {
      name: "Painitngs",
    },
  ];
  return (
    <div className="container-fliud">
      <div className="pb-12">
        <h2 className="font-menu text-2xl lg:text-3xl xl:text-5xl font-medium">
          British Library "Orient" Collection, Manuscript No . 520
        </h2>
        <div className="space-y-p">
          {menudetail.map((data, index) => (
            <p key={index}>{data.text}</p>
          ))}
        </div>
        <div className="pt-5">
          <h3 className="font-menu text-2xl lg:text-3xl xl:text-5xl font-medium">
            EMIP (EMIP) 981a
          </h3>

          <Table
            isPageName={MANUSCRIPT_DETAIL}
            tableData={tableData}
            tableHeader={tableHeader}
          />
        </div>
      </div>
    </div>
  );
};

export default ManuscriptDetail;

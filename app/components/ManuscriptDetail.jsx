import React from "react";
import Table from "./Table";

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
      <h2 className="font-menu text-5xl font-medium">
        British Library "Orient" Collection, Manuscript No . 520
      </h2>
      <div className="space-y-p">
        {menudetail.map((data, index) => (
          <p key={index}>{data.text}</p>
        ))}
      </div>
      <h3 className="font-menu text-5xl font-medium">EMIP (EMIP) 981a</h3>

      <Table tableData={tableData} tableHeader={tableHeader} />
    </div>
  );
};

export default ManuscriptDetail;

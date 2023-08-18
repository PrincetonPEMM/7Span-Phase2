import React from "react";
import ManuscriptDetail from "../components/ManuscriptDetail";

const page = () => {
  const menudetails = [
    {
      text: "This Gəˁəz (classical Ethiopic) language manuscript was created between 1907 and 1908. This date is precise, based on the scribe noting the date in the manuscript.",
    },
    {
      text: "This manuscript's last known location (i.e., where it was microfilmed or digitized at some point in the past forty years) is the repository of Mihur Eyesus Monastery in Gurage Province, Ethiopia. A digital copy of this manuscript is held by Ethiopian Manuscript Imaging Project, Hill Museum and Manuscript Library & Beta Masaheft in Portland, OR , United States.",
    },
    {
      text: "This manuscript's last known location (i.e., where it was microfilmed or digitized at some point in the past forty years) is the repository of Mihur Eyesus Monastery in Gurage Province, Ethiopia. A digital copy of this manuscript is held by Ethiopian Manuscript Imaging Project, Hill Museum and Manuscript Library & Beta Masaheft in Portland, OR , United States.",
    },
    {
      text: "This manuscript's last known location (i.e., where it was microfilmed or digitized at some point in the past forty years) is the repository of Mihur Eyesus Monastery in Gurage Province, Ethiopia. A digital copy of this manuscript is held by Ethiopian Manuscript Imaging Project, Hill Museum and Manuscript Library & Beta Masaheft in Portland, OR , United States.",
    },
    {
      text: "This manuscript's last known location (i.e., where it was microfilmed or digitized at some point in the past forty years) is the repository of Mihur Eyesus Monastery in Gurage Province, Ethiopia. A digital copy of this manuscript is held by Ethiopian Manuscript Imaging Project, Hill Museum and Manuscript Library & Beta Masaheft in Portland, OR , United States.",
    },
  ];
  return (
    <div>
      <ManuscriptDetail menudetail={menudetails} />
    </div>
  );
};

export default page;

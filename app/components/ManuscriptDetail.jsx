import React from "react";

const ManuscriptDetail = ({ menudetail }) => {
  return (
    <div>
      <h2>British L ibrary "Orient" Collection, M anuscript N o . 520</h2>
      {menudetail.map((data, index) => {
        <p key={index}>{data.text}</p>;
      })}
    </div>
  );
};

export default ManuscriptDetail;

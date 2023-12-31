import React from "react";

export const dynamic = "force-dynamic";
const NotFound = () => {
  return (
    <div className="flex items-center justify-center  p-10 md:p-24">
      <h3 className="text-primary-500 text-6xl font-header tracking-wide">
        Page not found!
      </h3>
    </div>
  );
};

export default NotFound;

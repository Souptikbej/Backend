import React from "react";
import Foodform from "./Foodform";
import Fooddisplay from "./Fooddisplay";

const Merge = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:sticky lg:top-8 self-start">
          <Foodform />
        </div>
        <div>
          <Fooddisplay />
        </div>
      </div>
    </div>
  );
};

export default Merge;

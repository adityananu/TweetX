import React from "react";

const Loading = () => {
  return (
    <div className="w-[45rem] flex py-8 p-5 mb-5 rounded-lg bg-[#FFFFFF] shadow-sm animate-pulse">
      <div className="h-[50px] w-[50px] rounded-full border bg-gray-200"></div>
      <div className="px-5 w-[90%]">
        <div className="flex justify-between w-full">
          <div className="font-semibold text-lg bg-gray-200 h-6 w-1/4"></div>
          <div className="bg-gray-200 h-6 w-1/4"></div>
        </div>
        <div className="bg-gray-200 h-6 w-full mt-2"></div>
      </div>
    </div>
  );
};

export default Loading;

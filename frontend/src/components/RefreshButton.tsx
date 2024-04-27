import React from "react";

const RefreshButton = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <button
        onClick={refreshPage}
        className="rounded-full border-4 border-red-600 bg-red-600 text-white p-4 hover:bg-transparent transition-all duration-300 ease-in-out cursor-pointer scale-75"
        title="Refresh Data"
      >
        <img
          src="/refresh.png"
          alt="reload page"
          className="w-[50px] h-[50px]"
        />
      </button>
    </div>
  );
};

export default RefreshButton;

"use client";
import React from "react";

const Devfolio_Button = () => {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="cursor-target flex justify-center items-center mt-6
             scale-[0.75] sm:scale-[0.85] md:scale-[0.95] lg:scale-100 xl:scale-100"
    >
      <div
        className="apply-button"
        data-hackathon-slug="electrothon-8"
        data-button-theme="light"
        style={{ height: "44px", width: "312px" }}
      />
    </div>
  );
};

export default Devfolio_Button;
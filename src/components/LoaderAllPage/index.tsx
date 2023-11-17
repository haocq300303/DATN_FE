import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const showLoader = () => {
    const loaderEl = document.getElementById("loader-all-page");
    if (loaderEl) loaderEl.style.display = "flex";
};

// eslint-disable-next-line react-refresh/only-export-components
export const hideLoader = () => {
    const loaderEl = document.getElementById("loader-all-page");
    if (loaderEl) loaderEl.style.display = "none";
};

const LoaderAllPage = () => {
    return (
        <div id="loader-all-page" className="fixed inset-0 bg-[#a9a9a959] hidden" style={{ zIndex: "9999" }}>
            <span className="m-auto">Loading...</span>
        </div>
    );
};

export default LoaderAllPage;

import React from "react";
import PaginationContainerMain from "react-js-pagination";

const PaginationContainer = (props) => (
  <PaginationContainerMain
    innerClass="mb-0 pagination"
    itemClass="page-item"
    linkClass="page-link"
    pageRangeDisplayed={10}
    {...props}
  />
);

export default PaginationContainer;

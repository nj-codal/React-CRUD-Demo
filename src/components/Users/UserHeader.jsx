import React from "react";

const UserHeader = ({ children }) => (
  <div className="d-flex justify-content-between align-items-center my-4">
    <h1 className="mb-0">Users</h1>
    <div className="d-flex">{children}</div>
  </div>
);

export default React.memo(UserHeader);

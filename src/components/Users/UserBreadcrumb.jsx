import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/Common/Breadcrumb";

const UserBreadcrumb = ({ active = "", data = [] }) => (
  <Breadcrumb
    data={[
      {
        id: 1,
        item: <Link to="/users">Users</Link>,
      },
      ...data,
      {
        id: data.length + 2,
        isActive: true,
        item: active,
      },
    ]}
  />
);

export default React.memo(UserBreadcrumb);

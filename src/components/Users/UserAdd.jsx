import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import UserBreadcrumb from "@/components/Users/UserBreadcrumb";
import UserForm from "@/components/Users/UserForm";
import UserHeader from "@/components/Users/UserHeader";

const UserAdd = () => (
  <>
    <UserBreadcrumb active="Add" />
    <UserHeader>
      <Link className="text-decoration-none" to="/users">
        <Button>
          <i className="fa fa-arrow-left fa-xs me-2" />
          Back to List
        </Button>
      </Link>
    </UserHeader>
    <UserForm />
  </>
);

export default React.memo(UserAdd);

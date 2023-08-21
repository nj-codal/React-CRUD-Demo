import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import UserBreadcrumb from "@/components/Users/UserBreadcrumb";
import UserForm from "@/components/Users/UserForm";
import UserHeader from "@/components/Users/UserHeader";
import { getUserById } from "@/modules/user";
import { isValidObject } from "@/modules/utils";

const Edit = () => {
  let params = useParams();

  const user = getUserById(params.id);

  if (!isValidObject(user)) {
    return <Navigate to="/users" replace />
  }

  return (
    <>
      <UserBreadcrumb active="Edit" />
      <UserHeader>
        <Link className="text-decoration-none" to="/users">
          <Button>
            <i className="fa fa-arrow-left fa-xs me-2" />
            Back to List
          </Button>
        </Link>
      </UserHeader>
      <UserForm id={params.id} />
    </>
  );
};

export default Edit;

import { Link, Navigate, useParams } from "react-router-dom";
import { Button, Card, Table } from "reactstrap";
import UserBreadcrumb from "@/components/Users/UserBreadcrumb";
import Delete from "@/components/Users/UserDelete";
import UserHeader from "@/components/Users/UserHeader";
import genderOptions from "@/data/user";
import { getUserById, showDate, showEmail, showStatus } from "@/modules/user";
import { isValidObject } from "@/modules/utils";

const Details = () => {
  let params = useParams();

  const user = getUserById(params.id);

  if (!isValidObject(user)) {
    return <Navigate to="/users" replace />
  }

  return (
    <>
      <UserBreadcrumb active="Details" />
      <UserHeader>
        <Link className="text-decoration-none" to="/users">
          <Button>
            <i className="fa fa-arrow-left fa-xs me-2" />
            Back to List
          </Button>
        </Link>
      </UserHeader>
      <Card body>
        <Table bordered hover>
          <tbody>
            <tr>
              <th scope="row">First Name</th>
              <td>{user.firstName}</td>
            </tr>
            <tr>
              <th scope="row">Last Name</th>
              <td>{user.lastName}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{showEmail(user.email)}</td>
            </tr>
            <tr>
              <th scope="row">Gender</th>
              <td>{genderOptions?.[user?.gender] || genderOptions?.M}</td>
            </tr>
            <tr>
              <th scope="row">Age</th>
              <td>{user.age}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>{user.address}</td>
            </tr>
            <tr>
              <th scope="row">Note</th>
              <td>{user.note}</td>
            </tr>
            <tr>
              <th scope="row">Created At</th>
              <td>{showDate(user.createdAt)}</td>
            </tr>
            <tr>
              <th scope="row">Updated At</th>
              <td>{showDate(user.updatedAt)}</td>
            </tr>
            <tr>
              <th scope="row">Status</th>
              <td>{showStatus(user.status)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">
                <div className="d-flex">
                  <Link
                    className="text-decoration-none me-2"
                    to={`/users/edit/${user.id}`}
                  >
                    <Button outline>
                      <i className="fa fa-pencil fa-xs me-2" />
                      Edit
                    </Button>
                  </Link>
                  <Delete doRedirect flagLabel id={user.id} />
                </div>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Card>
    </>
  );
};

export default Details;

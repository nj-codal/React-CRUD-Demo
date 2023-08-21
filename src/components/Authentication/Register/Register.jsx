import { NavLink } from "react-router-dom";
import { Card } from "reactstrap";
import CardWrapper from "@/components/Authentication/CardWrapper";

const Register = () => (
  <CardWrapper title="Register">
    <Card body className="mt-4 mb-4">
      <div>Coming Soon...</div>
    </Card>
    <div className="text-dark mt-4 mb-4">
      <i className="fa fa-arrow-left fa-xs" />{" "}
      <NavLink to="/login">Back to Login</NavLink>
    </div>
  </CardWrapper>
);

export default Register;

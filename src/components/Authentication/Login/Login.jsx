import { NavLink } from "react-router-dom";
import { Card } from "reactstrap";
import CardWrapper from "@/components/Authentication/CardWrapper";
import LoginForm from "@/components/Authentication/Login/LoginForm";

const Login = () => (
  <CardWrapper title="Login">
    <Card body className="mt-4 mb-4">
      <LoginForm />
      <div className="text-dark">
        Don't have an account? <NavLink to="/register">Sign up</NavLink>
      </div>
    </Card>
  </CardWrapper>
);

export default Login;

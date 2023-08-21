import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";
import { Formik } from "formik";
import asteriskSign from "@/components/Common/AsteriskSign";
import { doLogin } from "@/modules/authentication";
import { loginValidation } from "@/modules/validations";

const adminEmail = "nirav@admin.com";
const adminPassword = "123456";

const LoginForm = () => {
  let navigate = useNavigate();

  const handleSubmit = (values) => {
    const { email, password } = values;
    if (email === adminEmail && password === adminPassword) {
      doLogin();
      navigate("/dashboard");
    }
  };

  return (
    <Formik
      initialValues={{
        email: adminEmail,
        password: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={loginValidation()}
    >
      {({ errors, handleChange, handleSubmit, values }) => (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email Address {asteriskSign}</Label>
            <Input
              id="email"
              invalid={!!errors.email}
              name="email"
              onChange={handleChange}
              placeholder={adminEmail}
              value={values.email}
            />
            <FormFeedback>{errors.email}</FormFeedback>
            <FormText>Hint: {adminEmail}</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password {asteriskSign}</Label>
            <Input
              id="password"
              invalid={!!errors.password}
              name="password"
              onChange={handleChange}
              placeholder={adminPassword}
              value={values.password}
            />
            <FormFeedback>{errors.password}</FormFeedback>
            <FormText>Hint: {adminPassword}</FormText>
          </FormGroup>
          <FormGroup>
            <Button block color="primary" type="submit">
              Login
              <i className="fa fa-arrow-right ms-2" />
            </Button>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

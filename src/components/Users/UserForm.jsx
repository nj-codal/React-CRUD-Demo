import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import asteriskSign from "@/components/Common/AsteriskSign";
import { defaultUser, genderOptions, statusOptions } from "@/data/user";
import { Formik } from "formik";
import {
  createUser,
  getRandomUser,
  getUserById,
  updateUser,
} from "@/modules/user";
import { later } from "@/modules/utils";
import { userFormValidation } from "@/modules/validations";

const UserForm = ({ id = "" }) => {
  const [isLoading, setLoading] = useState(false);

  let navigate = useNavigate();

  const isEdit = !!id;

  const handleSubmit = (values) => {
    setLoading(true);

    if (isEdit) {
      updateUser(id, values);
    } else {
      createUser(values);
    }

    later(1500).finally(() => {
      setLoading(false);
      navigate("/users");
    });
  };

  const renderSubmit = () => {
    if (isLoading) {
      return (
        <i
          className="fa fa-circle-notch fa-spin"
          aria-hidden="true"
          style={{ height: 16, width: 16 }}
        />
      );
    }

    return isEdit ? "Update" : "Add";
  };

  const initialValues = isEdit
    ? {
        ...defaultUser,
        ...getUserById(id),
      }
    : defaultUser;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={userFormValidation()}
    >
      {({
        errors,
        handleChange,
        handleSubmit,
        setFieldValue,
        setValues,
        submitCount,
        values,
      }) => {
        const getError = (key) => submitCount > 0 && errors[key];

        const handleRandomData = () => {
          setValues(getRandomUser());
        };

        return (
          <Card body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label for="firstName">First Name {asteriskSign}</Label>
                    <Input
                      id="firstName"
                      invalid={!!getError("firstName")}
                      name="firstName"
                      onChange={handleChange}
                      value={values.firstName}
                    />
                    <FormFeedback>{getError("firstName")}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="lastName">Last Name {asteriskSign}</Label>
                    <Input
                      id="lastName"
                      invalid={!!getError("lastName")}
                      name="lastName"
                      onChange={handleChange}
                      value={values.lastName}
                    />
                    <FormFeedback>{getError("lastName")}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="email">Email Address {asteriskSign}</Label>
                <Input
                  id="email"
                  invalid={!!getError("email")}
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
                <FormFeedback>{getError("email")}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>Gender {asteriskSign}</Label>
                <div>
                  <ButtonGroup>
                    {Object.keys(genderOptions).map((key) => (
                      <Button
                        active={values.gender === key}
                        color="secondary"
                        key={key}
                        onClick={() => setFieldValue("gender", key)}
                        outline
                        type="button"
                      >
                        {genderOptions[key]}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
              </FormGroup>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input
                  id="address"
                  invalid={!!getError("address")}
                  name="address"
                  onChange={handleChange}
                  value={values.address}
                  type="textarea"
                />
                <FormFeedback>{getError("address")}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="note">Note</Label>
                <Input
                  id="note"
                  invalid={!!getError("note")}
                  name="note"
                  onChange={handleChange}
                  value={values.note}
                  type="textarea"
                />
                <FormFeedback>{getError("note")}</FormFeedback>
              </FormGroup>
              <FormGroup className="pb-4">
                <Label>Status {asteriskSign}</Label>
                <div>
                  <ButtonGroup>
                    {Object.keys(statusOptions).map((key) => (
                      <Button
                        active={values.status === key}
                        color="secondary"
                        key={key}
                        onClick={() => setFieldValue("status", key)}
                        outline
                        type="button"
                      >
                        {statusOptions[key]}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
              </FormGroup>
              <FormGroup className="d-flex justify-content-between">
                <Button
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                  style={{ minWidth: 200 }}
                >
                  {renderSubmit()}
                </Button>
                <Button
                  color="secondary"
                  type="button"
                  disabled={isLoading}
                  style={{ minWidth: 200, marginLeft: 10 }}
                  outline
                  onClick={handleRandomData}
                >
                  <i className="fa fa-random" style={{ marginRight: 10 }} />
                  Random Data
                </Button>
              </FormGroup>
            </Form>
          </Card>
        );
      }}
    </Formik>
  );
};

export default UserForm;

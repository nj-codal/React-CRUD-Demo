import * as Yup from "yup";

const errorMessages = {
  required: "Required",
  invalidValue: "Value is invalid",
  invalidEmail: "Invalid email",
  numberNotZero: "Value has to be bigger than 0,01",
  confirmPasswordMatch: "Passwords must match",
  passwordLength: "Password must be at least 6 characters",
};

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isAlphabetic = (value) => /^[a-zA-Z]+$/.test(value);

export const numberTransform = (value) =>
  !Number.isNaN(value) ? Number(value) : 0;

export const getErrorMessage = (key) => errorMessages?.[key] ?? key;

export const validator = (type) => {
  switch (type) {
    case "onlyString":
      return Yup.string()
        .required(getErrorMessage("required"))
        .test("isAlphabetic", getErrorMessage("invalidValue"), (value) =>
          value !== undefined ? isAlphabetic(value) : true
        );

    case "notRequired":
      return Yup.string().notRequired();

    case "notRequiredMixed":
      return Yup.mixed().notRequired();

    case "notRequiredNumber":
      return Yup.number().transform(numberTransform).notRequired();

    case "notRequiredDate":
      return Yup.date().notRequired();

    case "requiredDate":
      return Yup.date().required(getErrorMessage("required"));

    case "required":
      return Yup.string().required(getErrorMessage("required"));

    case "numberRequired":
      return Yup.number()
        .transform(numberTransform)
        .typeError(getErrorMessage("invalidValue"))
        .required(getErrorMessage("required"));

    case "priceRequired":
      return Yup.number()
        .transform(numberTransform)
        .typeError(getErrorMessage("invalidValue"))
        .required(getErrorMessage("required"))
        .min(1, getErrorMessage("invalidValue"));

    case "email":
      return Yup.string()
        .required(getErrorMessage("required"))
        .email(getErrorMessage("invalidEmail"));

    case "password":
      return Yup.string()
        .required(getErrorMessage("required"))
        .min(6, getErrorMessage("passwordLength"));

    default:
      return Yup.string().required(getErrorMessage("required"));
  }
};

export const loginValidation = () =>
  Yup.object().shape({
    email: validator("email"),
    password: validator("password"),
  });

export const userFormValidation = () =>
  Yup.object().shape({
    firstName: validator("required"),
    lastName: validator("required"),
    email: validator("email"),
    gender: validator("onlyString"),
    status: validator("onlyString"),
  });

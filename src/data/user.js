export const defaultUser = {
  address: '',
  age: 24,
  email: "",
  firstName: "",
  gender: "M",
  lastName: "",
  note: '',
  status: "active",
};

export const genderOptions = {
  M: "Male",
  F: "Female",
  O: "Other",
  D: "Don't want to disclose",
};

export const statusOptions = {
  active: "Active",
  inactive: "Inactive",
};

export const defaultState = {
  columnSearch: {},
  currentPage: 1,
  globalSearch: "",
  perPage: "10",
  sortType: "DESC",
  sortWith: "createdAt",
};

export const headerTitles = {
  address: 'Address',
  age: 'Age',
  createdAt: 'Created On',
  email: 'Email',
  firstName: 'First Name',
  gender: 'Gender',
  id: 'ID',
  lastName: 'Last Name',
  note: 'Note',
  status: 'Status',
};

export default genderOptions;

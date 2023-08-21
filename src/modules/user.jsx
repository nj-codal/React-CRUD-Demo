import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { faker } from "@faker-js/faker";
import {
  getRandomFromArray,
  isValidArray,
  searchIncludes,
} from "@/modules/utils";
import { defaultUser, statusOptions } from "@/data/user";

export const storageKey = "NJ_USERS";

export const showStatus = (status) =>
  statusOptions?.[status] || statusOptions.active;

export const showEmail = (email) => <a href={`mailto:${email}`}>{email}</a>;

export const showDate = (date) =>
  date ? date.replace(/T.*/, "").split("-").reverse().join("/") : null;

export const getRandomUser = () => {
  const isMale = faker.person.sex() === "male";

  return {
    ...defaultUser,
    id: nanoid(),
    email: faker.internet.email().toLowerCase(),
    address: [
      faker.location.streetAddress(true),
      faker.location.city(),
      faker.location.state(),
      " - ",
      faker.location.zipCode(),
    ].join(" "),
    age: faker.random.numeric(2),
    firstName: faker.person.firstName(isMale),
    gender: isMale ? "M" : "F",
    lastName: faker.person.lastName(isMale),
    note: faker.random.words(15),
    status: getRandomFromArray([
      "active",
      "active",
      "active",
      "inactive",
      "active",
      "active",
      "active",
    ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
};

export const getRandomUsers = (count = 10) =>
  Array.from({ length: count }).map(getRandomUser);

export const getFilteredListData = ({
  columnSearch,
  data,
  globalSearch,
  sortType,
  sortWith,
}) => {
  const searchTerm = globalSearch.toLowerCase();
  const {
    createdAt = "",
    email = "",
    firstName = "",
    id = "",
    lastName = "",
    status = "",
  } = columnSearch || {};

  return data
    .sort((a, b) =>
      sortType === "DESC"
        ? b[sortWith].localeCompare(a[sortWith])
        : a[sortWith].localeCompare(b[sortWith])
    )
    .filter((d) =>
      searchTerm
        ? searchIncludes(d.address, searchTerm) ||
          searchIncludes(d.age, searchTerm) ||
          searchIncludes(d.email, searchTerm) ||
          searchIncludes(d.firstName, searchTerm) ||
          searchIncludes(d.id, searchTerm) ||
          searchIncludes(d.lastName, searchTerm) ||
          searchIncludes(d.createdAt, searchTerm) ||
          searchIncludes(d.note, searchTerm)
        : true
    )
    .filter((d) => (email ? searchIncludes(d.email, email) : true))
    .filter((d) => (firstName ? searchIncludes(d.firstName, firstName) : true))
    .filter((d) => (id ? searchIncludes(d.id, id) : true))
    .filter((d) => (lastName ? searchIncludes(d.lastName, lastName) : true))
    .filter((d) => (createdAt ? searchIncludes(d.createdAt, createdAt) : true))
    .filter((d) => (status ? d.status === status : true));
};

export const getAllUsers = () => {
  const data = localStorage.getItem(storageKey);
  if (data) {
    try {
      const parsedData = JSON.parse(data);
      if (isValidArray(parsedData)) {
        return parsedData;
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }
  return [];
};

export const getUserById = (id) =>
  getAllUsers().find((d) => d.id === id) || null;

export const createUser = (data) => {
  const timeStamp = new Date().toISOString();

  const updated = [
    ...getAllUsers(),
    {
      ...data,
      id: nanoid(),
      createdAt: timeStamp,
      updatedAt: timeStamp,
    },
  ];

  localStorage.setItem(storageKey, JSON.stringify(updated));
  toast.success("User has been added.");

  return true;
};

export const bulkCreateUsers = (data) => {
  const updated = [...getAllUsers(), ...(isValidArray(data) ? data : [])];

  localStorage.setItem(storageKey, JSON.stringify(updated));
  toast.success("Users have been added.");

  return true;
};

export const updateUser = (id, data) => {
  const updated = getAllUsers().map((d) =>
    d.id === id
      ? {
          ...data,
          updatedAt: new Date().toISOString(),
          id,
        }
      : d
  );

  localStorage.setItem(storageKey, JSON.stringify(updated));
  toast.success("User has been updated.");

  return true;
};

export const patchUser = (id, data) => {
  const updated = getAllUsers().map((d) =>
    d.id === id
      ? {
          ...d,
          ...data,
          updatedAt: new Date().toISOString(),
          id,
        }
      : d
  );

  localStorage.setItem(storageKey, JSON.stringify(updated));
  toast.success("User has been updated.");

  return true;
};

export const deleteUser = (id) => {
  const updated = getAllUsers().filter((d) => d.id !== id);

  localStorage.setItem(storageKey, JSON.stringify(updated));
  toast.success("User has been deleted.");

  return true;
};

export const deleteAllUsers = () => {
  const updated = [];

  localStorage.setItem(storageKey, JSON.stringify(updated));
  toast.success("All users have been deleted.");

  return true;
};

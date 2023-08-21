export const isDefined = (d) => d !== undefined;

export const isValidArray = (data) =>
  data && Array.isArray(data) && data.length > 0;

export const isValidObject = (data) =>
  typeof data === "object" && data ? Object.keys(data).length > 0 : false;

export const later = (delay = 1500) =>
  new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });

export const paginate = (array, perPage, pageIndex) =>
  array.slice((pageIndex - 1) * perPage, pageIndex * perPage);

export const searchIncludes = (string, searchValue) =>
  string?.toLowerCase().includes(searchValue?.toLowerCase());

export const numberFormatter = (number, digits) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  const item = lookup
    .slice()
    .reverse()
    .find((item) => number >= item.value);

  return item
    ? (number / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

export const getRandomFromArray = (data) =>
  data[Math.floor(Math.random() * data.length)];

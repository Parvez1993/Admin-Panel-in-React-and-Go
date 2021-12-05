export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "size") {
    unique = unique.flat();
  }
  if (type === "categories") {
    unique = unique.flat();
  }

  return ["all", ...new Set(unique)];
};

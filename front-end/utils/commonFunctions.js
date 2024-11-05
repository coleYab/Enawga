export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const trim = (str) => {
  if (str.length >= 20) {
    return str.slice(0, 20) + "...";
  }
  return str;
};

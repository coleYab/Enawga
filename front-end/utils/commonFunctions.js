export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const trim = (str) => {
  if (str.length >= 20) {
    return str.slice(0, 20) + "...";
  }
  return str;
};

export const formatTime = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
};

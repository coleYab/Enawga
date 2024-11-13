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

export const fetchFriends = async (setFriends) => {
  try {
    const response = await fetch("http://localhost:5000/api/users", {
      credentials: "include",
    });

    if (!response.ok) {
      console.log("Failed to fetch friends");
      return;
    }

    const data = await response.json();

    if (data) {
      console.log("Friends: ", data);
      setFriends(data);
    }
  } catch (error) {
    console.log("Error fetching friends: ", error);
  }
};

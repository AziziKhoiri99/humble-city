const data = {
  names: require("./names.json"),
};

export const randomName = () => {
  const ran_a = Math.floor(Math.random() * data.names.length);
  const ran_suffix = Math.floor(Math.random() * 100);
  return `${data.names[ran_a]}${ran_suffix}`;
};

export const serverIp = "localhost";

export const API_URL = `http://${serverIp}:3001/api/`;

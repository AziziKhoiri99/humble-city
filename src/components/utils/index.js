const data = {
  names: require("./names.json"),
};

exports.randomName = () => {
  const ran_a = Math.floor(Math.random() * data.names.length);
  const ran_suffix = Math.floor(Math.random() * 100);
  return `${data.names[ran_a]}${ran_suffix}`;
};

exports.API_URL = "http://localhost:3001/api/";

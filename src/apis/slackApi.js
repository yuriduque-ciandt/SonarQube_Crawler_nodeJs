import axios from "./axiosConfig.js";

const sendMessage = async (body) => {
  console.log("slackApi - '/sendMessage' - received");
  console.log(JSON.stringify(body));

  try {
    const response = await axios.slackInstance.post("", body);

    console.log("slackApi - '/sendMessage' - done");
    return response.data.components;
  } catch (error) {
    console.log(error.message);
  }
};

export default {
  sendMessage,
};

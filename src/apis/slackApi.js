import axios from "./axiosConfig.js";

const sendMessage = async (text) => {
  console.log("slackApi - '/sendMessage' - received");

  try {
    const response = await axios.post("", {
      text,
    });

    console.log("slackApi - '/sendMessage' - done");
    return response.data.components;
  } catch (error) {
    console.log(error.message);
  }
};

export default {
  sendMessage,
};

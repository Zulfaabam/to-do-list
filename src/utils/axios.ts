import axios from "axios";

export const defaultOptions = {
  baseURL: "https://todo.api.devcode.gethired.id",
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
};

const instance = axios.create(defaultOptions);

export default instance;

import axios from "axios";

const baseUrl = axios.create({ baseURL: "https://www.streemstore.com" });

export default baseUrl;

import axios from "axios";
const URL = "http://localhost:8080/"

export default axios.create({baseURL:URL})
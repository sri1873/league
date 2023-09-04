import axios from "axios";
const URL: string = "http://localhost:8080/"

export default axios.create({baseURL:URL})
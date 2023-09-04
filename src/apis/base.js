import axios from "axios";
const URL = "https://league-api.woxsen.edu.in/"

export default axios.create({baseURL:URL})
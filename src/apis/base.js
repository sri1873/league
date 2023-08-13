import axios from "axios";
const URL = "http://ec2-44-196-7-214.compute-1.amazonaws.com:8080/"

export default axios.create({baseURL:URL})
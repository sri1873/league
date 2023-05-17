import axios from "axios";
const URL = "http://ec2-13-49-187-243.eu-north-1.compute.amazonaws.com:8080/"

export default axios.create({baseURL:URL})
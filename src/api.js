import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-3-145-91-79.us-east-2.compute.amazonaws.com/v1",
  // baseURL: "http://localhost:8000/v1",
  // withCredentials: true,
});

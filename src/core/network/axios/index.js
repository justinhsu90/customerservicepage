import axios from "axios";
import qs from "qs";
//axios的配置
const instance = axios.create({
  baseURL: "http://60.251.57.138:8000/data-server/",
  // baseURL: "http://127.0.0.1:8080/data-server/",
  timeout: 12e4,
  headers: { "Content-Type": "application/x-www-form-urlencoded" }
});
// instance.defaults.headers.post[""] = "application/x-www-form-urlencoded";
instance.interceptors.request.use(request => {
  if (request.headers["Content-Type"] == "multipart/form-data") {
    return request;
  }
  if (request.method == "post") {
    request.data = qs.stringify(request.data);
    return request;
  }
  return request;
});
instance.interceptors.response.use(response => {
  return response.data;
});
export default instance;

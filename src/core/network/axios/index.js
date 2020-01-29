import axios from "axios";
import qs from "qs";
//axios的配置
const instance = axios.create({
  baseURL: "https://api.magictrend.co.uk:8443/data-server/",
  // baseURL: "http://127.0.0.1:8080/data-server/",
  timeout: 12e4,
  headers: { "Content-Type": "application/x-www-form-urlencoded" }
});
// instance.defaults.headers.post[""] = "application/x-www-form-urlencoded";
instance.interceptors.request.use(request => {
  let contentType = request.headers["Content-Type"];
  if (
    contentType == "multipart/form-data" ||
    contentType == "application/json"
  ) {
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

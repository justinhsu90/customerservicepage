export default file => {
  let URL = window.URL || window.webkitURL;
  let base64 = URL.createObjectURL(file);
  return base64;
};

import Cookies from "js-cookie";

const authToken = Cookies.get("jwt");
function generalApiHeader() {
  const header = { authorization: `Bearer ${authToken}` };
  return header;
}

export default generalApiHeader;

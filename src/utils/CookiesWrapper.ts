import Cookies from "js-cookie";

export const LoggedIn = () => {
  return Cookies.get("loginToken") != null;
};

export const logout = () => {
  Cookies.remove("loginToken");
  console.log(Cookies.get("loginToken"));
};

export const getUserName = (): string => {
  const token = Cookies.get("loginToken");
  if (token == null) return "";
  const base64Payload = token.split(".")[1];
  const payload = JSON.parse(atob(base64Payload));
  return payload.user_name;
};

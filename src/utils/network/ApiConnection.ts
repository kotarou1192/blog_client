import axios, { AxiosResponse } from "axios";
import { BaseURL, ApiUrlRegExp } from "./Constants";

export const postTo = async (
  api: string,
  params: { [s: string]: any }
): Promise<AxiosResponse<any>> => {
  if (!ApiUrlRegExp.test(api))
    throw TypeError(
      "incorrect api address. api url must start /, like /user/name"
    );
  return await axios.post(BaseURL + api, params);
};

import { getWithAuthenticate } from "./network/AxiosWrapper";
import { useEffect, useState } from "react";

export function useGetAPI(apiName: string, params?: object): 404 | any {
  const [result, setResult] = useState();
  useEffect(() => {
    getWithAuthenticate(apiName, params)
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        if (err.response.status == 404) setResult(err.response.status);
      });
  }, [params]);
  return result;
}

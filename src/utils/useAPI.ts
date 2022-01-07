import { getWithAuthenticate } from "./network/AxiosWrapper";
import { useEffect, useState } from "react";

export function useGetAPI(apiName: string, params?: object): any {
  const [result, setResult] = useState();
  useEffect(() => {
    getWithAuthenticate(apiName, params).then((res) => {
      setResult(res.data);
    });
  }, [params]);
  return result;
}

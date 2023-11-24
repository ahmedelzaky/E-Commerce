import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const useAxios = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    console.log(queryParams);
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          params: { ...queryParams },
        });
        if (response.status !== 200) {
          throw new Error("could not fetch data");
        }
        setData(response.data);
        setIsPending(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    };
    fetchData();
  }, [url, location.search]);

  return {
    data,
    isPending,
    error,
  };
};

export default useAxios;

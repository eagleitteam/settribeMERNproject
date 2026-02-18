import { useEffect, useState } from "react";
import axios from "axios";

const useTableApi = (apiUrl, initialParams = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
    sortOrder: "asc",
    ...initialParams,
  });

  useEffect(() => {
    fetchData();
  }, [params]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl, { params });

      setData(res.data.data);            // rows
      setTotalRecords(res.data.total);   // total count
    } catch (err) {
      console.error("Table API Error", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    totalRecords,
    params,
    setParams,
  };
};

export default useTableApi;

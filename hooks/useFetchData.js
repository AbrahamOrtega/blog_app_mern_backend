const { useState } = require("react");
const { useEffect } = require("react");
const axios = require("axios");

function useFetchData(apiEndPoint) {
  const [alldata, setAlldata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      //set initialload to false to prevent the api call on subsequent renders
      setInitialLoad(false);
      setLoading(false); //set loading to false to show components iniatilly
      return; // exit useEffect
    }

    setLoading(true);

    const fetchAllData = async () => {
      try {
        const res = await axios.get(apiEndPoint);
        setAlldata(res.data);
        setLoading(false); //set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false); //set loading to false if there is an error
      }
    };

    // fetch blog data only if category exists
    if (apiEndPoint) {
      fetchAllData();
    }
  }, [initialLoad, apiEndPoint]); //depend on initialLoad and apiEndPoint

  return { alldata, loading };
}

export default useFetchData;

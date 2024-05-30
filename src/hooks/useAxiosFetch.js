import { useEffect,useState } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
    const [data,setData] = useState([]);
    const [fetchError,setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    
    useEffect(()=> {
        var isMounted = true;
        const source = axios.CancelToken.source();
        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url,{
                    cancelToken:source.token
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
                
                setIsLoading(false);
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.response.message);
                    setData([]);
                }
                
                
            }finally {
                isMounted && setIsLoading(false);
            }
        }
        fetchData(dataUrl);    
        const cleanUp = () => {
            setIsLoading(false);
            source.cancel();
        }
        return cleanUp;

         

    },[dataUrl]);
    return {data, fetchError, isLoading };
}

export default useAxiosFetch;

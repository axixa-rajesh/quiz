import {useState,useEffect} from "react";

export const useFetch=(apiFunc,params=null)=>{
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(null);
  const [error,setError]=useState(null);  

    const fetchData=async()=>{
        setLoading(true);
        setError(null);

        try{
            const result=await apiFunc(params);
            setData(result);
        }catch(Err){
            setError(err.message || "Failed to fetch data from live API.");
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchData();
    },[JSON.stringify(params)]);
    return {data,loading,error,refetch:fetchData};
};
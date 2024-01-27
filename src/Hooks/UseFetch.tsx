import { useEffect, useRef, useState } from "react";

export function useFetch<T>(url: RequestInfo | URL, options?: RequestInit){
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const optionRef = useRef(options);

  useEffect(()=>{
    const controller = new AbortController();
    const {signal} = controller;

    const fetchData = async ()=> {
      setLoading(true);
      setData(null);
      try{
        const response = await fetch(url, {
          signal,
          ...optionRef.current
        });
        if(!response.ok) throw new Error(`Error: ${response.status}`)
        const json = (await response.json()) as T;
        if (!signal.aborted) setData(json)
        console.log(json);
      }catch(error){
        if(!signal.aborted && error instanceof Error) setError(error.message);
      }finally{
        if(!signal.aborted ) setLoading(false)
      }
    }
    fetchData();
  
    return () => {
      controller.abort();
    }
  },[url]);

  return {data, loading, error};
}
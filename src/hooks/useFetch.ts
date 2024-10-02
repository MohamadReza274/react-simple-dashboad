import { useEffect, useState } from "react";

export const useFetch = <T>(url:string) => {
    const [data,setData] = useState<T[]>([] as T[]);
    const [error,setError] = useState("");
    const [isLoading,setLoading] = useState(true);

    useEffect(() => {
        const FetchData = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }

                const data: T[] = await response.json();
                setData(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : "An unknown error occured")
            } finally {
                setLoading(false);
            }
        }
        FetchData();
    },[url]);

    return {data,error,isLoading};
}
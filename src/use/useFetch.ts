import { useState, useEffect } from "react";

export const useFetch = ( url: string) => {
    const [ data, setData ] = useState<any[]>([]);
    const [ loading, setLoading] = useState(true);
    const [ error, setError ] = useState()
    
    useEffect( () => {
        fetch( url )
            .then( resp => resp.json() )
            .then( data => setData(data))
            .catch( error => setError(error));
        setLoading(false);
    }, []);

    return  { data, loading, error }
}

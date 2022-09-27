import {useState, useEffect} from 'react';

// appel api 

const useFetch = (url) => {
  
  const [data, setData] = useState([]);
  //statut de chargement
  const [isLoading, setIsLoading] = useState(false);
  //gestion des erreurs
  const [error, setError] = useState(false);

  //fonction isolée car ne peut être fait dans le useEffect directement(asynchrone)
  const getUsers = async () => {      
      setIsLoading(true);
      setError(false);
      try {
          const response = await fetch(url);
          console.log(response);
          if(!response.ok) {
              throw new Error("Somethiong went wrong")
          }
          const data = await response.json();
          // console.log(data);          
          //mise à jour states
          setData(data);
          setIsLoading(false);            
      } catch (err) {
          console.log(err.message);
          setError(true);
          setIsLoading(false);
      }        
  };

  useEffect(() => {     
      getUsers()
  }, [url]);

  return {data, error, isLoading}

}

export default useFetch;
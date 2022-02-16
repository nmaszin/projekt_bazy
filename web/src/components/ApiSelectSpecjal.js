import React from 'react';
import { useState, useEffect} from 'react';
import config from '../config';
import Cookies from 'universal-cookie'
import { useHistory } from "react-router-dom";

const ApiSelectSpecjal = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState(null);

    useEffect(() => {
    
        const cookies = new Cookies();
        const token = cookies.get('loginToken');
        fetch(`${config.API_URL}/${props.path}/${props.value}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => {
            if (res.status === 401) {
              cookies.remove('loginToken');
              window.location.reload();
            } else {
              return res;
            }
          })
          .then(res => res.json())
          .then(
            (result) => {
              setItem(result.data);
              setIsLoaded(true);
            },
            (error) => {
              setError(error);
              setIsLoaded(true);        
            }
          )
      }, []);

      if (error || !isLoaded) {
        return '';
      } else {

        console.log(props.name(item));

        return props.name(item);
      }
}

export default ApiSelectSpecjal;
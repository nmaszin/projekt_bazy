import React from 'react';
import { useState, useEffect} from 'react';
import config from '../config';
import Cookies from 'universal-cookie'
import { useHistory } from "react-router-dom";

const ApiSelectSpecjal = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState(null);
    const history = useHistory();

    useEffect(() => {
    
        const cookies = new Cookies();
        const token = cookies.get('loginToken');

        if (token === undefined) {
          history.push("/login");
        }

        fetch(`${config.API_URL}/${props.path}/${props.value}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => {
            if (res.status === 401) {
              history.push("/login");
            } else {
              return res;
            }
          })
          .then(res => res.json())
          .then(
            (result) => {
              setItem(result.data);
              setIsLoaded(true);
              console.log(props.name(result.data));
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
        return props.name(item);
      }
}

export default ApiSelectSpecjal;
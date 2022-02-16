import React from 'react';
import { useState, useEffect} from 'react';
import config from '../config';
import Cookies from 'universal-cookie'
import { useHistory } from "react-router-dom";

const ApiSelect = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const history = useHistory();

    useEffect(() => {
    
        const cookies = new Cookies();
        const token = cookies.get('loginToken');
        fetch(`${config.API_URL}/${props.path}`, {
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
              setIsLoaded(true);
              setItems(result.data);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [history, props.path])
      
      if (error || !isLoaded) {
        return <select></select>;
      } else {
        return (
            <select onChange={props.onChange}>
              <option disabled selected={props.value ? false : true} value>Wybierz z listy</option>
              {items.map((item, index) => 
              <option 
                key={index} 
                value={item.id}
                selected={item.id === props.value}>
                {props.name(item)}
              </option>)}
            </select>
        );
      }
}

export default ApiSelect;
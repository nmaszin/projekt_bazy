import React from 'react';
import { useState, useEffect} from 'react';
import Raport from './Raport';
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

        if (token === undefined) {
          history.push("/login");
        }

        fetch(`${config.API_URL}/${props.path}`, {
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
              setIsLoaded(true);
              setItems(result.data);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])
      
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
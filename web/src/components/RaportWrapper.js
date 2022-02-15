import React from 'react';
import { useState, useEffect} from 'react';
import Raport from './Raport'
import config from '../config';
import Cookies from 'universal-cookie'
import { useHistory } from "react-router-dom";

const RaportWrapper = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

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
      }, [])
      
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <div className='reports'>
          <Raport columns={props.columns} data={items}/>
        </div>
        );
      }

}

export default RaportWrapper;
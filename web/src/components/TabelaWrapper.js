import React from 'react';
import { useState, useEffect} from 'react';
import Tabela from './Tabela'
import config from '../config';
import Cookies from 'universal-cookie'
import { useHistory } from "react-router-dom";

const RaportWrapper = (props) => {

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
      
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <div className='reports'>
          <Tabela columns={props.columns} data={items}/>
        </div>
        );
      }

}

export default RaportWrapper;
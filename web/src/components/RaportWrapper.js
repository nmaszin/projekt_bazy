import React from 'react';
import { useState, useEffect} from 'react';
import Raport from './Raport'
import config from '../config';
import Cookies from 'universal-cookie'
import Error from './Error'

const RaportWrapper = (props) => {
  const [responseStatusCode, setResponseStatusCode] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('loginToken');
    fetch(`${config.API_URL}/views/${props.path}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setResponseStatusCode(res.status);

        if (res.status === 401) {
          cookies.remove('loginToken');
          window.location.reload();
        }
        
        if (res.status != 200) {
          throw new Error();
        }

        return res;
      })
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result.data);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      )
  }, [])
    
  if (error) {
    return <Error responseStatusCode={responseStatusCode} />;
  } else if (!isLoaded) {
    return <></>;
  } else {
    return <Raport columns={props.columns} data={items}/>;
  }
}

export default RaportWrapper;
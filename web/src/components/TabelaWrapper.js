import React from 'react';
import { useState, useEffect} from 'react';
import Tabela from './Tabela'
import config from '../config';
import Cookies from 'universal-cookie'
import Error from './Error'

const RaportWrapper = (props) => {
    const [responseStatusCode, setResponseStatusCode] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const handleAdd = (row) => {
      const data = JSON.parse(JSON.stringify(row));
      data.id = undefined;

      const cookies = new Cookies();
      const token = cookies.get('loginToken');
      return fetch(`${config.API_URL}/${props.path}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }

      })
        .then(res => {
          setResponseStatusCode(res.status);

          if (res.status === 401) {
            cookies.remove('loginToken');
            window.location.reload();
          } else {
            return res;
          }

          throw new Error();
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
    }

    const handleDelete = (row) => {
      const cookies = new Cookies();
      const token = cookies.get('loginToken');
      fetch(`${config.API_URL}/${props.path}/${row.id}`, {
        method: 'DELETE',
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

          throw new Error();
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
    }

    const handleUpdate = (row) => {
      const data = JSON.parse(JSON.stringify(row));
      data.id = undefined;

      const cookies = new Cookies();
      const token = cookies.get('loginToken');
      return fetch(`${config.API_URL}/${props.path}/${row.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }

      })
        .then(res => {
          if (res.status === 401) {
            cookies.remove('loginToken');
            window.location.reload();
          } else {
            return res;
          }

          throw new Error();
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
    }

    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get('loginToken');
        return fetch(`${config.API_URL}/${props.path}`, {
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

            throw new Error();
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
      }, [props.path])
      
      if (error) {
        return <Error responseStatusCode={responseStatusCode} />;
      } else if (!isLoaded) {
        return <></>;
      } else {
        return <Tabela columns={props.columns} data={items} add={handleAdd} update={handleUpdate} delete={handleDelete} />
      }

}

export default RaportWrapper;

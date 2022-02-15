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

    const handleAdd = (row) => {
      const cookies = new Cookies();
      const token = cookies.get('loginToken');

      if (token === undefined) {
        history.push("/login");
      }

      const data = JSON.parse(JSON.stringify(row));
      data.id = undefined;

      return fetch(`${config.API_URL}/${props.path}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
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
    }

    const handleDelete = (row) => {
      const cookies = new Cookies();
      const token = cookies.get('loginToken');

      if (token === undefined) {
        history.push("/login");
      }

      fetch(`${config.API_URL}/${props.path}/${row.id}`, {
        method: 'DELETE',
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
    }

    const handleUpdate = (row) => {
      const cookies = new Cookies();
      const token = cookies.get('loginToken');

      if (token === undefined) {
        history.push("/login");
      }

      const data = JSON.parse(JSON.stringify(row));
      data.id = undefined;

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
    }

    useEffect(() => {
    
        const cookies = new Cookies();
        const token = cookies.get('loginToken');

        if (token === undefined) {
          history.push("/login");
        }

        return fetch(`${config.API_URL}/${props.path}`, {
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
          <Tabela columns={props.columns} data={items} add={handleAdd} update={handleUpdate} delete={handleDelete}/>
        </div>
        );
      }

}

export default RaportWrapper;
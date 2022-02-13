import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/Tabela.css';
import ApiSelect from './ApiSelect';

const Tabela = (props) => {

    const [data, setData] = useState([]);
    useEffect(() => {
        setData([...props.data]);
    }, [props.data])

    const handleAddRow = () => {
        const newData = [...data, {}];
        setData(newData);
        console.log(newData)
    }

    return(
        <>
        <table>
            <thead>
                <tr>{
                    props.columns.map((column, index) => (
                        <th key={index}>{column.label}</th>
                      ))    
                }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((row, index) => (
                        <>
                        <tr key={index}>{
                            props.columns.map((column, index) =>(
                                <td key={index}>{   
                                    (() => {
                                        if (column.type === 'immutable') {
                                          return column.value(row);
                                        } else if(column.type === 'list') {
                                            return (
                                                <ApiSelect path={column.path} name={column.name} />
                                            )
                                        } else {
                                          return (
                                            <input type={column.type} defaultValue={column.value(row)}/>
                                          )
                                        }
                                      })()
                                }</td>
                            ))
                        }
                        <td><button className='usun'>Usuń</button></td>
                        </tr>
                        
                        </>
                      ))   
                }
            </tbody>
        </table>
        <div className='buttons'>
            <button>Aktualizuj</button>
            <button onClick={handleAddRow}>Dodaj łekołd</button>
        </div>
        </>
    )
}

export default Tabela;
import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/Tabela.css';
import ApiSelect from './ApiSelect';

const Tabela = (props) => {

    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState([]);
    const [updated, setUpdated] = useState([]);

    useEffect(() => {
        setData(JSON.parse(JSON.stringify(props.data)));
    }, [props.data])

    const without = (array, index) => [...array.slice(0, index), ...array.slice(index + 1)];  

    const handleAddRow = () => {
        const newData = [...data, {}];
        setData(newData);
    }

    const handleDelete = index => () => {     
        if (deleted.includes(index)) {
            const i = deleted.indexOf(index);
            const newDeleted = without(deleted, i);
            setDeleted(newDeleted);
            console.log(newDeleted);
        } else {
            setDeleted([...deleted, index]);
        }
        // const without = (array, index) => [...array.slice(0, index), ...array.slice(index + 1)];
        // const newData = without(data, index);
        // setData(newData);
        // console.log(newData);        
    }

    const handleUpdate = async() => {
        const updatedRows = updated.map(idx => data[idx]).filter(row => row.id !== undefined);
        const deletedRows = deleted.map(idx => data[idx]).filter(row => row.id !== undefined);
        const addedRows = data.filter((_, index) => !deleted.includes(index)).filter(row => row.id === undefined);

        await Promise.all(updatedRows.map(props.update));
        await Promise.all(deletedRows.map(props.delete));
        await Promise.all(addedRows.map(props.add));

        console.log('Deleted', deletedRows);
        console.log('Added', addedRows);
        console.log('Updated', updatedRows);
        window.location.reload();
    }

    const handleInput = (index, column) => (event) => {
        const newData = [...data]; // TO MOŻE BYĆ POTENCJALNE ŹRÓDŁO BŁĘDU
        newData[index][column.value] = event.target.value;
        if (column.type === 'list') {
            newData[index][column.value] = parseInt(newData[index][column.value]);
        }
        if (!updated.includes(index)) {
            setUpdated([...updated, index]);
        }
        setData(newData);
        console.log(newData[index]);
    } 

    const getRowClass = (index) => {
        if (deleted.includes(index)) {
            return 'deleted-row';
        } else if (updated.includes(index)) {
            return 'updated-row';
        } else {
            return '';
        }
    }

    const handleRestore = (index) => () => {
        if (updated.includes(index)) {
            const newData = [...data]; // TO MOŻE BYĆ POTENCJALNE ŹRÓDŁO BŁĘDU
            if (props.data[index] === undefined) {
                newData[index] = Object.fromEntries(Object.entries(newData[index]).map(([key, _]) => [key, '']))
            } else {
                newData[index] = JSON.parse(JSON.stringify(props.data[index]))
            }
            const i = updated.indexOf(index)
            setUpdated(without(updated, i));
            setData(newData);
        }
    }

    return(
        <>
        <div className='wrapper'>
            <table>
                <tr>
                    {
                        props.columns.map((column, index) => (
                            <th key={index}>{column.label}</th>
                        ))      
                    }
                    <th className='action-column'></th>
                </tr>
                {
                    data.map((row, rowIndex) => (
                        <>
                            <tr key={rowIndex} className={getRowClass(rowIndex)}>
                                {
                                    props.columns.map((column, columnIndex) =>(
                                        <td key={columnIndex}>{   
                                            (() => {
                                                // console.log(column)
                                                if (column.type === 'immutable') {
                                                return row[column.value];
                                                } else if(column.type === 'list') {
                                                    return (
                                                        <ApiSelect onChange={handleInput(rowIndex, column)} path={column.path} name={column.name} value={row[column.value]}/>
                                                    )
                                                } else {
                                                return (
                                                    <input onChange={handleInput(rowIndex, column)} type={column.type} value={row[column.value]}/>
                                                )
                                                }
                                            })()
                                        }</td>
                                    ))
                                }
                                <td className='action-column'>
                                    <button onClick={handleDelete(rowIndex)} className='usun'>{deleted.includes(rowIndex) ? 'Przywróć' : 'Usuń'}</button>
                                    <button onClick={handleRestore(rowIndex)} className='cofnij'>Cofnij zmiany</button>
                                </td>
                            </tr>
                        </>
                    ))   
                }
            </table>

            <div className='buttons'>
                <button onClick={handleUpdate}>Aktualizuj</button>
                <button onClick={handleAddRow}>Dodaj łekołd</button>
            </div>
        </div>
        </>
    )
}

export default Tabela;
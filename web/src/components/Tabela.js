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
    }

    const sleep = duration => new Promise(resolve => setInterval(() => resolve(), duration))

    const handleUpdate = async (event) => {
        event.preventDefault();

        const newData = props.columns
            .reduce((data, column) =>
                data.map(row => ({
                    ...row,
                    [column.value]: ((value) => {
                        if (value === '') {
                            return undefined;
                        } else if (column.type === 'number') {
                            return parseFloat(value);
                        } else {
                            return value;
                        }
                    })(row[column.value])
                })),
                data
            );

        const updatedRows = updated.map(idx => newData[idx]).filter(row => row.id !== undefined);
        const deletedRows = deleted.map(idx => newData[idx]).filter(row => row.id !== undefined);
        const addedRows = newData.filter((_, index) => !deleted.includes(index)).filter(row => row.id === undefined);

        console.log('Deleted', deletedRows);
        console.log('Added', addedRows);
        console.log('Updated', updatedRows);

        // await sleep(5000);

        await Promise.all(updatedRows.map(props.update)).catch(e => console.log(e));
        await Promise.all(deletedRows.map(props.delete)).catch(e => console.log(e));
        await Promise.all(addedRows.map(props.add)).catch(e => console.log(e));
        window.location.reload();
    }

    const handleInput = (index, column) => (event) => {
        const newData = [...data];
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
            const newData = [...data];
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
        <form className='wrapper' onSubmit={handleUpdate}>
            <table className='table-T'>
                <thead>
                    <tr className='tr-T'>
                        {
                            props.columns.map((column, index) => (
                                <th className='th-T' key={index}>{column.label}</th>
                            ))      
                        }
                        <th className='action-column th-T'></th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((row, rowIndex) => (
                        <>
                            <tr key={rowIndex} className={[getRowClass(rowIndex), "tr-T"].join(' ')}> 
                                {
                                    props.columns.map((column, columnIndex) =>(
                                        <td className='td-T' key={rowIndex * 997 + columnIndex + 112}>{   
                                            (() => {
                                                if (column.type === 'immutable') {
                                                return row[column.value];
                                                } else if(column.type === 'list') {
                                                    return (
                                                        <ApiSelect onChange={handleInput(rowIndex, column)} path={column.path} name={column.name} value={row[column.value]} required={!column.optional && !deleted.includes(rowIndex)} />
                                                    )
                                                } else {
                                                return (
                                                    <input onChange={handleInput(rowIndex, column)} type={column.type} value={row[column.value]} pattern={column.pattern} required={!column.optional && !deleted.includes(rowIndex)} />
                                                )
                                                }
                                            })()
                                        }</td>
                                    ))
                                }
                                <td className='action-column td-T'>
                                    <button type='button' onClick={handleDelete(rowIndex)} className='usun btn'>{deleted.includes(rowIndex) ? 'Przywróć' : 'Usuń'}</button>
                                    <button type='button' onClick={handleRestore(rowIndex)} className='cofnij btn'>Cofnij zmiany</button>
                                </td>
                            </tr>
                        </>
                    ))   
                }
                </tbody>
            </table>

            <div className='buttons'>
                <button className='btns'>Aktualizuj</button>
                <button type='button' className='btns' onClick={handleAddRow}>Dodaj rekord</button>
            </div>
        </form>
        </>
    )
}

export default Tabela;
import React from 'react';
import '../styles/Raport.css';
import ApiSelectSpecjal from './ApiSelectSpecjal';

const Raport = (props) => {
    return(
        <div className='wrapper'>
            <table className='table-R'>
                <thead className='thead-R'>
                    <tr className='theadTR-R'>
                        {
                            props.columns.map((column, index) => (
                                <th className='theadTH-R' key={index}>{column.label}</th>
                            ))    
                        }
                    </tr>
                </thead>
                <tbody className='tbody-R'>
                    {
                        props.data.map((row, index) => (
                            <tr className='tbodyTR-R' key={index}>
                                {
                                    props.columns.map((column, index) =>(
                                        <td className='tbodyTD-R' key={index}>{
                                            (() => {
                                                // console.log(column);
                                                if (column.type === 'list') {
                                                    return <ApiSelectSpecjal value={column.value(row)} name={column.name} path={column.path}/>
                                                } else {
                                                    return column.value(row);
                                                }
                                            })()
                                        }</td>
                                    ))
                                }
                            </tr>
                        ))   
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Raport;
import React from 'react';
import '../styles/Raport.css';
import ApiSelectSpecjal from './ApiSelectSpecjal';

const Raport = (props) => {
    return(
        <div className='wrapper'>
            <table>
                <thead>
                    <tr>
                        {
                            props.columns.map((column, index) => (
                                <th key={index}>{column.label}</th>
                            ))    
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.map((row, index) => (
                            <tr key={index}>
                                {
                                    props.columns.map((column, index) =>(
                                        <td key={index}>{
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
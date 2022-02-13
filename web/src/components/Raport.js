import React from 'react';
import '../styles/Raport.css';

const Raport = (props) => {

    console.log(props.data);

    return(
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
                    props.data.map((row, index) => (
                        <tr key={index}>{
                            props.columns.map((column, index) =>(
                                <td key={index}>{column.value(row)}</td>
                            ))
                        }</tr>
                      ))   
                }
            </tbody>
        </table>
    )
}

export default Raport;
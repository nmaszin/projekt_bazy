import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/Raport.css';
import config from '../config';
import Cookies from 'universal-cookie'
import { useHistory } from "react-router-dom";
import ApiSelectSpecjal from './ApiSelectSpecjal';

const Raport = (props) => {

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
                        }</tr>
                      ))   
                }
            </tbody>
        </table>
    )
}

export default Raport;
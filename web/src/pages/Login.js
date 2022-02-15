import React from 'react'
import { useState } from 'react'
import config from '../config';
import { Grid, Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Cookies from 'universal-cookie'
import { useHistory } from "react-router-dom";
import '../styles/Login.css'


const Login=()=>{
    const paperStyle={padding :20,height:'70vh',width:400, margin:"40px auto"};
    const avatarStyle={backgroundColor:'#1bbd7e'};
    const btnstyle={margin:'50px 0'};
    const text1 = {margin: '20px 0 15px'};
    const text2 = {margin: '0px 0 15px'};

    const [message, setMessage] = useState('');
    const [username, setLogin] = useState();
    const [password, setPassword] = useState();
    const [loginMes, setLoginMes] = useState(null);
    const [passwordMes, setPasswordMes] = useState(null);
    const history = useHistory();
    

    const handleClick = async event => {
        event.preventDefault();
        
        const res = await fetch(`${config.API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status === 200) {
            const data = await res.json();
            const cookies = new Cookies();
            cookies.set('loginToken', data.token, { path: '/' });
            setMessage('Pomyślnie zalogowano')
            setTimeout(() => history.replace('/'), 1000)
        } else if (res.status === 401) {
            setMessage('Niepoprawna nazwa użytkownika lub hasło')
        } else {
            setMessage('Wystąpił nieznany błąd')
        }
        
    }

    const handleLogin = (e) => {
        setLogin(e.target.value);
        const re = /^[A-Za-z0-9_-]*$/;

        if (!e.target.value) {
            setLoginMes('Login jest wymagany!');
        } else if (!re.test(e.target.value)) {
            setLoginMes('Użyłeś niedozwolonego znaku!');
        } else if (e.target.value.length > 30) {
            setLoginMes('Login musi mieć maksymalnie 30 znaków');
        } else {
            setLoginMes('')
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);

        if (!e.target.value) {
            setPasswordMes('Hasło jest wymagane!'); 
        } else if (e.target.value.length < 8) {
            setPasswordMes('Hasło musi mieć minimalnie 8 znaków');
        } else {
            setPasswordMes('')
        }
    }

    const formOk = () => loginMes != null && passwordMes != null && !loginMes && !passwordMes;


    return (
        <form>
            <Grid>
                <Paper elevation={4} style={paperStyle} className="paper">
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Log In</h2>
                    </Grid>
                    <TextField onChange={handleLogin} style={text1} label='Username' placeholder='Enter username' fullWidth required/>
                    <div className='infoMessages'>{loginMes}</div>
                    <TextField onChange={handlePassword} style={text2} label='Password' placeholder='Enter password' type='password' fullWidth required/>
                    <div className='infoMessages'>{passwordMes}</div>
                    <Button onClick={handleClick} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth disabled={!formOk()}>Sign in</Button>
                    <div className="message">{message}</div>
                </Paper>
            </Grid>
        </form>
    );
}

export default Login
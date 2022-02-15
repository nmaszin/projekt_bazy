import React from 'react'
import { useState } from 'react'
import config from '../config';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Cookies from 'universal-cookie'
import { useHistory } from "react-router-dom";
import '../styles/Login.css'


const Login=()=>{
    const paperStyle={padding :20,height:'70vh',width:400, margin:"40px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'};

    const [message, setMessage] = useState('');
    const [username, setLogin] = useState();
    const [password, setPassword] = useState();
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
            window.location.reload()
        } else if (res.status === 401) {
            setMessage('Niepoprawna nazwa użytkownika lub hasło')
        } else {
            setMessage('Wystąpił nieznany błąd')
        }
        
    }

    return (
        <form>
            <Grid>
                <Paper elevation={4} style={paperStyle} className="paper">
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Log In</h2>
                    </Grid>
                    <TextField onChange={e => setLogin(e.target.value)} label='Username' placeholder='Enter username' fullWidth required/>
                    <TextField onChange={e => setPassword(e.target.value)} label='Password' placeholder='Enter password' type='password' fullWidth required/>
                    <Button onClick={handleClick} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                    <div class="message">{message}</div>
                </Paper>
            </Grid>
        </form>
    )
}

export default Login
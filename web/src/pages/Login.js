import React from 'react'
import { useState } from 'react'
import config from '../config';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Cookies from 'universal-cookie'


const Login=()=>{

    const paperStyle={padding :20,height:'70vh',width:400, margin:"40px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const [username, setLogin] = useState();
    const [password, setPassword] = useState();

    const handleClick = async() => {
        
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

        if (res.status == 200) {
            const data = await res.json();
            const cookies = new Cookies();
            cookies.set('loginToken', data.token, { path: '/' });
            console.log(data.token);
        } else if (res.status == 401) {
            console.log("niepoprawne hasło");
        } else {
            console.log('nie pykło :/');
        }
        
    }

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Log In</h2>
                </Grid>
                <TextField onChange={e => setLogin(e.target.value)} label='Username' placeholder='Enter username' fullWidth required/>
                <TextField onChange={e => setPassword(e.target.value)} label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button onClick={handleClick} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                     <Link href="/forgot" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account?
                     <Link href="/signin">
                        Sign in
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login
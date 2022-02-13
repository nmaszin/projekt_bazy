import React from 'react';
import { useState } from 'react';
import { Grid,Paper, Avatar, TextField, Button} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const Login=()=>{

    const paperStyle={padding :20,height:'70vh',width:400, margin:"40px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    
    const handleClick = () => {
        console.log(email, name, surname, username, password);
    }

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                    <TextField onChange={e => setEmail(e.target.value)} label='Email' placeholder='Enter email' fullWidth required/>
                    <TextField onChange={e => setName(e.target.value)} label='Name' placeholder='Enter name' fullWidth required/>
                    <TextField onChange={e => setSurname(e.target.value)} label='Surname' placeholder='Enter surname' fullWidth required/>
                    <TextField onChange={e => setUsername(e.target.value)} label='Username' placeholder='Enter username' fullWidth required/>
                    <TextField onChange={e => setPassword(e.target.value)} label='Password' placeholder='Enter password' type='password' fullWidth required/>

                    <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="I accept the Privacy Policy"
                 />
                <Button onClick={handleClick} type='button' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>

            </Paper>
        </Grid>
    )
}

export default Login
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Paper, Typography, Grid, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import Input from "./Input";
import Icon from "./Icon"
import { gapi } from "gapi-script"

import useStyles from "./styles"

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export default function Auth(){

    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState)
    const clientId = "948298241563-6a6tg46nqqk4ap02ou9o464qorkiqt3q.apps.googleusercontent.com"

    React.useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        }

        gapi.load('client:auth2', start)
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    const handleChange = () => {

    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword );

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    };

    const googleSuccess = async (res) => {
        console.log('res', res);
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data:{ result, token }});
            navigate('/')
        } catch (error) {
            console.log('error', error)
        }
    };

    const googleFailure = (error) => {
        console.log('error', error)
        console.log('Google Sign In was unseccussful. Try again later!');

    }

    return(
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3} >
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5"> {isSignUp ? 'Sign Up' : 'Sign In'} </Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {
                            isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                        { isSignUp ? 'Sign Up' : ' Sign In' }
                    </Button>
                    <GoogleLogin 
                    clientId="948298241563-6a6tg46nqqk4ap02ou9o464qorkiqt3q.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button 
                        className={classes.googleButton} 
                        color="primary" 
                        fullWidth 
                        onClick={renderProps.onClick} 
                        disabled={renderProps.disabled}
                        startIcon={<Icon />}
                        variant="contained" >
                            Google Sign In
                         </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin" />
                    <Grid container justifyContent="flex-end" >
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }    
                            </Button> 
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
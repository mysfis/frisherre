import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { navigate } from "@reach/router"


import { useAuth } from 'context/auth';

const useStyles = makeStyles(theme => ({
'@global': {
    body: {
    backgroundColor: theme.palette.common.white,
    },
},
paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
},
avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
},
form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
},
submit: {
    margin: theme.spacing(3, 0, 2),
},
}));

function SignIn(props) {
    const classes = useStyles();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {login, fetchProfiles} = useAuth()

    React.useEffect(()=>{
        if (props.error) {console.log('logging failed')}
    }, [props.error])

    React.useEffect(()=>{
        if (props.isAuthenticated) {
            console.log('already logged')
            fetchProfiles()}},
        [props.isAuthenticated, fetchProfiles])

    const signin = (e) => {
        e.preventDefault()
        console.log("your are logging with ", email)
        login(email, password).then(navigate('/'))
    }

    return (
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <form className={classes.form} noValidate
                onSubmit={signin}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign In
            </Button>
            {/* <Grid container>
                <Grid item xs>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid> */}
            </form>
        </div>
        </Container>
    );
}
export default SignIn
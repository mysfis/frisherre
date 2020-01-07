import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { navigate } from "@reach/router"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    alert: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));

function SignIn(props) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {authData, login, fetchProfiles} = useAuth()
    const [alert, setAlert] = useState(authData.error)

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
        console.log("your no.comare logging with ", email)
        login(email, password)
        .then(navigate('/'))
        .catch(error=> {
            console.log("LOGIN ERROR")
            setAlert(error)
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Dialog
                    open={alert!=null}
                    onClose={()=>setAlert(null)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Erreur de login"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Les informations de connections ne correspondent pas à un accès existant.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={()=>setAlert(null)} color="primary" autoFocus>
                        Fermer
                    </Button>
                    </DialogActions>
                </Dialog>
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
import React from 'react';
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { useAuth } from 'context/auth';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    }));

const UserAccount = (props) => {
    const classes = useStyles();
    const { authData } = useAuth()

    const newUser = {"url":"","email":"","first_name":"","last_name":"","user_account":{"title":"","birth_date":"","address_line1":"","address_line2":"","country":"","city":"","zip":"","photo":null}}
    
    const [user, setUser] = React.useState(authData.user? authData.user : newUser)
    const [account, setAccount] = React.useState(user.account)

    const getUser = React.useCallback(() => {
        if (authData.user) {
            setUser(authData.user)
            setAccount(authData.user.account)
        }
    }, [authData.user])

    React.useEffect(() => getUser(), [getUser]);


    const handleChange = name => event => {
        setAccount({ ...account, [name]: event.target.value })
    };

    const saveAccount = () => {
        if (authData.token !== null) {
            setUser({ ...user, "account": account });
            axios.defaults.headers= {
                "Content-Type": "application/json",
                Authorization: "Token " + authData.token,
            }
            axios
                .put(account.url, account)
                .catch(err => console.log(err));
        }
    };

    return (
        <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
                {user.first_name} {user.last_name}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    id="address1" name="address1"
                    label="Addresse"
                    fullWidth
                    autoComplete="billing address-line1"
                    onChange={handleChange('address_line1')}
                    value={account.address_line1 || ''}
                    helperText={account.address_line1 === "" ? 'Champ obligatoire!' : ' '}
                    error = {account.address_line1 === "" ? true : false}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    id="address2"
                    name="address2"
                    label="Complément d'adresse"
                    fullWidth
                    autoComplete="billing address-line2"
                    onChange={handleChange('address_line2')}
                    value={account.address_line2 || ''}
                    />
                </Grid>
                <Grid item xs={4} sm={2}>
                    <TextField
                    required
                    id="zip_code"
                    name="zip_code"
                    label="Zip"
                    fullWidth
                    autoComplete="billing postal-code"
                    onChange={handleChange('zip_code')}
                    value={account.zip_code || ''}
                    helperText={account.zip_code === "" ? 'Champ obligatoire!' : ' '}
                    error = {account.zip_code === "" ? true : false}
                    />
                </Grid>
                <Grid item xs={8} sm={6}>
                    <TextField
                    required
                    id="city"
                    name="city"
                    label="Ville"
                    fullWidth
                    autoComplete="billing address-level2"
                    onChange={handleChange('city')}
                    value={account.city || ''}
                    helperText={account.city === "" ? 'Champ obligatoire!' : ' '}
                    error = {account.city === "" ? true : false}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                    required
                    id="country"
                    name="country"
                    label="Pays"
                    fullWidth
                    autoComplete="billing address-level2"
                    onChange={handleChange('country')}
                    value={account.country || ''}
                    helperText={account.city === "" ? 'Champ obligatoire!' : ' '}
                    error = {account.city === "" ? true : false}
                    />
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={saveAccount}
                >
                    Mettre à jour
                </Button>
            </Grid>
        </Paper>
    );
    }

export default UserAccount;

import React from 'react';
import axios from 'axios';
import moment from 'moment'
import MomentUtils from '@date-io/moment';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EventIcon from '@material-ui/icons/Event';

import { useAuth } from 'context/auth';
import ProfileIcons from 'components/icons/ProfileIcons'
import { Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';

const iconNames = [
    'man01', 'man02', 'man03', 'man07', 'man08','man10', 
    'man14', 'man15', 'man20', 'man21', 'man25', 'man06',
    'woman01', 'woman05', 'woman08', 'woman09', 'woman12', 'woman13',
    'woman15', 'woman17', 'woman19', 'woman20','woman22', 'woman23',
]

const colorNames = [
    'red', 'blue', 'green', 'purple', 'orange', 'brown'
]

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
    icon: {
        color: theme.palette.primary.main,
    },	
    avatarClass: {
        width: 36,
        height: 36,
        // borderRadius: 10,
        // fontSize: '0.8em',
        // color: theme.palette.primary.main,
      },
}));

const emptyProfile = { url: "", first_name: "", last_name: "", birth_date: "",icon_name:'', icon_color:''}

const CreateProfileDialog = (props) => {
    const theme = useTheme()
    const classes = useStyles(theme);
    const onMobile = useMediaQuery(theme.breakpoints.down('xs'))

    const { authData, fetchProfiles, selectProfile } = useAuth()
    const [profile, setProfile] = React.useState(props.profile? props.profile : emptyProfile)
    React.useEffect(()=>setProfile(props.profile? props.profile : emptyProfile), [props.profile])

    const handleChange = name => event => {
        setProfile({ ...profile, [name]: event.target.value })
    };

    const handleDateChange = value => {
        setProfile({ ...profile,
            birth_date: moment(value).format('YYYY-MM-DD') })
    };

    const iconChange = icon => {
        setProfile({ ...profile,
            icon_name: icon, })
    }

    const colorChange = color => {
        setProfile({ ...profile,
            icon_color: color, })
    }

    // const handlePictureChange = (e) => { setProfile({...profile, picture: e.target.files[0] }) };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        axios.defaults.headers= { // "Content-Type": "application/json",
            'content-type': 'multipart/form-data',
            Authorization: "Token " + authData.token, }

        let form_data = new FormData();
        Object.keys(profile).forEach(key => {
            if (profile[key]) {
                switch(key) {
                case 'account': 
                    const account = profile[key]
                    Object.keys(account).forEach(accountKey => form_data.append('account.'.concat(accountKey), account[accountKey]))
                    break;
                case 'picture':
                    if(typeof(profile[key]) !== 'string') {
                        form_data.append(key, profile[key]); }
                    break;
                default: 
                    form_data.append(key, profile[key])
                }
            }
        });
        
        if (profile.url) {
            return axios
                .put(profile.url, form_data)
                .then(res => {
                    fetchProfiles()
                    if (profile.url === authData.profile.url) {selectProfile(profile)}
                    props.handleRefresh();
                    props.handleClose()
                    
                })
                .catch(err => console.log(err));
            } else {
            return axios
                .post("/api/detailedprofile/", form_data)
                .then(res => {
                    props.handleRefresh();
                    props.handleClose()
                    fetchProfiles()
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose} 
                aria-labelledby="Nouveau Profile" 
                fullScreen = {onMobile}>
            <DialogTitle id="create-profile-dialog" style={{backgroundColor: theme.palette.primary.main, color: theme.palette.common.white}}>
                Créer un nouveau profil
            </DialogTitle>
            <DialogContent>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <TextField
                id="first_name" required fullWidth
                name="first_name" label="Prénom" autoComplete="first_name" 
                onChange={handleChange('first_name')}
                value={profile.first_name || ''}
                helperText={profile.first_name === "" ? 'Champ obligatoire!' : ' '}
                error = {profile.first_name === "" ? true : false}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                id="last_name" required fullWidth
                name="last_name" label="Nom de famille" autoComplete="last_name"
                onChange={handleChange('last_name')}
                value={profile.last_name || ''}
                helperText={profile.last_name === "" ? 'Champ obligatoire!' : ' '}
                error = {profile.last_name === "" ? true : false}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <MuiPickersUtilsProvider  utils={MomentUtils}>
                <KeyboardDatePicker
                    id="date-picker-dialog"
                    label="Date de naissance"
                    format="DD/MM/YYYY"
                    value={profile.birth_date || null }
                    onChange={date => handleDateChange(date)}
                    KeyboardButtonProps={{  'aria-label': 'change date' }}
                    helperText={profile.birth_date === "" ? 'Champ obligatoire!' : ' '}
                    error = {profile.birth_date === "" ? true : false}
                    keyboardIcon={<EventIcon className={classes.icon}/>}
                />
                </MuiPickersUtilsProvider>
            </Grid>
            <Typography>
                Choix de l'avatar
            </Typography>
            <Grid item xs={12} sm={12} container>
                {iconNames.map(icon =>(
                <Grid item xs={2} sm={1} key={icon} >
                    <IconButton onClick={() => {iconChange(icon)}} className={classes.avatarClass} >
                        <ProfileIcons name={icon} 
                            className={classes.avatarClass}
                            highlight={profile.icon_name===icon}/>
                    </IconButton>
                </Grid>
                ))}
            </Grid>
            <Typography>
                Couleur de l'avatar
            </Typography>
            <Grid item xs={12} sm={12} container>
                {colorNames.map(color =>(
                <Grid item xs={2} sm={2} key={color}>
                    <IconButton onClick={() => {colorChange(color)}} className={classes.avatarClass} >
                    <ProfileIcons name={profile.icon_name}
                        className={classes.avatarClass} 
                        color={color}
                        highlight={profile.icon_color===color}/>
                    </IconButton>
                </Grid>
                ))}
            </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                        color="primary"
                        onClick={props.handleClose}
                    >Annuler</Button>
                <Button
                    color="primary"
                    onClick={handleFormSubmit}
                >Sauver</Button>
            </DialogActions>
    {/* </Container> */}
    </Dialog>
    );
}


export default CreateProfileDialog

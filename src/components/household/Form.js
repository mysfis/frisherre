import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment'
import MomentUtils from '@date-io/moment';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EventIcon from '@material-ui/icons/Event';

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
}));

const ProfileForm = (props) => {
  const classes = useStyles();
  const [profile, setProfile] = React.useState(props.profile)
  React.useEffect(()=>setProfile(props.profile), [props.profile])

  const handleChange = name => event => {
    setProfile({ ...profile, [name]: event.target.value })
  };

  const handleDateChange = value => {
    setProfile({
      ...profile,
      birth_date: moment(value).format('YYYY-MM-DD') })
  };

  // const handlePictureChange = (e) => {
  //   setProfile({...profile, picture: e.target.files[0] })
  // };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios.defaults.headers= {
      // "Content-Type": "application/json",
      'content-type': 'multipart/form-data',
      Authorization: "Token " + props.token,
    }
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
              form_data.append(key, profile[key]);
            }
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
            props.handleRefresh();
          })
          .then(props.handleClose())
          .catch(err => console.log(err));
    } else {
      return axios
          .post("/api/detailedprofile/", form_data)
          .then(res => {
            props.handleRefresh();
          })
          .then(props.handleClose())
          .catch(err => console.log(err));
    }
  }

  return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
            <TextField
              required
              id="first_name" name="first_name"
              label="Prénom"
              fullWidth
              autoComplete="first_name"
              onChange={handleChange('first_name')}
              value={profile.first_name || ''}
              helperText={profile.first_name === "" ? 'Champ obligatoire!' : ' '}
              error = {profile.first_name === "" ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="last_name"
              name="last_name"
              label="Nom de famille"
              fullWidth
              autoComplete="last_name"
              onChange={handleChange('last_name')}
              value={profile.last_name || ''}
              helperText={profile.last_name === "" ? 'Champ obligatoire!' : ' '}
              error = {profile.last_name === "" ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
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
          {/*
          <Grid item xs={12} sm={3}>
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: 'none' }}
              id="new-profile-picture"
              type="file"
              onChange={handlePictureChange}
            />
            <label htmlFor="new-profile-picture">
              <Button variant="contained" 
                  color="secondary"
                  fullWidth
                  component="span" 
                  className={classes.submit}>
                Change Picture
              </Button>
            </label> 
          </Grid>
        */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleFormSubmit}
          >
            Mettre à jour
          </Button>
      </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  }
}

export default connect(mapStateToProps)(ProfileForm)

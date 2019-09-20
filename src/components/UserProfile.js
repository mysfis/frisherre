import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios'
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


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

const UserProfile = (props) => {
  const classes = useStyles();

  const newUser = {"url":"","email":"","first_name":"","last_name":"","profile":{"title":"","birth_date":"","address_line1":"","address_line2":"","country":"","city":"","zip":"","photo":null}}
  const [user, setUser] = React.useState(newUser)
  const [profile, setProfile] = React.useState(newUser.profile)
  const [refresh, setRefresh] = React.useState(false)
  React.useEffect(() => {getMyProfile()}, [refresh]);
  React.useEffect(() => {
    setProfile(user.profile)
    console.log(user.profile)
  },
    [user.profile]);

  const getMyProfile = () => {
    if (props.token !== null) {
      axios.defaults.headers= {
        "Content-Type": "application/json",
        Authorization: "Token " + props.token,
      }
      axios
          .get("/api/currentuser/")
          .then(res => setUser(res.data[0]))
          .catch(err => console.log(err));
      setRefresh(false)
    }
  };

  const handleChange = name => event => {
    setProfile({ ...profile, [name]: event.target.value })
  };

  const saveMyProfile = () => {
    if (props.token !== null) {
      setUser({ ...user, "profile": profile });
      axios.defaults.headers= {
        "Content-Type": "application/json",
        Authorization: "Token " + props.token,
      }
      console.log(profile.url, profile)
      axios
          .put(profile.url, profile)
          .then(res => {
            setRefresh(true);
          })
          .catch(err => console.log(err));
      setRefresh(false)
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
              value={profile.address_line1 || ''}
              helperText={profile.address_line1 === "" ? 'Champ obligatoire!' : ' '}
              error = {profile.address_line1 === "" ? true : false}
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
              value={profile.address_line2 || ''}
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip"
              fullWidth
              autoComplete="billing postal-code"
              onChange={handleChange('zip')}
              value={profile.zip || ''}
              helperText={profile.zip === "" ? 'Champ obligatoire!' : ' '}
              error = {profile.zip === "" ? true : false}
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
              value={profile.city || ''}
              helperText={profile.city === "" ? 'Champ obligatoire!' : ' '}
              error = {profile.city === "" ? true : false}
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
              value={profile.country || ''}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={saveMyProfile}
          >
            Mettre à jour
          </Button>
      </Grid>
    </Paper>
  );
}

const mapStateToProps = state => {
  return {
    token: state.token,
  }
}

export default connect(mapStateToProps)(UserProfile);

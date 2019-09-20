import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
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
}));


const url_server = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : '';

const UserProfile = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState({email:''})
  const [refresh, setRefresh] = useState(false)

  useEffect(() => getMyProfile(), [refresh, props]);

  const getMyProfile = () => {
    if (props.token !== null) {
      axios.defaults.headers= {
        "Content-Type": "application/json",
        Authorization: "Token " + props.token,
      }
      axios
          .get(url_server+"/api/currentuser/")
          .then(res => setUser(res.data[0]))
          .catch(err => console.log(err));
      setRefresh(false)
    }
  };

  const handleChange = name => event => {
    setUser({ ...user, [name]: event.target.value });
  };

  return (
<div className={classes.root}>
<Paper className={classes.paper}>
    <form className={classes.root} noValidate autoComplete="off">
      <Container>
        <Typography variant="h5"  align="center">Mon Profile</Typography>
        </Container>

        <TextField
          id="my_first_name" label="first_name"
          value={user['first_name'] || ''}
          onChange={handleChange('first_name')}
          margin="dense" className={classes.textField}
        />
        <TextField
          id="my_last_name" label="last_name"
          value={user['last_name'] || ''}
          onChange={handleChange('last_name')}
          margin="dense" className={classes.textField}
        />
        <TextField
          id="my_email" label="email"
          value={user['email'] || ''}
          onChange={handleChange('email')}
          margin="dense" className={classes.textField}
        />
        <TextField
          id="my_email" label="email"
          value={user['email'] || ''}
          onChange={handleChange('email')}
          margin="dense" className={classes.textField}
        />
      </form>
      </Paper>

    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.token,
  }
}

export default connect(mapStateToProps)(UserProfile);

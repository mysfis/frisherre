import React from 'react';
import Paper from '@material-ui/core/Paper';
import MuiAvatar from '@material-ui/core/Avatar';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import { makeStyles } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
    position:'relative',
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 5, //makes it square
    // border: '1px solid #DBDBDB',
    margin: 5,
    borderColor: '#000',
    fontSize: '0.8em',
    backgroundColor: blue[200],
  },
  icon: {
    width: 15,
    height: 15,
    color: red[400],
    backgroundColor: blue[200],
    position: 'absolute',
    borderRadius: 50,
    radius: 2,
    padding: 2,
    top:-15,
    left:15,
  },
}));


function Avatar({ user }) {
  const classes = useStyles();
  let email= user?user.email:'keluno@keluno.com'
  let iconUrl = `https://robohash.org/${email}?set=set3`
  if (user && user.isDriving) {iconUrl = `https://robohash.org/${email}`}
  return (
      <MuiAvatar
        className={classes.avatar}
        src={iconUrl}>
      </MuiAvatar>
  );
}

export default Avatar;

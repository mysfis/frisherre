import React from 'react';
import MuiAvatar from '@material-ui/core/Avatar';
// import DriveEtaIcon from '@material-ui/icons/DriveEta';
import { makeStyles } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
    position:'relative',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    border: '2px solid',
    boxSizing: 'border-box',
    borderColor: '#DBDBDB',
    fontSize: '0.8em',
    // backgroundColor: blue[200],
  },
  bigAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  smallAvatar: {
    width: 28,
    height: 28,
    borderRadius: 8,
  },
  isDriving: {
    borderColor: '#6F86FF',
  },
  isAttending: {
    borderColor: '#90EAA9',
  },
  isNotAttending: {
    borderColor: '#E87878',
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


function Avatar({ user, size }) {
  const classes = useStyles();
  let email= user?user.email:'keluno@keluno.com'
  let iconUrl = `https://robohash.org/${email}?set=set3`
  let avatarClass = `${classes.avatar}`
  switch(size) {
    case 'big':
      avatarClass = `${avatarClass} ${classes.bigAvatar}`
      break;
    case 'small':
      avatarClass = `${avatarClass} ${classes.smallAvatar}`
      break;
    default:
      break;
  }
  if (user) {
    if (user.is_driver) {avatarClass = `${avatarClass} ${classes.isDriving}`}
    if (user.is_participant != null) {
      switch(user.is_participant) {
        case false:
          avatarClass = `${avatarClass} ${classes.isNotAttending}`
          break;
        case true:
          avatarClass = `${avatarClass} ${classes.isAttending}`
          break;
        default:
          break;
      }
    }
  }
  
  return (
      <MuiAvatar
        className={avatarClass}
        src={iconUrl}>
      </MuiAvatar>
  );
}

export default Avatar;

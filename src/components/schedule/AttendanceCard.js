import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Divider from '@material-ui/core/Divider';

import { blue, red, green } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
  layout:{
    border: '1px solid #DBDBDB', borderRadius: 5, radius: 2,
  },
  card: {
    display: 'flex', width:'100%',
  },
  details: {
    display: 'flex', flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    color: theme.palette.primary.main
  },
  controls: {
    display: 'flex', alignItems: 'center',
    paddingLeft: theme.spacing(2), paddingBottom: theme.spacing(2),
  },
  playIcon: {
    height: 38, width: 38,
  },
  icon: {
    marginRight: theme.spacing(2), width: 20, height: 20, 
    border: '1px solid #DBDBDB', borderRadius: 5, radius: 2,
    '&:hover': { backgroundColor: '#DBDBDB', },
  },
  acceptedIcon: {
    backgroundColor: green[800],
  }
}));


export default function MediaControlCard({ outing }) {
  const classes = useStyles();
  // const avatarUrl = `https://robohash.org/${profile.first_name}?set=set3`
  const avatarUrl = `https://robohash.org/test?set=set3`

  return (
    <Card className={classes.card}>
        <CardMedia
            className={classes.cover}
            image={avatarUrl}
            title="Live from space album cover"
          />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="body1">
            {outing.name}
          </Typography>
          <Divider variant="fullWidth" />

          <Typography variant="caption" color="textSecondary" >
            {outing.description} à {outing.location}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
        {outing.accepted ? (
          <DoneIcon className={classes.icon} style={{backgroundColor: green[800],}}/>
        ):(
          <DoneIcon className={classes.icon} style={{color: green[200],}}/>
        )}
        {outing.declined ? (
          <ClearIcon className={classes.icon} style={{backgroundColor: red[800],}}/>
        ):(
          <ClearIcon className={classes.icon} style={{color: red[200],}}/>
        )}
        {outing.isDriving ? (
          <DriveEtaIcon className={classes.icon} style={{backgroundColor: blue[800],}}/>
        ):(
          <DriveEtaIcon className={classes.icon} style={{color: blue[200],}}/>
        )}

        </div>
      </div>
    </Card>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProfileCard from 'components/user/ProfileCard';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
  },
}));

const emptyProfile = {
    "url": "",
    "first_name": "Nouveau",
    "last_name": "",
    "birth_date": "<-- click"
}

export default function ImageGridList(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.gridList}>
        {props.profiles.map(profile => (
          <Grid item key={JSON.stringify(profile)} xs={12} sm={6} md={4} >
            <ProfileCard
              profile={profile}
              handleEdit={props.handleEdit}
              handleDelete={props.handleDelete}
            />
          </Grid>
        ))}
        <Grid item key="new-profil" cols={1} xs={12} sm={6} md={4} >
          <ProfileCard
            profile={emptyProfile}
            handleAdd={props.handleAdd}
          />
        </Grid>
      </Grid>
    </div>
  );
}

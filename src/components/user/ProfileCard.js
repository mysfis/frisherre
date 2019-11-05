import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    margin: theme.spacing(1),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flex: '1 0 auto',
  },
  cover: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    color: theme.palette.primary.main
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 25,
    width: 25,
    color: theme.palette.text.secondary
  },
}));

export default function ProfileCard(props) {
  const [profile] = React.useState(props.profile)
  const classes = useStyles();
  let avatarUrl = `https://robohash.org/${profile.first_name}?set=set3`
  if (profile.picture) { avatarUrl = profile.picture}
  return (
    <Card className={classes.card}>
      {profile.url
        ? <CardMedia
          className={classes.cover}
          image={avatarUrl}
          title="My avatar"
        />
      :
        <IconButton aria-label="New profile" onClick={props.handleAdd}>
          <AddCircleOutlineIcon className={classes.cover} />
        </IconButton>
      }

      <div className={classes.details}>
        <CardContent className={classes.cardContent}>
          <Typography component="h5" variant="h6">
            {profile.first_name}
          </Typography>
          <Typography component="h5" variant="h6">
            {profile.last_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {profile.birth_date}
          </Typography>
        </CardContent>
        {profile.url
          ?
          <div className={classes.controls}>
            <IconButton aria-label="previous">
              <WhatsAppIcon  className={classes.playIcon}/>
            </IconButton>
            <IconButton aria-label="play/pause" onClick={()=> props.handleEdit(profile)}>
              <EditIcon className={classes.playIcon}/>
            </IconButton>
            <IconButton aria-label="next" onClick={()=> props.handleDelete(profile)}>
              <DeleteIcon className={classes.playIcon}/>
            </IconButton>
                </div>
            :
            ''
          }

      </div>
    </Card>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from 'components/user/Avatar'

import { IconButton } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import { blue, red, green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    marginRight: theme.spacing(0),
    border: '1px solid #DBDBDB',
    borderRadius: 5,
    '&:hover': { backgroundColor: '#DBDBDB', },
  },
}));

const outingItemsInitial=[
  {
    name:"name1",
    description:"description1 description1 description1 ",
    accepted: true,
    declined: false,
    isDriving: true,
  },
  {
    name:"name2",
    description:"description2 description2 description2",
    accepted: false,
    declined: true,
    isDriving: false,
  },
]

export default function CheckboxListSecondary() {
  const classes = useStyles();
  // const [checked, setChecked] = React.useState([1]);
  // const [secondary, setSecondary] = React.useState([1])
  const [outingItems, setOutingItems] = React.useState(outingItemsInitial)

  const showDescription = item => () => {
    item.desc=!item.desc
    setOutingItems([...outingItems])
  };

  // const handleToggle = value => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];
  //   console.log('currentIndex:', currentIndex)
  //   console.log('newChecked:', newChecked)
  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  //   // setSecondary(newChecked)
  // };

  return (
    <List dense className={classes.root}>
      {outingItems.map(outing => {
        const labelId = `checkbox-list-secondary-label-${outing.name}`;
        return (
          <ListItem key={outing.name} button>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
                id={labelId}
                primary={outing.name}
                secondary={outing.desc ? null: outing.description}
            />
            <ListItemSecondaryAction>
              <IconButton>
                {outing.accepted ? (
                  <DoneIcon className={classes.icon} style={{backgroundColor: green[800],}}/>
                ):(
                  <DoneIcon className={classes.icon} style={{color: green[200],}}/>
                )}
              </IconButton>
              <IconButton>
                {outing.declined ? (
                  <ClearIcon className={classes.icon} style={{backgroundColor: red[800],}}/>
                ):(
                  <ClearIcon className={classes.icon} style={{color: red[200],}}/>
                )}
              </IconButton>
              <IconButton>
                {outing.isDriving ? (
                  <DriveEtaIcon className={classes.icon} style={{backgroundColor: blue[800],}}/>
                ):(
                  <DriveEtaIcon className={classes.icon} style={{color: blue[200],}}/>
                )}
              </IconButton>

              <IconButton>
                <NotListedLocationIcon onClick={showDescription(outing)}
                style={outing.desc ? {color: blue[800],}:{color: blue[200],}}/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

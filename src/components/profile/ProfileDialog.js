import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from "@reach/router"

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';

import { useAuth } from 'context/auth';

const useStyles = makeStyles({
        avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function ProfileDialog(props) {
    const classes = useStyles();

    const { authData, selectProfile } = useAuth()
    const { open, onClose } = props;

    const [profiles, setProfiles] = React.useState(authData.profiles)

    const handleClose = () => { onClose(); };
    const handleListItemClick = value => { 
        selectProfile(value)
        onClose(); };

    React.useEffect(() => { 
        setProfiles(authData.profiles) 
    }, [authData.profiles]);
    
    return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Choisissez le profil</DialogTitle>
        <List>
        {profiles? profiles.map(selectProfile => (
            <ListItem 
                autoFocus={selectProfile===authData.profile? true : false} 
                button onClick={() => handleListItemClick(selectProfile)} 
                key={selectProfile.first_name}>
                <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                    <PersonIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={selectProfile.first_name} />
            </ListItem>
        )) : ''}
        <ListItem button onClick={() => navigate('/profile')}>
            <ListItemAvatar>
            <Avatar>
                <AddIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary="add account" />
        </ListItem>
        </List>
    </Dialog>
    );
}


ProfileDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default ProfileDialog
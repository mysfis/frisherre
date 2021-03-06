import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { useAuth } from 'context/auth';
import ProfileAvatar from 'components/profile/ProfileAvatar'

function SelectProfileDialog(props) {
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
                <ProfileAvatar 
                        type='icon'
                        profile={selectProfile}/>
                </ListItemAvatar>
                <ListItemText primary={selectProfile.first_name} />
            </ListItem>
        )) : ''}
        {/* <ListItem button onClick={() => navigate('/profile')}>
            <ListItemAvatar>
            <Avatar>
                <AddIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary="add account" />
        </ListItem> */}
        </List>
    </Dialog>
    );
}


SelectProfileDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default SelectProfileDialog
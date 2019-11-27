    import React from 'react';
    import PropTypes from 'prop-types';
    import { makeStyles } from '@material-ui/core/styles';
    import { connect } from 'react-redux';
    import { navigate } from "@reach/router"
    import * as actions from 'store/actions/auth';

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

    const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    });

    function ProfileDialog(props) {
        const classes = useStyles();
        const { onClose, selectedValue, open } = props;

        const [profiles, setProfiles] = React.useState([])
    
        const handleClose = () => { onClose(selectedValue); };
        const handleListItemClick = value => { 
            console.log(value)
            props.setProfile(value)
            onClose(value); };

        React.useEffect(() => setProfiles(props.profiles), [props.profiles]);
        
        return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Choisissez le profil</DialogTitle>
            <List>
            {profiles? profiles.map(selectProfile => (
                <ListItem button onClick={() => handleListItemClick(selectProfile)} key={selectProfile.first_name}>
                <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                    <PersonIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={selectProfile.first_name} />
                </ListItem>
            )) : ''}
            <ListItem autoFocus button onClick={() => navigate('/profile')}>
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

    
    const mapStateToProps = (state) => {
        return {
            profiles: state.profiles
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            setProfile: (profile) => dispatch(actions.setProfile(profile)),
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(ProfileDialog);
    // export default ProfileDialog
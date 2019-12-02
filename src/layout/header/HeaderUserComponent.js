import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import LockIcon from '@material-ui/icons/Lock';
import Menu from '@material-ui/core/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import { useAuth } from 'context/auth';
import ProfileDialog from 'components/profile/ProfileDialog'
import ProfileAvatar from 'components/profile/ProfileAvatar'


const styles = ({ spacing, transitions, breakpoints, palette, shape }) => ({
    header: {
        fontWeight: 900,
        minWidth: 0,
        fontSize: 18,
    },
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        marginRight: 8,
        borderRadius: shape.borderRadius,
        background: palette.common.white,
        '&:hover': {
        background: palette.grey[200],
        },
        marginLeft: 0,
        width: '100%',
        [breakpoints.up('sm')]: {
        marginLeft: spacing(1),
        width: 'auto',
        },
    },
    searchIcon: {
        color:palette.primary.main,
        width: spacing(9),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: palette.primary.main,
        width: '100%',
    },
    inputInput: {
        borderRadius: 4,
        paddingTop: spacing(1),
        paddingRight: spacing(1),
        paddingBottom: spacing(1),
        paddingLeft: spacing(10),
        transition: transitions.create('width'),
        width: '100%',
        [breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
            width: 200,
        },
        },
    },
});

function HeaderUserComponent({ classes, screen }) {

    const { authData, fetchProfiles, logout, selectProfile } = useAuth()
    
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [open, setOpen] = React.useState(!authData.profile)

    const [profiles, setProfiles] = React.useState(authData.profiles)

    const handleClick = event => { setAnchorEl(event.currentTarget)}
    const handleClose = () => {setAnchorEl(null)}

    const handleListItemClick = value => { 
        selectProfile(value)
        handleClose(); };
    
    const getProfiles = React.useCallback(()=> {
        if (!authData.profiles) {fetchProfiles()}
    }, [authData.profiles, fetchProfiles])
    
    React.useEffect(() => {
        getProfiles()
        setProfiles(authData.profiles)
    }, [getProfiles, authData.profiles]);

    // React.useEffect(() => {
    //     async function fetchData() { await fetchProfiles() }
    //     if (!authData.profiles) { fetchData() }
    //   }, []); 

    // React.useEffect(() => setProfiles(authData.profiles), [authData.profiles]);

    return (
        <React.Fragment>
            <ProfileDialog open={open} onClose={()=> setOpen(false)} /> 
            <Typography noWrap className={classes.header}>
            Keluno
            </Typography>
            <div className={classes.grow} />
            {screen !== 'xs' && (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                <Icon>search</Icon>
                </div>
                <InputBase
                placeholder="Chercher sortie…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                />
            </div>
            )}

            {/* <IconButton onClick={() => {logout()}}> */}
            <IconButton onClick={handleClick}>
                {authData.profile?
                <ProfileAvatar 
                    type='icon'
                    profile={authData.profile}/>
                :
                    <LockIcon />
                }
                
            </IconButton>
            <Menu id='profile-menu' 
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
            {profiles && profiles.map(selectProfile => (
                <ListItem button onClick={() => handleListItemClick(selectProfile)} key={selectProfile.first_name}>
                <ListItemAvatar>
                    <ProfileAvatar 
                        type='icon'
                        profile={selectProfile}/>
                </ListItemAvatar>
                <ListItemText primary={selectProfile.first_name} />
                </ListItem>
            ))}
            <ListItem autoFocus button onClick={() => logout()}>
                <ListItemAvatar>
                <Avatar>
                    <LockIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Quitter" />
            </ListItem>
            </Menu>
        </React.Fragment>
    );
}

HeaderUserComponent.propTypes = {
    screen: PropTypes.string,
    classes: PropTypes.shape({}).isRequired,
};
HeaderUserComponent.defaultProps = {
    screen: null,
};

export default withStyles(styles)(HeaderUserComponent)

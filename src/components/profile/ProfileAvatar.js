import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { blue } from '@material-ui/core/colors';

import { Box, Avatar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ProfileIcon from 'components/icons/ProfileIcons'


const useStyles = makeStyles((theme, size) => ({
    picture: {
        position:'absolute',
        height:100,
        width:100,
        borderRadius:60,
        border:'4px solid',
        borderColor: theme.palette.primary.main,
        background: theme.palette.background.paper,
        left:28,
        marginLeft:0,
        top: -60,
        display: 'flex', 
        justifyContent:'center',
        alignItems:'center'
    },
    icon: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    smallAvatar:{
        padding: 4,
        width: 36,
        height: 36,
    },
    mediumAvatar:{
        padding: 4,
        width: 48,
        height: 48,
    },
    bigAvatar:{
        padding: 10,
        width: 90,
        height: 90,
    },
}));

function ProfileAvatar({profile, handleAdd, type, collapsed}) {
    const classes = useStyles();

    if (!profile) {
        return (
            <Box className={classes.picture}>
                <IconButton aria-label="New profile" onClick={handleAdd}>
                    <AddCircleOutlineIcon className={classes.picture} />
                </IconButton>
            </Box>
        )
    }

    // switch (size) {
    //     case ' big': return (<CardMedia className={classes.bigAvatar} image={url} title="My avatar" />
    //     )
    // }
    switch (type) {
        case 'card': return (
            <Box className={classes.picture}>
                <ProfileIcon 
                    name={profile.icon_name} 
                    size="big"
                    color={profile.icon_color} />
            </Box>)
        case 'icon': return (
            <Avatar className={classes.icon}>
                <ProfileIcon 
                    name={profile.icon_name} 
                    size="small"
                    color={profile.icon_color} />
            </Avatar>)
        case 'nav': return (   
            <ProfileIcon 
                    name={profile.icon_name} 
                    size={collapsed ? "medium": "big"}
                    style={{
                        transition: '0.3s',}}
                    color={profile.icon_color} />     
        )
        default: return (
            <Avatar className={classes.icon}>
                <PersonIcon />
            </Avatar>
        )
    }
}

export default ProfileAvatar
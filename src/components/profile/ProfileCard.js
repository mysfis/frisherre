import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Grid, Divider, IconButton } from '@material-ui/core'

import { blue } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InfoIcon from '@material-ui/icons/Info';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import ProfileAvatar from 'components/profile/ProfileAvatar'

const border = '1px solid'
const borderColor = '#DBDBDB' //'#ffffff'

const useStyles = makeStyles(theme => ({

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

    gridItem: {
    },
    card:{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        margin:theme.spacing(4)
    },
    cardHolder: {
        borderTop: border,
        borderColor: borderColor,
        // display:'block',
        height:146,
        width:160,
        position:'relative',
        marginTop: 20,
        display: 'flex', 
        flexDirection: 'column',
        // justifyContent:'center',
        alignItems:'center'
    },
    pictureHolder: {
        display: 'flex', 
        height:60,
    },
    header: {
        display: 'flex', 
        height:30,
        // flexDirection: 'column',
        // alignItems:'flex-end'
    },
    content: {
        // display: 'flex', 
        height:70,
        // flexDirection: 'column',
        // alignItems:'flex-end'
        textAlign:'center',
    },
    divider:{
        width:'100%'
    },
    actions: {
        // display:'block',
        height:32,
        // width:120,
        position:'relative',
        marginTop:3,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    icon: {
        color: theme.palette.primary.main,
    },
    newIcon: {
        color: theme.palette.primary.main,
        margin: 10,
        width: 50,
        height: 50,
    }
}));

const ProfileCard = ({profile, actions}) => {
    const classes = useStyles();

    if (!profile) {
        return (
            <Grid item xs={6} sm={4} md={3}  className={classes.gridItem}>
                <Box className={classes.card}>
                    <Box 
                        boxShadow={3} 
                        className={classes.cardHolder}>
                        <Box className={classes.picture}>
                            <IconButton aria-label="New profile" onClick={actions.handleAdd}>
                                <AddCircleOutlineIcon className={classes.newIcon} />
                            </IconButton>
                        </Box>
                        <Box className={classes.pictureHolder}></Box>
                        <Box className={classes.header}>
                            Nouveau Profil
                        </Box>
                        <Box className={classes.content}>
                            Cliquez sur l'icone "plus" pour ajouter un Profil
                        </Box>
                    </Box>
                </Box>
            </Grid>
        )
    }

    return (
        <Grid item xs={6} sm={4} md={3}  className={classes.gridItem}>
            <Box className={classes.card}>
                <Box 
                    boxShadow={3} 
                    className={classes.cardHolder}
                    style={{backgroundColor: blue[profile.is_main? 50:0]}}>
                    <ProfileAvatar 
                        type='card'
                        profile={profile}/>
                    <Box className={classes.pictureHolder}></Box>
                    <Box className={classes.header}>
                        {profile.first_name} {profile.last_name}
                    </Box>
                    <Box className={classes.content}>
                        TODO: afficher groupes
                    </Box>
                    <Divider className={classes.divider} />
                    <Box className={classes.actions}>
                        <IconButton aria-label="previous">
                            <InfoIcon  className={classes.icon}/>
                        </IconButton>
                        <IconButton aria-label="play/pause" 
                            onClick={()=> actions.handleEdit(profile)}>
                            <EditIcon className={classes.icon}/>
                        </IconButton>
                        <IconButton aria-label="next" 
                            onClick={()=> actions.handleDelete(profile)}>
                            <DeleteIcon className={classes.icon}/>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}

ProfileCard.propTypes = {
};
ProfileCard.defaultProps = {
};


// const mapStateToProps = (state) => {
//   return {
//     token: state.token,
//   }
// }

// export default connect(mapStateToProps)(ProfileCard);
export default ProfileCard;

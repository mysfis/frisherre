import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import ProfileCard from 'components/profile/ProfileCard'
import { Container, Typography, Grid } from '@material-ui/core'
import Link from '@material-ui/core/Link';

import { useAuth } from 'context/auth';
import CreateProfileDialog from './CreateDialog';

const emptyHousehold = {
    account: {
        url: "", household_name: "",
        address_line1: "", address_line2: "", country: "", city: "", zip: ""},
    profiles: [{ url: "", first_name: "", last_name: "", birth_date: "",
    icon_name:'', icon_color:''}]
}


const border = '1px solid'
const borderColor = '#DBDBDB' //'#ffffff'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginLeft: -theme.spacing(1),
    },
    modal: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid',
        borderColor: theme.palette.primary.main,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    gridList: {
        // border: border,
        // borderColor: borderColor,
        marginTop: 10,
        // position:'relative',
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
    avatar:{
        padding: 10,
        width: 90,
        height: 90,
    },
    cardHolder: {
        borderTop: border,
        borderColor: borderColor,
        // display:'block',
        height:186,
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
        height:50,
    },
    header: {
        display: 'flex', 
        height:30,
        // flexDirection: 'column',
        // alignItems:'flex-end'
    },
    content: {
        display: 'flex', 
        height:70,
        // flexDirection: 'column',
        // alignItems:'flex-end'
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
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'middle',
    },
    newIcon: {
        color: theme.palette.background.paper,
        width: 48,
        height: 48
    }
}));

const ProfileGrid = (props) => {
    const classes = useStyles();
    const { authData } = useAuth()
    const [account, setAccount] = useState(props.profiles ? props.profiles.account : emptyHousehold.account)
    const [loading, setLoading] = useState(props.loading == null ? true : props.loading)
    const [profiles, setProfiles] = useState(props.profiles ? props.profiles.profiles : [])

    const [profile, setProfile] = useState(profiles[0])
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = useState(false);

    const getHousehold = React.useCallback(() => {
        console.log('useCallback')
        if (authData.token !== null) {
            axios.defaults.headers= {
                "Content-Type": "application/json",
                Authorization: "Token " + authData.token,
            }
            axios
                .get("/api/currentuser/")
                .then(res => {
                    const user_acount = res.data[0].user_account
                    setProfiles(user_acount.profiles)
                    delete user_acount.profiles
                    setAccount(user_acount)
                    setLoading(false)
                })
                .catch(err => console.log(err));
            }
    }, [authData.token])

    useEffect(() => getHousehold(), [getHousehold, refresh]);

    const handleClose = () => { setOpen(false);}

    const handleRefresh = () => {setRefresh(!refresh);}

    const handleAdd = () => {
        setOpen(true);
        setProfile({
        ...emptyHousehold.profiles[0],
        account: account })
    }

    const handleEdit = (profile) => {
        setOpen(true);
        setProfile(profile)
    }

    const handleDelete = (profile) => {
        if (authData.token !== null) {
        axios.defaults.headers= {
            "Content-Type": "application/json",
            Authorization: "Token " + authData.token,
        }
        axios
            .delete(profile.url)
            .then(res => handleRefresh())
            .catch(err => console.log(err));
        }
    }

    const actions = props.actions ? props.actions : {handleAdd, handleDelete, handleEdit}

    if (loading) {
        return (
            <Container p={{ xs: 2, sm: 3, md: 4 }} className={classes.root}>
                <Typography weight={'bold'} variant={'h4'} gutterBottom>
                    <Link underline={'none'}>Chargement</Link>
                </Typography>
                <Typography variant={'overline'}>
                    <b>Veuillez patienter</b>
                </Typography>
                <Grid container className={classes.gridList}>
                    <ProfileCard  
                        key={JSON.stringify("new profile")} 
                        actions={actions}/>
                </Grid>
                <CreateProfileDialog profile={profile} 
                    open={open} 
                    handleClose={handleClose}
                    handleRefresh={handleRefresh}/>
            </Container>
        )
    }

    return (
        <Container p={{ xs: 2, sm: 3, md: 4 }} className={classes.root}>
            <Typography weight={'bold'} variant={'h4'} gutterBottom>
                <Link underline={'none'}>{account.household_name}</Link>
            </Typography>
            <Typography variant={'overline'}>
                <b>{account.address_line1} {account.address_line2}</b>
            </Typography>
            <Grid container className={classes.gridList}>
                {profiles.map(profile => (
                <ProfileCard  
                    key={JSON.stringify(profile)} 
                    profile={profile}
                    actions={actions}/>
                ))}
                <ProfileCard  
                    key={JSON.stringify("new profile")} 
                    actions={actions}/>
            </Grid>
            <CreateProfileDialog profile={profile} 
                    open={open} 
                    handleClose={handleClose}
                    handleRefresh={handleRefresh}/>
        </Container>
    )
}

ProfileGrid.propTypes = {
};
ProfileGrid.defaultProps = {
};

export default ProfileGrid;

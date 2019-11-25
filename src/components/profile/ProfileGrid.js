import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios';

import ProfileCard from 'components/profile/ProfileCard'
import ProfileForm from 'components/profile/ProfileForm'
import { Container, Typography, Grid, } from '@material-ui/core'
import Link from '@material-ui/core/Link';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade'

const emptyHousehold = {
    account: {
        url: "", household_name: "",
        address_line1: "", address_line2: "", country: "", city: "", zip: ""},
    profiles: [{ url: "", first_name: "", last_name: "", birth_date: "",}]
}


const border = '1px solid'
const borderColor = '#DBDBDB' //'#ffffff'

const useStyles = makeStyles(theme => ({
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
        marginTop: 10
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
    newIcon: {
        color: theme.palette.primary.main,
        margin: 10,
        width: 50,
        height: 50,
    }
}));

const ProfileGrid = (props) => {
  const classes = useStyles();
  const [account, setAccount] = useState(props.profiles ? props.profiles.account : emptyHousehold.account)
  const [loading, setLoading] = useState(props.loading == null ? true : props.loading)
  const [profiles, setProfiles] = useState(props.profiles ? props.profiles.profiles : [])

  const [profile, setProfile] = useState(profiles[0])
  const [refresh, setRefresh] = useState(false)
  const [open, setOpen] = useState(false);

  const getHousehold = React.useCallback(() => {
    if (props.token !== null) {
        axios.defaults.headers= {
            "Content-Type": "application/json",
            Authorization: "Token " + props.token,
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
  }, [props.token])

  const handleClose = () => {setOpen(false);};
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
    if (props.token !== null) {
      axios.defaults.headers= {
        "Content-Type": "application/json",
        Authorization: "Token " + props.token,
      }
      axios
          .delete(profile.url)
          .then(res => handleRefresh())
          .catch(err => console.log(err));
    }
  }

  useEffect(() => getHousehold(), [getHousehold, refresh]);

  const actions = props.actions ? props.actions : {handleAdd, handleDelete, handleEdit}

  if (loading) {
      return (
        <Container p={{ xs: 2, sm: 3, md: 4 }} className={classes.timeline}>
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
            <br />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <ProfileForm
                    profile={profile}
                    handleRefresh={handleRefresh}
                    handleClose={handleClose} />
                </div>
                </Fade>
            </Modal>
            <br />
            <br />
        </Container>
      )
  }

  return (
    <Container p={{ xs: 2, sm: 3, md: 4 }} className={classes.timeline}>
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
        <br />
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
            <div className={classes.paper}>
                <ProfileForm
                profile={profile}
                handleRefresh={handleRefresh}
                handleClose={handleClose} />
            </div>
            </Fade>
        </Modal>
        <br />
        <br />
    </Container>
  )
}

ProfileGrid.propTypes = {
};
ProfileGrid.defaultProps = {
};


const mapStateToProps = (state) => {
  return {
    token: state.token,
  }
}

export default connect(mapStateToProps)(ProfileGrid);
// export default ProfileGrid;

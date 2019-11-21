import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios';

import { Container, Box, Typography, Grid, Divider, IconButton, Avatar } from '@material-ui/core'
import Link from '@material-ui/core/Link';
import { blue } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
  const [loading, setLoading] = useState(props.loading ? true : false)
  const [profiles, setProfiles] = useState(props.profiles ? props.profiles.profiles : emptyHousehold.profiles)

  const actions = props.actions ? props.actions : {}

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
                setAccount(user_acount)})
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
            <Grid item  key={JSON.stringify(profile)} 
                    xs={6} sm={4} md={3}  className={classes.gridItem}>
                <Box className={classes.card}>
                <Box 
                    boxShadow={3} 
                    className={classes.cardHolder}
                    style={{backgroundColor: blue[profile.is_main? 50:0]}}>
                    <Box className={classes.picture}>
                        {profile.url ?
                        <Avatar 
                            alt={profile.first_name+profile.last_name} 
                            src={`https://robohash.org/${profile.first_name}$\{profile.last_name}?set=set4`}
                            className={classes.avatar} />
                        :
                        <IconButton aria-label="New profile" onClick={handleAdd}>
                            <AddCircleOutlineIcon className={classes.cover} />
                        </IconButton>
                        }
                    </Box>
                    <Box className={classes.pictureHolder}></Box>
                    <Box className={classes.header}>
                        {profile.first_name} {profile.last_name}
                    </Box>
                    <Box className={classes.content}>
                        birth date, joined groups
                    </Box>
                    <Divider className={classes.divider} />
                    <Box className={classes.actions}>
                        <IconButton aria-label="previous">
                            <WhatsAppIcon  className={classes.icon}/>
                        </IconButton>
                        <IconButton aria-label="play/pause" 
                            onClick={()=> handleEdit(profile)}>
                            <EditIcon className={classes.icon}/>
                        </IconButton>
                        <IconButton aria-label="next" 
                            onClick={()=> handleDelete(profile)}>
                            <DeleteIcon className={classes.icon}/>
                        </IconButton>
                    </Box>
                </Box>
                </Box>
            </Grid>
            ))}
            <Grid item key="new-profil"  xs={6} sm={4} md={3} className={classes.gridItem}>
                <Box className={classes.card}>
                    <Box 
                        boxShadow={3} 
                        className={classes.cardHolder}>
                    <Box className={classes.picture}>
                    <IconButton aria-label="New profile" onClick={handleAdd}>
                        <AddCircleOutlineIcon className={classes.newIcon} />
                        </IconButton>
                    </Box>
                    <Box className={classes.pictureHolder}></Box>
                    <Box className={classes.header}>
                        Create new profile
                    </Box>

                    </Box>
                </Box>
            </Grid>
        </Grid>
        <br />
        {/* <Modal
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
        </Modal> */}
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

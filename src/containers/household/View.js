import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios'

import ProfileForm from 'containers/household/Form'
import ProfileGrid from 'components/user/ProfileGrid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade'

const householdData = {
  url: "", household_name: "",
  address_line1: "", address_line2: "", country: "", city: "", zip: "",
  profiles: [{ url: "", first_name: "", last_name: "", birth_date: "",}]
  }

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
}));

const Household = ({token}) => {
  const classes = useStyles();
  const [household, setHousehold] = useState(householdData)
  const [profile, setProfile] = useState(householdData.profiles[0])
  const [refresh, setRefresh] = useState(false)
  const [open, setOpen] = useState(false);

  const getHousehold = React.useCallback(() => {
    if (token !== null) {
      axios.defaults.headers= {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      }
      axios
          .get("/api/currentuser/")
          .then(res => setHousehold(res.data[0].user_account))
          .catch(err => console.log(err));
    }
  }, [token])

  const handleClose = () => {setOpen(false);};
  const handleRefresh = () => {
    setRefresh(!refresh);
  }

  const handleAdd = () => {
    setOpen(true);
    const account = {...household}
    delete account.profiles
    setProfile({
      ...householdData.profiles[0],
      account: account })
  }

  const handleEdit = (profile) => {
    setOpen(true);
    setProfile(profile)
  }

  const handleDelete = (profile) => {
    if (token !== null) {
      axios.defaults.headers= {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      }
      axios
          .delete(profile.url)
          .then(res => handleRefresh())
          .catch(err => console.log(err));
    }
  }

  useEffect(() =>
    getHousehold(), [getHousehold, refresh]);
  useEffect(() => {
    setProfile(household.profiles[0])}, [household]);

  return (
    <div>
      <Typography weight={'bold'} variant={'h4'} gutterBottom>
        <Link underline={'none'}>{household.household_name}</Link>
      </Typography>
      <Typography variant={'overline'}>
        <b>{household.address_line1} {household.address_line2}</b>
      </Typography>
      <Typography indent={'small'}>
        ({household.profiles.length} membres)
      </Typography>
      <br />
      <Typography weight={'bold'} variant={'h5'} gutterBottom>
        {"Composition"}
      </Typography>
      <ProfileGrid
        profiles={household.profiles}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
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
    </div>
  )
}

Household.propTypes = {
};
Household.defaultProps = {
};


const mapStateToProps = (state) => {
  return {
    token: state.token,
  }
}

export default connect(mapStateToProps)(Household);
    import React, { useState, useEffect } from 'react';
    import { makeStyles } from '@material-ui/core/styles';
    import axios from 'axios'

    import ProfileForm from 'components/household/Form'
    import ProfileGrid from 'components/user/ProfileGrid';
    import Typography from '@material-ui/core/Typography';
    import Link from '@material-ui/core/Link';

    import Modal from '@material-ui/core/Modal';
    import Backdrop from '@material-ui/core/Backdrop';
    import Fade from '@material-ui/core/Fade'
import { useAuth } from 'context/auth';

    const profilesData= [{ url: "", first_name: "", last_name: "", birth_date: "",}]

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

const Household = () => {
    const classes = useStyles();
    const { authData } = useAuth()

    const [profiles, setProfiles] = useState(authData.profiles? authData.profiles : profilesData)
    const [profile, setProfile] = useState(profiles[0])
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = useState(false);

    const getProfiles = React.useCallback(() => {
        if (authData.token !== null) {
        axios.defaults.headers= {
            "Content-Type": "application/json",
            Authorization: "Token " + authData.token,
        }
        axios
            .get("/api/v1/profiles/me/")
            .then(res => setProfiles(res.data))
            .catch(err => console.log(err));
        }
    }, [authData.token])

    const handleClose = () => {setOpen(false);};
    const handleRefresh = () => {
        setRefresh(!refresh);
    }

    const handleAdd = () => {
        setOpen(true);
        const account = {...authData.user.user_account}
        setProfile({
            ...profilesData[0],
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

    useEffect(() =>
        getProfiles(), [getProfiles, refresh]);
    useEffect(() => {
        setProfile(profiles[0])}, [profiles]);

    return (
        <div>
        <Typography weight={'bold'} variant={'h4'} gutterBottom>
            {/* <Link underline={'none'}>{household.household_name}</Link> */}
            <Link underline={'none'}>Les profiles de mon compte</Link>
        </Typography>
        <Typography variant={'overline'}>
            {/* <b>{household.address_line1} {household.address_line2}</b> */}
            <b>mon adresse</b>
        </Typography>
        <Typography indent={'small'}>
            ({profiles.length} membres)
        </Typography>
        <br />
        <Typography weight={'bold'} variant={'h5'} gutterBottom>
            {"Composition"}
        </Typography>
        <ProfileGrid
            profiles={profiles}
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

export default Household

    import React from 'react';
    import PropTypes from 'prop-types';
    import { withStyles } from '@material-ui/core/styles';
    import InputBase from '@material-ui/core/InputBase';
    import Icon from '@material-ui/core/Icon';
    import IconButton from '@material-ui/core/IconButton';
    import Typography from '@material-ui/core/Typography';
    import { connect } from 'react-redux';
    import * as actions from 'store/actions/auth';
    import axios from 'axios';

    import LockIcon from '@material-ui/icons/Lock';
    import Menu from '@material-ui/core/Menu';
    import ListItem from '@material-ui/core/ListItem';
    import ListItemAvatar from '@material-ui/core/ListItemAvatar';
    import ListItemText from '@material-ui/core/ListItemText';
    import Avatar from '@material-ui/core/Avatar';
    import PersonIcon from '@material-ui/icons/Person';


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

    function HeaderUserComponent({ logout, classes, screen, setProfile, token }) {
        const [anchorEl, setAnchorEl] = React.useState(null)
        const [profiles, setProfiles] = React.useState([])

        const handleClick = event => { setAnchorEl(event.currentTarget)}
        const handleClose = () => {setAnchorEl(null)}

        const handleListItemClick = value => { 
            console.log(value)
            setProfile(value)
            handleClose(); };
        
        const getProfiles = React.useCallback(() => {
            if (token !== null) {
                axios.defaults.headers= {
                    "Content-Type": "application/json",
                    Authorization: "Token " + token,
                }
                axios
                    .get("/api/currentuser/")
                    .then(res => {
                        const user_acount = res.data[0].user_account
                        setProfiles(user_acount.profiles)
    
                    })
                    .catch(err => console.log(err));
                }
            }, [token])
        
            React.useEffect(() => getProfiles(), [getProfiles]);
        
        return (
            <React.Fragment>
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
                    <LockIcon />
                </IconButton>
                <Menu id='profile-menu' 
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                {profiles.map(selectProfile => (
                    <ListItem button onClick={() => handleListItemClick(selectProfile)} key={selectProfile.first_name}>
                    <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                        <PersonIcon />
                        </Avatar>
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

    const mapStateToProps = (state) => {
        return {
            token: state.token,
            profile: state.profile,
            profiles: state.profiles
        }
    }

    const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
        setProfile: (profile) => dispatch(actions.setProfile(profile)),
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HeaderUserComponent));

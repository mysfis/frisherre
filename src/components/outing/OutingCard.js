import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Box, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info'
import GroupIcon from '@material-ui/icons/Group'

import DriveEtaIcon from '@material-ui/icons/DriveEta';
import ProfileIcon from 'components/icons/ProfileIcon'

const useStyles = makeStyles(theme => ({
    outingItem: {
        flexGrow: 1,
        marginTop: theme.spacing(1),
        marginLeft: 20,
        color: theme.palette.text.secondary,
    },
    myItem: {
        marginLeft: 0,
        color: theme.palette.text.primary,
    },
    outingCard: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-start',
    },
    cardAvatar: {
        padding: theme.spacing(1)
    },
    cardContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    cardHeader: {
        display: 'flex', 
        flexDirection: 'row',
    },
    headerTitle: {
        flex: '1 1 auto',
        textAlign: 'left',
        marginLeft: theme.spacing(1),
        width: '80%',
    },
    headerActions: {
        flex: '0 0 auto',
        alignSelf: 'flex-start',
        marginTop: -theme.spacing(1),
        marginRight: -theme.spacing(1),
    },
    infoIcon: {
        color:  theme.palette.primary.main,
        width: 32,
        height: 32,
    },
    cardMain: {
        display: 'flex', 
        flexDirection: 'row',
        marginLeft: theme.spacing(1),
        textAlign: 'left',
        fontSize: 12,
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'flex-start',
        height: theme.spacing(4),
    },
    footerActions: {
        display: 'flex', 
        flexDirection: 'row',
        width: "100%",
        flex: '0 0 auto',
        alignSelf: 'flex-start',
        marginTop: -theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginBottom: -theme.spacing(1),
    },
    action: {
        alignItems: 'center',
        width: 30,
        },
        actionIcons: {
        marginRight: theme.spacing(1), 
        width: 24, height: 24, 
        border: '1px solid #DBDBDB', 
        borderRadius: 4, radius: 2,
        boxSizing: 'border-box',
        '&:hover': { backgroundColor: '#DBDBDB', },
    },
    button: {
        lineHeight: 0.4,
        fontSize: 14,
        marginLeft:theme.spacing(1)/2,
        marginRight:theme.spacing(1)/2,
        marginBottom: theme.spacing(1)/2,
        flex: 1,
        border: '1px solid',
    },
    simpleButton: {
        flex: 1,
        textTransform: "none",
    },
    doubleButton: {
        flex: 2,
        textTransform: "none",
    },
    accepting: {
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        '&:hover': { 
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.light, },
    },
    accepted: {
        color: theme.palette.common.white,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
        justifyContent: "start",
        paddingLeft:theme.spacing(1),
        '&:hover': { 
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.common.white, },
    },
    rejecting: {
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        '&:hover': { 
            color: theme.palette.common.white,
            backgroundColor: theme.palette.secondary.light, },
    },
    rejected: {
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        justifyContent: "start",
        paddingLeft:theme.spacing(1),
        '&:hover': { 
            color: theme.palette.common.white,
            backgroundColor: theme.palette.secondary.light, },
    },
    isDrivingButton: {
        color: theme.palette.info.main,
        borderColor: theme.palette.info.main,
        '&:hover': { 
            color: theme.palette.common.white,
            backgroundColor: theme.palette.info.light, },
    },
    notDrivingButton: {
        color: theme.palette.info.main,
        borderColor: theme.palette.info.main,
        justifyContent: "start",
        paddingLeft:theme.spacing(1),
        '&:hover': { 
            color: theme.palette.common.white,
            backgroundColor: theme.palette.info.light, },
    },
    drivingButton: {
        color: theme.palette.common.white,
        borderColor: theme.palette.info.main,
        backgroundColor: theme.palette.info.light,
        justifyContent: "start",
        paddingLeft:theme.spacing(1),
        '&:hover': { 
            color: theme.palette.info.main,
            backgroundColor: theme.palette.common.white, },
    },
}))

const presenceText = (outing) => {
    const my_status_sign = outing.participation.status === 1? "(?)": ""
    // const myName = `${outing.participation.profile.first_name} ${outing.participation.profile.last_name}${my_status_sign}`
    const myName = `${outing.participation.profile.first_name}${my_status_sign}`
    const base_names = outing.participation.status !== 3 ? [myName] : [] 
    const names = outing.attendees.reduce((prev, curr) => {
        const status_sign = curr.status === 1? "(?)": ""
        if (curr.status===3) {return [...prev]}
        // const name = `${curr.profile.first_name} ${curr.profile.last_name}${status_sign}`
        const name = `${curr.profile.first_name}${status_sign}`
        return [...prev, name]}, base_names )
    return names
}

const driverText = (outing) => {
    const initial_driver = outing.participation.is_driver? [outing.participation]: []
    const drivers = initial_driver.concat(outing.attendees.filter(attendance => attendance.is_driver===true))
    if (drivers.length === 0) { return ["Pas de chauffeur"]}
    const names = drivers.reduce((prev, curr) => {
        const name = `${curr.profile.first_name} ${curr.profile.last_name}`
        return [...prev, name]}, [] )
    return names
}

function PresentButton({outing, onClick, classes, names}) {
    switch(outing.participation.status) {
        case 1: return ( //participation not set yet
            <Button 
                className={clsx(classes.button, classes.accepting)}
                onClick={onClick} >
                    Present
            </Button>)
        case 2: return ( //participation confirmed
            <Button 
                variant="contained"
                className={clsx(classes.button, classes.doubleButton, classes.accepted)}
                onClick={onClick}
                startIcon={<GroupIcon />} >
                    <Typography noWrap variant={'body2'}>{presenceText(outing).join(", ")}</Typography>
                    {/* <Typography noWrap variant={'body2'}><span style={{textDecoration:"line-through"}}>bruno</span>, <span>caelan</span> </Typography> */}
            </Button>)
        case 3: return null //participation reject
        default: return null
    }
}

function AbsentButton({outing, onClick, classes, names}) {
    switch(outing.participation.status) {
        case 1: return ( //participation not set yet
            <Button 
                className={clsx(classes.button, classes.rejecting)}
                onClick={onClick}>
                    Absent
            </Button>)
        case 2: return null //participation confirmed
        case 3: return ( //participation reject
            <Button 
                className={clsx(classes.button, classes.doubleButton, classes.rejected)}
                onClick={onClick} 
                startIcon={<GroupIcon />} >
                <Typography noWrap variant={'body2'} display="block">
                    {presenceText(outing).join(", ")}
                </Typography>
            </Button>)
        default: return null
    }
}

function DriverButton({outing, onClick, classes, name}) {
    if (outing.participation.status===1) { return null
        // return (
        //     <Button 
        //         disabled
        //         onClick={onClick}
        //         className={clsx(classes.button, classes.isDrivingButton)}>
        //             Conduit
        //     </Button>
        // )
    }
    if (outing.participation.is_driver) {
        return (
            <Button 
                className={clsx(classes.button, classes.simpleButton, classes.drivingButton)}
                onClick={onClick}
                startIcon={<DriveEtaIcon />} >
                <Typography noWrap variant={'body2'}>{driverText(outing).join(", ")}</Typography>
            </Button>)
    }
    return (
        <Button 
            className={clsx(classes.button, classes.simpleButton, classes.notDrivingButton)}
            onClick={onClick}
            startIcon={<DriveEtaIcon />} >
            <Typography noWrap variant={'body2'}>{driverText(outing).join(", ")}</Typography>
        </Button>)
}

const OutingCard = ({outing, actions}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Box className={clsx(classes.outingItem, {[classes.myItem]:outing.mine})} boxShadow={3}>
            <Box className={classes.outingCard}>
                <Box className={classes.cardAvatar}>
                <ProfileIcon 
                    name={outing.participation.profile.icon_name} 
                    size={outing.mine? 'medium':'small'}
                    color={outing.participation.profile.icon_color} />
                </Box>
                <Box className={classes.cardContent}>
                    <Box className={classes.cardHeader}>
                        <Box className={classes.headerTitle}>
                            <Typography weight={'bold'} variant={outing.mine?'h6':'body1'} >{outing.title}</Typography>
                            <Typography variant={'body2'} gutterBottom color="textSecondary">{outing.location}</Typography>
                        </Box>
                        <IconButton className={classes.headerActions} onClick={()=>actions.handleView(outing)}>
                            <InfoIcon className={classes.infoIcon}/>
                        </IconButton>
                    </Box>
                    <Box className={classes.cardMain}>
                        <Typography paragraph variant={'body2'}>
                            {outing.description}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {outing.mine?
                <React.Fragment>
                    <Box className={classes.cardFooter}>
                        <PresentButton 
                            classes={classes} 
                            outing={outing} 
                            // onClick={()=>actions.accept(outing.url)} />
                            onClick={()=>actions.handleAccept(outing)} />
                        <AbsentButton
                            classes={classes}
                            outing={outing}
                            onClick={()=>actions.handleReject(outing)} />
                        <DriverButton 
                            classes={classes}
                            outing={outing}
                            onClick={() => actions.handleDrive(outing)}/>
                    </Box>
                </React.Fragment>
            : <React.Fragment />}
            </Box>
        )
    }

    export default OutingCard;
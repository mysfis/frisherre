import React, { useState, useEffect } from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import moment from "moment"
import axios from "axios"
import produce from "immer"

import { useAuth } from "context/auth"
import groupByDay from "utils/groupByDay"
import groupByOuting from "utils/groupByOuting"
import OutingCard from "components/outing/OutingCard"
import OutingDialog from "components/outing/OutingDialog"


import { Container, Box, Typography } from "@material-ui/core"

const border = '0px solid'
const borderColor = '#ffffff' // '#DBDBDB'

const useStyles = makeStyles(theme => ({
    root: {
        padding:theme.spacing(1),
        },
title: {
    border: border,
    borderColor: borderColor,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
},
timelineLoaded: {
    border: border,
    borderColor: borderColor,
    flexGrow: 1,
},
outingList: {
    border: border,
    borderColor: borderColor,
    flexGrow: 1,
},
outingDay: {
    marginTop: theme.spacing(1),
    marginBottom: 0,
},
timelineLoading: {
    border: border,
    borderColor: borderColor,
    flexGrow: 1,
},
timelineEmpty: {
    border: border,
    borderColor: borderColor,
    flexGrow: 1,
},
}))

const newOuting = {}

const OutingView = (props)  => {    
    const theme = useTheme();
    const classes = useStyles(theme);
    const { authData } = useAuth()

    const [loading, setLoading] = useState(props.loading ? true : false)
    const [refresh, setRefresh] = useState(false)
    const [outings, setOutings] = useState([])
    const [ days, setDays ] = useState([])
    const [ outingsByDay, setOutingsByDay] = useState([])

    const [outing, setOuting] = React.useState(newOuting)
    const [dialogMode, setDialogMode] = React.useState("view")
    const [open, setOpen] = React.useState(false);
    const handleClose = () => { setOpen(false);}
    const handleRefresh = () => {setRefresh(!refresh);}
    
    const getOutings = React.useCallback(() => {
        if (authData.token !== null) {
            axios.defaults.headers= {
                "Content-Type": "application/json",
                Authorization: "Token " + authData.token,
        }
        axios
            .get(authData.profile.url+"attendances/")
            .then(res => {
                const flat_outings = groupByOuting(res.data, authData.profile, authData.profiles)
                setOutings(flat_outings)
                })
            .catch(err => console.log(err));
        }
    }, [authData.token, authData.profile])

    useEffect(() => {
        getOutings()
    }, [getOutings, refresh]);

    useEffect(() => {
        const sortedOutings = groupByDay(outings)
        setDays(sortedOutings.days)
        setOutingsByDay(sortedOutings.outingsByDay)
        setLoading(false)
    }, [outings]);

    const handleAttendance = (outing, status) => {
        const participation = produce(outing.participation, draft => {draft.status=status})

        axios.defaults.headers= { 
            "Content-Type": "application/json",
            Authorization: "Token " + authData.token, }
        axios
            .patch(participation.url, {status:status})
            .then(res => {
                const foundIndex = outings.findIndex(item => item.url===outing.url)
                const new_outings = produce(outings, draft => {draft[foundIndex].participation=participation})
                setOutings(new_outings)
            })
            .catch(err => console.log(err));
    }

    const handleAccept = (outing) => { 
        handleAttendance(outing, outing.participation.status === 1 ? 2: 1) 
    }
    const handleReject = (outing) => { 
        handleAttendance(outing, outing.participation.status === 1 ? 3: 1) 
    }

    const handleDrive = (outing) => {
        const participation = produce(outing.participation, draft => {draft.is_driver=!draft.is_driver})

        axios.defaults.headers= { 
            "Content-Type": "application/json",
            Authorization: "Token " + authData.token, }
        axios
            .patch(participation.url, {is_driver:!participation.is_driver})
            .then(res => {
                const foundIndex = outings.findIndex(item => item.url===outing.url)
                const new_outings = produce(outings, draft => {draft[foundIndex].participation=participation})
                setOutings(new_outings)
            })
            .catch(err => console.log(err));
    }

    const handleView = (outing) => {
        setOuting(outing)
        setDialogMode("view")
        setOpen(true);
    }

    const handleEdit = (outing) => {
        setOuting(outing)
        setDialogMode("edit")
        setOpen(true);
    }

    const handleDelete = (outing) => {
        setOuting(outing)
        setDialogMode("delete")
        setOpen(true);
    }

    const actions = {handleAccept, handleReject, handleDrive, handleView, handleDelete, handleEdit}

    return (
        <Container p={{ xs: 2, sm: 3, md: 4 }} maxWidth='sm' className={classes.root}>
            <Box className={classes.title}>
                <Typography weight={'bold'} variant={'h4'} gutterBottom>
                Mes sorties
                </Typography>
            </Box> 
            <Box className={classes.timelineLoaded}>
                <Box className={classes.outingList}>
                {days.map(day => (
                    <Box className={classes.outingDay} key={'day'+day}>
                    <Typography weight={'bold'} variant={'body1'} >{moment(day).format("dd DD MMM")}</Typography>
                    {outingsByDay[day].map((outing, index) => (
                        <OutingCard 
                            outing={outing} 
                            key={outing.url}
                            actions={actions}/>
                    ))}
                    </Box>
                ))}
                </Box>
            </Box>
            <Box className={classes.timelineLoading}>
                timelineLoading
            </Box>
                <Box className={classes.timelineEmpty}>
            timelineEmpty
            </Box>
            <OutingDialog
                    outing={outing}
                    mode={dialogMode}
                    open={open} 
                    close={handleClose}
                    refresh={handleRefresh}/>
        </Container>
    )
}

OutingView.propTypes = {
};
OutingView.defaultProps = {
};

export default OutingView;
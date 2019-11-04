import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios'
import moment from 'moment'

import groupByDay, {getDayForEvent } from 'utilities/groupByDay'
import OutingCard from 'components/outing/OutingCard'
import {outingMockData} from './OutingMockData'

import { Container, Box, Typography } from '@material-ui/core'

// const borderColor = '#DBDBDB'
const border = '0px solid'
const borderColor = '#ffffff'

const useStyles = makeStyles(theme => ({
  timeline: {
    border: border,
    borderColor: borderColor,
    flexGrow: 1,
    marginLeft: -theme.spacing(1),
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

const OutingView = ({token, scheduleData})  => {
  if(!scheduleData) {
    scheduleData = outingMockData
  }
  
  const [outings, setOutings] = useState(scheduleData)
  const sortedOutings = groupByDay(scheduleData);
  const [ days, setDays] = useState(sortedOutings.days)
  const [ outingsByDay, setOutingsByDay] = useState(sortedOutings.outingsByDay)

  const theme = useTheme();
  const classes = useStyles(theme);

  const handleAccept = (acceptedOuting, day, index) => {
    const changedOutingList = {...outingsByDay}
    const changedOuting = changedOutingList[day]
    changedOuting[index].participation.is_participant = true
    setOutingsByDay(changedOutingList)
  }

  const handleReject = (acceptedOuting, day, index) => {
    const changedOutingList = {...outingsByDay}
    const changedOuting = changedOutingList[day]
    changedOuting[index].participation.is_participant = false
    setOutingsByDay(changedOutingList)
  }

  const handleDrive = outing => {}

  return (
    <Container p={{ xs: 2, sm: 3, md: 4 }} className={classes.timeline}>
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
                  handleAccept={handleAccept}
                  handleReject={handleReject}
                  day={day}
                  index={index}/>
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
      <br />
    </Container>
  )
}

OutingView.propTypes = {
};
OutingView.defaultProps = {
};

// const mapStateToProps = (state) => {
//   return {
//     token: state.token,
//   }
// }

// export default connect(mapStateToProps)(ScheduleView);
export default OutingView;
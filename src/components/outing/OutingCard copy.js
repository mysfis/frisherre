import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

import Avatar from 'components/user/Avatar'
import { Card, Box, Typography, Collapse, Divider } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import {FootballIcon} from 'components/icons/outingIcons'
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { blue, red, green } from '@material-ui/core/colors';

import DriveEtaIcon from '@material-ui/icons/DriveEta';
import ProfileIcon from 'components/icons/ProfileIcon'

const border = '0px solid'
const borderColor = '#ffffff'

const useStyles = makeStyles(theme => ({
    outingItem: {
      border: '1px solid',
      borderColor: borderColor,
      flexGrow: 1,
    },
    outingCard: {
      border: border,
      borderColor: borderColor,
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'flex-start',
    },
    cardAvatar: {
      border: border,
      borderColor: borderColor,
      padding: theme.spacing(1)
    },
    cardContent: {
      border: border,
      borderColor: borderColor,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column'
      // justifyContent: 'flex-end',
      // marginLeft: theme.spacing(5),
    },
    cardHeader: {
      border: border,
      borderColor: borderColor,
      display: 'flex', 
      flexDirection: 'row',
    },
    headerContent: {
      border: border,
      borderColor: borderColor,
      flex: '1 1 auto',
      textAlign: 'left',
      marginLeft: theme.spacing(1),
      width: '80%',
    },
    headerActions: {
      border: border,
      borderColor: borderColor,
      flex: '0 0 auto',
      alignSelf: 'flex-start',
      marginTop: -theme.spacing(1),
      marginRight: -theme.spacing(1),
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      color:'#555555',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    cardMain: {
      border: border,
      borderColor: borderColor,
      display: 'flex', 
      flexDirection: 'row',
      marginLeft: theme.spacing(1),
      textAlign: 'left',
      fontSize: 12,
    },
    cardFooter: {
      border: border,
      borderColor: borderColor,
      display: 'flex',
      justifyContent: 'flex-start',
      height: theme.spacing(4),
    },
    footerActions: {
      border: border,
      borderColor: borderColor,
      display: 'flex', 
      flexDirection: 'row',
      // width: 100,
      flex: '0 0 auto',
      alignSelf: 'flex-start',
      marginTop: -theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginBottom: -theme.spacing(1),
    },
    action: {
      border: border,
      borderColor: borderColor,
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
    footerAttendees: {
      border: border,
      borderColor: borderColor,
      margin: theme.spacing(1),
      flexGrow: 1,
      display: 'flex', 
      flexDirection: 'row',
      alignItems: 'center',
    },
    timelineEmpty: {
      border: border,
      borderColor: borderColor,
      flexGrow: 1,
    },
  }))


const OutingCard = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [outing] = useState(props.outing)
    const [expanded, setExpanded] = React.useState(false);

    return (
      <Card className={classes.outingItem}
        style={{ 
          marginLeft: outing.mine? 0:20, 
          color: outing.mine? theme.palette.text.primary:theme.palette.text.secondary,
          backgroundColor: outing.mine? '':borderColor,
          marginTop: theme.spacing(1)
        }}>
          <Box className={classes.outingCard}>
            <Box className={classes.cardAvatar}>
              <ProfileIcon 
                name={outing.participation.icon} 
                size={outing.mine? 'medium':'small'}
                color={outing.participation.iconColor} />
              {/* <Avatar user={outing.participation} size={outing.mine? 'big':'medium'} /> */}
            </Box>
            <Box className={classes.cardContent}>
              <Box className={classes.cardHeader}>
                {outing.mine?
                <Box className={classes.headerContent}>
                  <Typography weight={'bold'} variant={'h6'} >{outing.title}</Typography>
                  <Typography variant={'body2'} gutterBottom color="textSecondary">{outing.location}</Typography>
                </Box>
                :
                <Box className={classes.headerContent}>
                  <Typography weight={'bold'} variant={'body1'} >{outing.title}</Typography>
                  <Typography variant={'body2'} gutterBottom color="textSecondary">{outing.location}</Typography>
                </Box>
                }
                <Box className={classes.headerActions}>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <ExpandMoreIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box className={classes.cardMain}>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Typography paragraph variant={'body2'}>
                    {outing.description}
                  </Typography>
                </Collapse>
              </Box>
            
            </Box>
          </Box>
          {outing.mine?
          <div><Divider />
          <Box className={classes.cardFooter}>
            
            <Box className={classes.footerActions}>
                <IconButton 
                    onClick={() => props.handleAccept(props.day, props.index)}
                    className={classes.action}>
                {outing.participation.is_participant == null || !outing.participation.is_participant ? (
                  <DoneIcon 
                  className={classes.actionIcons} 
                  style={{color: green[200],}}/>
                ):(
                  <DoneIcon 
                    className={classes.actionIcons} 
                    style={{backgroundColor: green[800],color: theme.palette.primary.contrastText}} />
                )}
                </IconButton>
                <IconButton 
                    onClick={() => props.handleReject(props.day, props.index)}
                    className={classes.action}> 
                {outing.participation.is_participant == null ||  outing.participation.is_participant ? (
                  <ClearIcon 
                    className={classes.actionIcons} 
                    style={{color: red[200],}}/>
                    
                ):(
                  <ClearIcon 
                    className={classes.actionIcons} 
                    style={{backgroundColor: red[800],color: theme.palette.primary.contrastText}}/>
                )}
                </IconButton>
              <IconButton 
                  onClick={() => props.handleDrive(props.day, props.index)}
                  className={classes.action}>
              {outing.participation.is_driver ? (
                  <DriveEtaIcon 
                    className={classes.actionIcons} 
                    style={{backgroundColor: blue[800],color: theme.palette.primary.contrastText}}/>
                ):(
                  <DriveEtaIcon 
                    className={classes.actionIcons} style={{color: blue[200],}}/>
                )}
              </IconButton>
            </Box>
            <Divider orientation="vertical" />
            <Box className={classes.footerAttendees}>
              {outing.attendees.map((attendee, index) => (
                <Avatar 
                    key={props.day+'='+props.index+'='+index}
                    user={attendee} 
                    size='small' />
                ))}
            </Box>
          </Box>
          </div>
          : ''}
        </Card>
    )
}

export default OutingCard;
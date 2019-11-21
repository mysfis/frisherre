// import React from 'react';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { connect } from 'react-redux';
// import axios from 'axios'
// import moment from 'moment'
// import clsx from 'clsx';

// import Typography from '@material-ui/core/Typography';
// import Avatar from '@material-ui/core/Avatar';
// // import Avatar from 'components/Avatar'
// import { Container, Card,Box } from '@material-ui/core';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Divider from '@material-ui/core/Divider'
// import IconButton from '@material-ui/core/IconButton';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import {FootballIcon} from 'components/icons/outingIcons'
// import DoneIcon from '@material-ui/icons/Done';
// import ClearIcon from '@material-ui/icons/Clear';
// import { blue, red, green } from '@material-ui/core/colors';

// import DriveEtaIcon from '@material-ui/icons/DriveEta';


// // const borderColor = '#DBDBDB'
// const borderColor = '#ffffff'

// const useStyles = makeStyles(theme => ({
//   root: {
//     border: '1px solid',
//     borderColor: borderColor,
//     flexGrow: 1,
//     marginLeft: -theme.spacing(1),
//   },
//   layout: {
//     border: '1px solid',
//     borderColor: borderColor,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
//   timeline: {
//     border: '1px solid',
//     borderColor: borderColor,
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     display: 'flex', 
//     flexDirection: 'column',
//     width:'100%',
//   },
//   timelineDate: {
//     border: '1px solid',
//     borderColor: borderColor,
//     display: 'flex', 
//     flexDirection: 'row',
//     width:'100%',
//   },
//   verticalBar: {
//     border: '1px solid',
//     borderColor: borderColor,
//     width: 50,
//     display: 'flex',
//     flexDirection: 'column',
//     position: 'relative',
//     alignItems: 'center',
//     // margin: '40px 0 0 0',
//     '&:after': {
//       backgroundColor: theme.palette.text.primary,
//       content: '""',
//       position: 'absolute',
//       left: 20,
//       width: 4,
//       height: '100%',
//       zIndex: -1,
//     }
//   },
//   inviteeIcon: {
//     border: '2px solid',
//     borderColor: theme.palette.text.primary,
//     borderRadius: 20,
//     width: 36,
//     height: 36,
//     padding: theme.spacing(0),
//     fill: theme.palette.text.primary,
//     backgroundColor: '#ffffff',
//   },
//   outingIcon: {
//     border: '2px solid',
//     borderColor: theme.palette.text.primary,
//     borderRadius: 20,
//     width: 24,
//     height: 24,
//     padding: theme.spacing(0.5),
//     // filter: 'invert(2)',
//     fill: theme.palette.text.primary,
//     backgroundColor: '#ffffff',
//   },
//   headerIcon: {
//     width: 48,
//     height: 48,
//     backgroundColor: '#e17b77',
//   },
//   outingItem: {
//     border: '1px solid',
//     borderColor: borderColor,
//     width: '100%',
//   },
//   outingDate:{
//     border: '1px solid',
//     borderColor: borderColor,
//     padding: theme.spacing(0.5),
//     textAlign: 'left',
//     alignItems: 'center',
//   },
//   card: {
//     border: '1px solid',
//     borderColor: borderColor,
//     marginBottom: theme.spacing(1),
//   },
//   cardHeader: {
//     border: '1px solid',
//     borderColor: borderColor,
//     display: 'flex', 
//     flexDirection: 'row',
//   },
//   headerContent: {
//     flex: '1 1 auto',
//     border: '1px solid',
//     borderColor: borderColor,
//     textAlign: 'left',
//     marginLeft: theme.spacing(1),
//     width: '80%',
//   },
//   headerActions: {
//     border: '1px solid',
//     borderColor: borderColor,
//     flex: '0 0 auto',
//     alignSelf: 'flex-start',
//     marginTop: -theme.spacing(1),
//     marginRight: -theme.spacing(1),
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     color:'#555555',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
//   cardMain: {
//     border: '1px solid',
//     borderColor: borderColor,
//     display: 'flex', 
//     flexDirection: 'row',
//     marginLeft: theme.spacing(1),
//     textAlign: 'left',
//     fontSize: 12,
//   },
//   cardContent: {
//     textAlign: 'left',
//   },
//   cardFooter: {
//     border: '1px solid',
//     borderColor: borderColor,
//     display: 'flex', 
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 36,
//   },
//   footerContent: {
//     border: '1px solid',
//     borderColor: borderColor,
//     flexGrow: 1,
//     flex: '1 1 auto',
//     display: 'flex',
//     alignItems: 'center',
//   },
//   attendeeIcon: {
//     border: '2px solid',
//     borderColor: theme.palette.text.primary,
//     borderRadius: 18,
//     width: 24,
//     height: 24,
//     padding: theme.spacing(0.2),
//     // filter: 'invert(2)',
//     fill: theme.palette.text.primary,
//     backgroundColor: '#ffffff',
    
//   },
//   absentAttendeeIcon: {
//     border: '2px solid',
//     borderColor: '#DBDBDB',
//     borderRadius: 18,
//     width: 24,
//     height: 24,
//     padding: theme.spacing(0.2),
//     filter: 'invert(0.2)',
//     // fill: theme.palette.text.primary,
//     backgroundColor: '#DBDBDB',
    
//   },
//   footerActions: {
//     border: '1px solid',
//     borderColor: borderColor,
//     display: 'flex', 
//     flexDirection: 'row',
//     // width: 100,
//     flex: '0 0 auto',
//     alignSelf: 'flex-start',
//     marginTop: -theme.spacing(1),
//     marginRight: theme.spacing(1),
//     marginLeft: -theme.spacing(1),
//   },
//   action: {
//     border: '1px solid',
//     borderColor: borderColor,
//     alignItems: 'center',
//     width: 30,
//   },
//   actionIcons: {
//     marginRight: theme.spacing(1), width: 24, height: 24, 
//     border: '1px solid #DBDBDB', borderRadius: 5, radius: 2,
//     '&:hover': { backgroundColor: '#DBDBDB', },
//   },
// }))

// const outingData = [{
//   url: "http://localhost:8000/api/outing/1/",
//   title: "FootBall Game", description: "Match de pools comptant pour la qualifcation en pool departementales",
//   date: "2019-09-01", time: "13:20", location: 'Stade Chalonnes sur loire',
//   mine:true,
//   created_at: "2019-10-07T09:30:46.919152Z", updated_at: "2019-10-07T09:30:46.958052Z",
//   organizer: {
//     url: "http://localhost:8000/api/profile/1/",
//     first_name: "Bruno", last_name: "Cochard", birth_date: "1979-09-04",},
//   attendances: [{
//     url: "http://localhost:8000/api/attendance/1/",
//     accepted_at: "2019-10-07T12:16:28.399487Z",
//     attendance_notes: "draft",
//     email:'myAttendance1@gmail.com'
//   }]
// }]

// const ScheduleView = ({token, scheduleData}) => {
//   if(!scheduleData) {scheduleData = outingData}
//   const classes = useStyles();
//   const theme = useTheme();
//   // const avatarUrl = `https://robohash.org/${profile.first_name}?set=set3`
//   const avatarUrl = `https://robohash.org/bruno?set=set3`
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };
//   return (
//     <Container p={{ xs: 2, sm: 3, md: 4 }} className={classes.root}>
//       <Box className={classes.layout}>
//         <Typography weight={'bold'} variant={'h4'} gutterBottom>
//           Mes sorties
//         </Typography>
//       </Box> 
//       <Box className={classes.timeline}>
//         {scheduleData.map(schedule => (
//           <Box className={classes.timelineDate}>
//             <Box className={classes.verticalBar}>
//               {/* <Avatar alt="Remy Sharp" src={avatarUrl} className={classes.avatar} /> */}
//               <FootballIcon className={classes.outingIcon} />
//             </Box>
//             <Box className={classes.outingItem}>
//               <Box className={classes.outingDate}>
//                 <Typography weight={'bold'} variant={'body'} gutterBottom>{moment(schedule.date).format('YYYY-MM-DD')}</Typography>
//               </Box>
//               <Card className={classes.card}>
//                 <Box className={classes.cardHeader}>
//                   <Box className={classes.headerContent}>
//                     <Typography weight={'bold'} variant={'h6'} >{schedule.title}</Typography>
//                     <Typography variant={'body2'} gutterBottom color="textSecondary">Chalonnes sur Loire</Typography>
//                   </Box>
//                   <Box className={classes.headerActions}>
//                     <IconButton
//                       className={clsx(classes.expand, {
//                         [classes.expandOpen]: expanded,
//                       })}
//                       onClick={handleExpandClick}
//                       aria-expanded={expanded}
//                       aria-label="show more">
//                       <ExpandMoreIcon />
//                     </IconButton>
//                   </Box>
//                 </Box>
//                 <Box className={classes.cardMain}>
//                   <Collapse in={expanded} timeout="auto" unmountOnExit>
//                       <Typography paragraph variant={'body2'}>
//                         {schedule.description}
//                       </Typography>
//                   </Collapse>
//                 </Box>
//                 <Divider />
//                 <Box className={classes.cardFooter}>
//                   <Box className={classes.footerContent}>
//                     {/* <Typography variant={'body'} gutterBottom>Participants</Typography> */}
//                       <Avatar className={classes.attendeeIcon} 
//                           style={{borderColor: blue[400],backgroundColor: blue[100],}}
//                           src='https://robohash.org/test?set=set3'/>
//                   </Box>
//                   <Box className={classes.footerActions}>
//                     <Box className={classes.action}>
//                       <IconButton>
//                       {schedule.attendances[0].is_participant ? (
//                         <DoneIcon 
//                           className={classes.actionIcons} 
//                           style={{backgroundColor: green[800],color: theme.palette.primary.contrastText}} />
//                       ):(
//                         <DoneIcon 
//                           className={classes.actionIcons} 
//                           style={{color: green[800],}}/>
//                       )}
//                       </IconButton>
//                     </Box>
//                     <Box className={classes.action}>
//                       <IconButton> 
//                       {!schedule.attendances[0].is_participant ? (
//                         <ClearIcon 
//                           className={classes.actionIcons} 
//                           style={{backgroundColor: red[800],color: theme.palette.primary.contrastText}}/>
//                       ):(
//                         <ClearIcon 
//                           className={classes.actionIcons} 
//                           style={{color: red[200],}}/>
//                       )}
//                       </IconButton>
//                     </Box>
//                     <Box className={classes.action}>
//                     <IconButton>
//                     {schedule.attendances[0].is_driver ? (
//                         <DriveEtaIcon 
//                           className={classes.actionIcons} 
//                           style={{backgroundColor: blue[800],color: theme.palette.primary.contrastText}}/>
//                       ):(
//                         <DriveEtaIcon 
//                           className={classes.actionIcons} style={{color: blue[200],}}/>
//                       )}
//                     </IconButton>
//                     </Box>
//                   </Box>
//                   <Divider orientation="vertical" />
//                   <Box className={classes.footerContent}>
//                     {/* <Typography variant={'body'} gutterBottom>Participants</Typography> */}
//                       <Avatar className={classes.attendeeIcon} 
//                           style={{borderColor: green[400],backgroundColor: green[100],}}
//                           src='https://robohash.org/keluno@keluno.com?set=set3'/>
//                       <FootballIcon className={classes.attendeeIcon} 
//                           style={{borderColor: green[400],backgroundColor: green[100],}}/>
//                       <FootballIcon className={classes.attendeeIcon} 
//                           style={{borderColor: green[400],backgroundColor: green[100],}}/>
//                       <FootballIcon className={classes.absentAttendeeIcon} />
//                       <Avatar className={classes.absentAttendeeIcon} 
//                           src='https://robohash.org/test?set=set3'/>

//                   </Box>
                  
//                 </Box>
//               </Card>
//             </Box>
//           </Box>
//         ))}
//       </Box>
//       <br />
//     </Container>
//   )
// }

// ScheduleView.propTypes = {
// };
// ScheduleView.defaultProps = {
// };

// // const mapStateToProps = (state) => {
// //   return {
// //     token: state.token,
// //   }
// // }

// // export default connect(mapStateToProps)(ScheduleView);
// export default ScheduleView;


// {/* <Card className={classes.timelineItem}>
//               <CardHeader
//                 action={
//                     <IconButton
//                       className={clsx(classes.expand, {
//                         [classes.expandOpen]: expanded,
//                       })}
//                       onClick={handleExpandClick}
//                       aria-expanded={expanded}
//                       aria-label="show more"
//                     >
//                       <ExpandMoreIcon />
//                     </IconButton>
//                   }
//                   className={classes.cardHeader}
//                   title={schedule.title}
//                   subheader='chalonnes sur loire'
//                   titleTypographyProps={{variant:'body1' }}
//                   subheaderTypographyProps={{variant:'body1' }}
//                 />
//                 <Collapse in={expanded} timeout="auto" unmountOnExit>
//                   <CardContent className={classes.cardContent}>
//                     <Typography paragraph variant={'body2'}>
//                       {schedule.description}
//                     </Typography>
//                   </CardContent>
//                 </Collapse>
   
//                 <Divider />
//                 <CardActions className={classes.itemFooter}>
//                   <Box className={classes.itemAttendants}>
//                     <Typography variant={'body'} gutterBottom>attendants</Typography>
//                   </Box>
//                   <Divider orientation="vertical" />
//                   <Box className={classes.itemActions}>
//                     <Box className={classes.action}>
//                       <Typography variant="caption" gutterBottom>C</Typography>
//                     </Box>
//                     <Box className={classes.action}>
//                       <Typography variant="caption"  gutterBottom>C</Typography>
//                     </Box>
//                     <Box className={classes.action}>
//                       <Typography variant="caption" gutterBottom>C</Typography>
//                     </Box>
//                   </Box>
//                 </CardActions>
//               </Card> */}
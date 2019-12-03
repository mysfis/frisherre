import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Truncate from 'react-truncate';

import Icon from 'components/icons/ActivityIcons'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import InfoIcon from '@material-ui/icons/Info';
import { blue } from '@material-ui/core/colors';

// const border = '1px solid'
// const borderColor = '#DBDBDB'
const border = '0px solid'
const borderColor = '#ffffff'

const useStyles = makeStyles(theme => ({
    gridItem: {
        minWidth:0,
    },
    card:{
        border: border,
        borderColor: borderColor,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin:theme.spacing(1),
        marginBottom:theme.spacing(2),
        // height:120,
        minWidth:350,
    },
    picture: {
        border: border,
        borderColor: borderColor,
        flexBasis: 100,
        // flexGrow: 1,
        // flexShrink: 0,
        justifyContent: 'center',
        display:'flex',
    },
    icon: {
        marginTop:theme.spacing(1),
        fontSize:100-theme.spacing(2),
        color:theme.palette.primary.main,
        // backgroundColor:theme.palette.secondary.main,
        // border: "2px dashed",
        // borderColor: theme.palette.primary.main,
    },
    content: {    
        display:'flex',
        flexDirection: 'column',
        border: border,
        borderColor: borderColor,
        flexGrow: 1,
        minHeight:'100%',
        alignItems:'stretch',
        // marginTop: theme.spacing(1),
        minWidth:0,
        justifyContent: 'flex-start',
    },
    header: {
        display:'flex',
        // marginTop: theme.spacing(1),
        border: border,
        borderColor: borderColor,
        // height:20,
        // flexShrink: 0
        flexDirection: 'row',
        flex: '0 0 auto',
    },
    headerTitle: {
      flex: '1 1 auto',
      textAlign: 'left',
    //   marginLeft: theme.spacing(1),
    //   width: '80%',
    },
    headerActions: {
        flex: '0 0 auto',
        alignSelf: 'flex-start',
        marginTop: -theme.spacing(1),
        marginRight: -theme.spacing(1),
    },
    infoIcon: {
        color: blue[200],
        width: 36,
        height: 36,
    },
    main: {
        border: border,
        borderColor: borderColor,
        marginBottom: theme.spacing(1),
        flexGrow: 1,
        minWidth:0,
        flex: '1 1 auto',
    },
    footer: {
        border: border,
        borderColor: borderColor,
        // height:36,
        flexShrink: 0,
        flex: '0 0 auto',
        display:'flex',
        flexDirection: 'row',
        marginBottom: theme.spacing(1)
    },
    button: {
        lineHeight: 0.4,
        fontSize: 14,
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
        marginBottom: theme.spacing(1)/2,
        minWidth:80,
        flex: '1 1 auto',
    },
    }));

export default function CommunityCard ({community, actions}) {
    const classes = useStyles();

    if (!community) {
        return (
            <Grid item xs={12} md={6} className={classes.gridItem} zeroMinWidth >
            <Box className={classes.card} boxShadow={3}>
                <Box className={classes.picture}>
                    <AddCircleOutlineIcon className={classes.icon} />
                </Box>
                <Box className={classes.content}>
                    <Box className={classes.header}>

                    <Box className={classes.headerTitle} >
                        <Typography weight={'bold'} variant={'h6'} > Nouvelle communauté</Typography>
                        <Typography variant={'body2'} gutterBottom color="textSecondary">
                            locale ou associative
                        </Typography>
                        </Box>
                    </Box>
                    <Box className={classes.main}>
                        <Typography variant={'body2'} noWrap>
                            {/* <Truncate lines={2} ellipsis={<span>... <a href='/link/to/article'>Read more</a></span>}> */}
                            <Truncate lines={2} >
                            Cliquez sur l'icone + pour créer une communauté
                            </Truncate>
                            
                        </Typography>
                    </Box>
                    <Box className={classes.footer}>
                        <Button variant="outlined" color="primary" className={classes.button}>
                            ...
                        </Button>
                        <Button variant="outlined" color="secondary" className={classes.button}>
                            ...
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Grid>
        )
    }
    
    return (
        <Grid item xs={12} md={6} className={classes.gridItem} zeroMinWidth >
            <Box className={classes.card} boxShadow={3}>
                <Box className={classes.picture}>
                    <Icon name={community.icon} className={classes.icon} />
                </Box>
                <Box className={classes.content}>
                    <Box className={classes.header}>
                        <Box className={classes.headerTitle} >
                            <Typography weight={'bold'} variant={'h6'} >{community.name}</Typography>
                            <Typography variant={'body2'} gutterBottom color="textSecondary">{community.location}</Typography>
                        </Box>
                        <IconButton className={classes.headerActions} >
                            <InfoIcon className={classes.infoIcon}/>
                        </IconButton>
                    </Box>
                    <Box className={classes.main}>
                        <Typography variant={'body2'} noWrap>
                            {/* <Truncate lines={2} ellipsis={<span>... <a href='/link/to/article'>Read more</a></span>}> */}
                            <Truncate lines={2} >
                                {community.description}
                            </Truncate>
                        </Typography>
                    </Box>
                    
                    {(() => { switch(community.state) {
                        case 'INVITED':
                            return (
                                <Box className={classes.footer}>
                                    <Button 
                                        variant="outlined" color="primary" className={classes.button}
                                        onClick={()=>actions.join(community.url)}>
                                            Rejoindre
                                    </Button>
                                    <Button 
                                        variant="outlined" color="secondary" className={classes.button}
                                        onClick={()=>actions.leave(community.url)}>
                                            Refuser
                                    </Button>
                                </Box>)
                        case 'JOINED': return (
                            <Box className={classes.footer}>
                                <Button 
                                    variant="outlined" color="primary" className={classes.button}
                                    onClick={()=>actions.viewMembers(community.url)}>
                                        Inviter
                                </Button>
                                <Button 
                                    variant="outlined" color="secondary" className={classes.button}
                                    onClick={()=>actions.leave(community.url)}>
                                        Gérer
                                </Button>
                            </Box>)
                        default: return (
                            <Box className={classes.footer}>
                                <Button 
                                    variant="outlined" color="primary" className={classes.button}
                                    onClick={()=>actions.apply(community.url)}>
                                        Postuler
                                </Button>
                                <Button 
                                    variant="outlined" color="secondary" className={classes.button}
                                    onClick={()=>actions.contact(community.url)}>
                                        Contacter
                                </Button>
                            </Box>)
                        }
                    })()}
                    
                </Box>
            </Box>
        </Grid>
    )
}

CommunityCard.propTypes = {
    community: PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        location: PropTypes.string,
        description: PropTypes.string.isRequired,
    }), 
    actions: PropTypes.shape({
        join: PropTypes.func,
        leave: PropTypes.func,
        contact: PropTypes.func,
        viewMembers: PropTypes.func,
        apply: PropTypes.func,
    }), 
}
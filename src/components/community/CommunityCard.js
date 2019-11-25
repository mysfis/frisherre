import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Truncate from 'react-truncate';

import Icon from 'components/icons/outingIcons'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'


const border = '0px solid' //'1px solid' //
const borderColor = '#ffffff' //'#DBDBDB' //

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
        height:136,
        minWidth:0,
    },
    picture: {
        border: border,
        borderColor: borderColor,
        flexBasis: 80,
        flexGrow: 0,
        flexShrink: 0,
        justifyContent: 'center',
        display:'flex',
    },
    icon: {
        marginTop:theme.spacing(1),
        fontSize:80-theme.spacing(2),
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
        minWidth:0,
    },
    header: {
        border: border,
        borderColor: borderColor,
        // height:20,
        // flexShrink: 0
        flexDirection: 'row',
    },
    main: {
        border: border,
        borderColor: borderColor,
        marginBottom: theme.spacing(1),
        flexGrow: 1,
        minWidth:0,
    },
    footer: {
        border: border,
        borderColor: borderColor,
        height:24,
        flexShrink: 0
    },
    button: {
        lineHeight: 0.4,
        fontSize: 14,
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1)
    },
    }));

export default function CommunityCard ({community, actions}) {
    const classes = useStyles();

    return (
        <Grid item xs className={classes.gridItem} zeroMinWidth >
            <Box className={classes.card} boxShadow={3}>
                <Box className={classes.picture}>
                    <Icon name={community.icon} className={classes.icon} />
                </Box>
                <Box className={classes.content}>
                    <Box className={classes.header}>
                        <Typography weight={'bold'} variant={'h6'} >{community.name}</Typography>
                        <Typography variant={'body2'} gutterBottom color="textSecondary">{community.location}</Typography>
                    </Box>
                    <Box className={classes.main}>
                        <Typography variant={'body2'} noWrap>
                            {/* <Truncate lines={2} ellipsis={<span>... <a href='/link/to/article'>Read more</a></span>}> */}
                            <Truncate lines={2} >
                                {community.description}
                            </Truncate>
                            
                        </Typography>
                    </Box>
                    <br></br>
                    <Box className={classes.footer}>
                        {(() => { switch(community.state) {
                            case 'INVITED':
                                return <div>
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
                                </div>;
                            case 'JOINED':
                                return <div>
                                    <Button 
                                        variant="outlined" color="primary" className={classes.button}
                                        onClick={()=>actions.viewMembers(community.url)}>
                                            Membres
                                    </Button>
                                    <Button 
                                        variant="outlined" color="secondary" className={classes.button}
                                        onClick={()=>actions.leave(community.url)}>
                                            Quitter
                                    </Button>
                                </div>;
                            default:
                                return <div>
                                    <Button 
                                        variant="outlined" color="primary" className={classes.button}
                                        onClick={()=>actions.apply(community.url)}>
                                            Postuler
                                    </Button>
                                    <Button 
                                        variant="outlined" color="secondary" className={classes.button}
                                        onClick={()=>actions.contact(community.url)}>
                                            Contact
                                    </Button>
                                </div>;
                            }
                        })()}
                    </Box>
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
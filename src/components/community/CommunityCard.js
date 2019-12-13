import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Truncate from 'react-truncate';

import CategoryIcon from 'components/icons/CategoryIcon'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import InfoIcon from '@material-ui/icons/Info';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    gridItem: {
        minWidth:0,
    },
    card:{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin:theme.spacing(1),
        marginBottom:theme.spacing(2),
        minWidth:300,
    },
    picture: {
        flexBasis: 100,
        justifyContent: 'center',
        display:'flex',
    },
    icon: {
        marginTop:theme.spacing(1),
        fontSize:100-theme.spacing(2),
        color:theme.palette.primary.main,
    },
    content: {    
        display:'flex',
        flexDirection: 'column',
        flexGrow: 1,
        minHeight:'100%',
        alignItems:'stretch',
        minWidth:0,
        justifyContent: 'flex-start',
    },
    header: {
        display:'flex',
        flexDirection: 'row',
        flex: '0 0 auto',
    },
    headerTitle: {
      flex: '1 1 auto',
      textAlign: 'left',
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
        marginBottom: theme.spacing(1),
        flexGrow: 1,
        minWidth:0,
        flex: '1 1 auto',
    },
    footer: {
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
        flex: '1 1 auto',
    },
    }));

export default function CommunityCard ({community, actions}) {
    const classes = useStyles();

    if (!community.url) {
        return (
            <Grid item xs={12} md={6} className={classes.gridItem} zeroMinWidth >
            <Box className={classes.card} boxShadow={3}>
                <IconButton className={classes.picture} onClick={actions.handleAdd}>
                    <AddCircleOutlineIcon className={classes.icon} />
                </IconButton>
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
                    <CategoryIcon category={community.icon_category} name={community.icon_name} className={classes.icon} />
                </Box>
                <Box className={classes.content}>
                    <Box className={classes.header}>
                        <Box className={classes.headerTitle} >
                            <Typography weight={'bold'} variant={'h6'} >{community.name}</Typography>
                            <Typography variant={'body2'} gutterBottom color="textSecondary">{community.location}</Typography>
                        </Box>
                        <IconButton className={classes.headerActions} onClick={()=>actions.handleEdit(community)}>
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
        url: PropTypes.string,
        name: PropTypes.string,
        location: PropTypes.string,
        description: PropTypes.string,
    }), 
    actions: PropTypes.shape({
        join: PropTypes.func,
        leave: PropTypes.func,
        contact: PropTypes.func,
        viewMembers: PropTypes.func,
        apply: PropTypes.func,
    }), 
}
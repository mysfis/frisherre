import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


const border = '1px solid'
const borderColor = '#DBDBDB' //'#ffffff'

const useStyles = makeStyles(theme => ({
    gridItem: {
    },
    card:{
      border: border,
      borderColor: borderColor,
  
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      margin:theme.spacing(1)
    },
    picture: {
      border: border,
      borderColor: borderColor,
      flexBasis: 80,
      height:120,
      flexGrow: 0,
      flexShrink: 0,
    },
    content: {    
      display:'flex',
      flexDirection: 'column',
      border: border,
      borderColor: borderColor,
      flexGrow: 1,
      minHeight:'100%',
      alignItems:'stretch',
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
      flexGrow: 1,
    },
    footer: {
      border: border,
      borderColor: borderColor,
      height:20,
      flexShrink: 0
    },
    button: {
        lineHeight: 0.4,
        fontSize: 12
    },
  }));

export default function CommunityCard ({community, actions}) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
            <Box className={classes.card}>
            <Box className={classes.picture}>
              pic
            </Box>
            <Box className={classes.content}>
                <Box className={classes.header}>
                    <Typography weight={'bold'} variant={'h6'} >{community.name}</Typography>
                  <Typography variant={'body2'} gutterBottom color="textSecondary">{community.location}</Typography>
                </Box>
                <Box className={classes.main}>
                    <Typography variant={'body2'} >{community.description}</Typography>
                </Box>
                <Box className={classes.footer}>
                    {(() => {
                        switch(community.state) {
                        case 'INVITED':
                            return <div>
                                <Button variant="outlined" color="primary" className={classes.button}
                                onClick={()=>actions.join(community.url)}>Rejoindre</Button>
                                <Button variant="outlined" color="alert" className={classes.button}
                                onClick={()=>actions.leave(community.url)}>Refuser</Button></div>;
                        case 'JOINED':
                            return  <div>
                            <Button variant="outlined" color="primary" className={classes.button}
                            onClick={()=>actions.viewMembers(community.url)}>Membres</Button>
                            <Button variant="outlined" color="alert" className={classes.button}
                            onClick={()=>actions.leave(community.url)}>Quitter</Button></div>;
                        default:
                            return  <div>
                            <Button variant="outlined" color="primary" className={classes.button}
                            onClick={()=>actions.apply(community.url)}>Postuler</Button>
                            <Button variant="outlined" color="alert" className={classes.button}
                            onClick={()=>actions.contact(community.url)}>Contact</Button></div>;
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
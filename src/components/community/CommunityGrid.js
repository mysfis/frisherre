import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles';

import CommunityCard from 'components/community/CommunityCard'

import { Container, Box, Typography, Grid, Divider, IconButton, Button } from '@material-ui/core'
import Link from '@material-ui/core/Link';
import { blue } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const border = '1px solid'
const borderColor = '#DBDBDB' //'#ffffff'

const useStyles = makeStyles(theme => ({
  root: {
    padding:theme.spacing(1),
  },
  title: {
    textAlign:'center',
  },
  gridList: {
    marginTop: 10
  },
}));

const CommunityGrid = ({ communities, actions }) => {

    const classes = useStyles();
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState(communities)

    const communityData = {
        url: 'http://localhost:8000/api/community/1/', name: 'Omnisport La Pom', location: 'La Pommeraye', description: 'Ecole omnisport pour les enfants et les adultes',}
    const communitiesData = [communityData, communityData, communityData]

    if (loading) {
        return (
            <Container p={{ xs: 2, sm: 3, md: 4 }} className={classes.root}>
                <Typography weight={'bold'} variant={'h4'} gutterBottom className={classes.title}>
                    <Link underline={'none'}>My Communities</Link>
                </Typography>
                <Typography  variant={'h6'} gutterBottom className={classes.title}>
                Loading Data...
                </Typography>
                <Button variant="outlined" color="primary" onClick={()=>setLoading(false)}>loaded</Button>
            </Container>)}

    if (data.length === 0) {
    return (
            <Container p={{ xs: 2, sm: 3, md: 4 }} className={classes.root}>
                <Typography weight={'bold'} variant={'h4'} gutterBottom className={classes.title}>
                    <Link underline={'none'}>My Communities</Link>
                </Typography>
                <Typography  variant={'h6'} gutterBottom className={classes.title}>
                    no communities currently...
                </Typography>
                <Button variant="outlined" color="primary" onClick={()=>setData(communitiesData)}>loaded</Button>
            </Container>)}

    return (
    <Container p={{ xs: 2, sm: 3, md: 4 }} className={classes.root}>
        <Typography weight={'bold'} variant={'h4'} gutterBottom className={classes.title}>
        <Link underline={'none'}>My Communities</Link>
        </Typography>
        <Grid container className={classes.gridList}>
            {data.map(community => (
                <CommunityCard 
                    community={community} 
                    actions={actions}
                    key={JSON.stringify(community)}/>
        ))}
        </Grid>

    </Container>
    )
}

CommunityGrid.propTypes = {
    loading: PropTypes.bool,
    communities: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        location: PropTypes.string,
        description: PropTypes.string.isRequired,
    })), 
    actions: PropTypes.shape({
        join: PropTypes.func,
        leave: PropTypes.func,
        contact: PropTypes.func,
        viewMembers: PropTypes.func,
        apply: PropTypes.func,
    }), 
};
CommunityGrid.defaultProps = {
};


export default CommunityGrid;

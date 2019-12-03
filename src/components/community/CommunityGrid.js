import React from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import CommunityCard from 'components/community/CommunityCard'

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core'
import Link from '@material-ui/core/Link';
import { useAuth } from 'context/auth';

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

const CommunityGrid = (props) => {

    const classes = useStyles();
    const { authData } = useAuth()
    
    const [loading, setLoading] = React.useState(props.loading ? true : false)
    const [refresh, setRefresh] = React.useState(false)
    const [open, setOpen] = React.useState(false);

    const [communities, setCommunities] = React.useState(props.communities ? props.communities : [])
    const [community, setCommunity] = React.useState(communities[0])

    const getCommunities = React.useCallback(() => {
        if (authData.token !== null) {
            axios.defaults.headers= {
                "Content-Type": "application/json",
                Authorization: "Token " + authData.token,
        }
        axios
            .get("/api/community/")
            .then(res => {
                console.log(res)
                setCommunities(res.data)
                setLoading(false)})
            .catch(err => console.log(err));
        }
    }, [authData.token])

    React.useEffect(() => getCommunities(), [getCommunities]);

    const handleClose = () => { setOpen(false);}

    const handleRefresh = () => {setRefresh(!refresh);}

    const handleAdd = () => {
        setOpen(true);
        setCommunity({ 
            name: '',
            location: '',
            description: "",
            category:"",
            icon:"",
        })
    }

    const handleEdit = (community) => {
        setOpen(true);
        setCommunity(community)
    }

    const handleDelete = (community) => {
        if (authData.token !== null) {
            axios.defaults.headers= {
                "Content-Type": "application/json",
                Authorization: "Token " + authData.token,
        }
        axios
            .delete(community.url)
            .then(res => handleRefresh())
            .catch(err => console.log(err));
        }
    }

    const actions = props.actions ? props.actions : {handleAdd, handleDelete, handleEdit}
    

    if (loading) {
        return (
            <Container p={{ xs: 2, sm: 3, md: 4 }} className={classes.root}>
                <Typography weight={'bold'} variant={'h4'} gutterBottom className={classes.title}>
                    <Link underline={'none'}>My Communities</Link>
                </Typography>
                <Typography  variant={'h6'} gutterBottom className={classes.title}>
                Loading Data...
                </Typography>
            </Container>)}

    // if (communities.length === 0) {
    // return (
    //         <Container p={{ xs: 2, sm: 3, md: 4 }} className={classes.root}>
    //             <Typography weight={'bold'} variant={'h4'} gutterBottom className={classes.title}>
    //                 <Link underline={'none'}>My Communities</Link>
    //             </Typography>
    //             <Typography  variant={'h6'} gutterBottom className={classes.title}>
    //                 no communities currently...
    //             </Typography>
    //         </Container>)}

    return (
        <Container p={{ xs: 2, sm: 3, md: 4 }} className={classes.root} >
            <Typography weight={'bold'} variant={'h4'} gutterBottom className={classes.title}>
            <Link underline={'none'}>My Communities</Link>
            </Typography>
            <Grid container className={classes.gridList}>
                {communities.map(community => (
                    <CommunityCard 
                        community={community} 
                        actions={actions}
                        key={JSON.stringify(community)}/>
                ))}
                <CommunityCard 
                        key={JSON.stringify("nouvelle communaute")}/>
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
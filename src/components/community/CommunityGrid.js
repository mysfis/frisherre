import React from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import CommunityCard from 'components/community/CommunityCard'
import CommunityDialog from 'components/community/CommunityDialog'

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core'
import Link from '@material-ui/core/Link';
import { useAuth } from 'context/auth';
import groupByCommunity from 'utils/groupByCommunity';

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

    const newCommunity = { name: '', location: '', description: "", typology: 2, icon_category:"teamsport", icon_name:"",}

    const [communities, setCommunities] = React.useState(props.communities ? props.communities : [])
    const [community, setCommunity] = React.useState(newCommunity)
    const [dialogMode, setDialogMode] = React.useState("view")

    const getCommunities = React.useCallback(() => {
        if (authData.token !== null) {
            axios.defaults.headers= {
                "Content-Type": "application/json",
                Authorization: "Token " + authData.token,
        }
        axios
            .get(authData.profile.url+"memberships/")
            .then(res => {
                const flat_communities = groupByCommunity(res.data)
                console.log(flat_communities)
                setCommunities(flat_communities)
                setLoading(false)})
            .catch(err => console.log(err));
        }
    }, [authData.token, authData.profile])

    React.useEffect(() => getCommunities(), [getCommunities, refresh]);
    const handleClose = () => { setOpen(false);}
    const handleRefresh = () => {setRefresh(!refresh);}

    const handleAdd = () => {
        setCommunity(newCommunity)
        setDialogMode("create")
        setOpen(true);
    }

    const handleView = (community) => {
        setCommunity(community)
        setDialogMode("view")
        setOpen(true);
    }

    const handleEdit = (community) => {
        setCommunity(community)
        setDialogMode("edit")
        setOpen(true);
    }

    const handleDelete = (community) => {
        setCommunity(community)
        setDialogMode("delete")
        setOpen(true);
    }

    const actions = props.actions ? props.actions : {handleView, handleAdd, handleDelete, handleEdit}

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
                        key={JSON.stringify(community)}
                        community={community} 
                        actions={actions} />
                ))}
                <CommunityCard 
                        key={JSON.stringify("new_communauty")}
                        community={newCommunity}
                        actions={actions} />
            </Grid>
            <CommunityDialog
                    community={community}
                    mode={dialogMode}
                    open={open} 
                    close={handleClose}
                    refresh={handleRefresh}/>
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
        handleAdd: PropTypes.func,
        handleDelete: PropTypes.func,
        handleEdit: PropTypes.func,
        
    })
};
CommunityGrid.defaultProps = {
};

export default CommunityGrid;
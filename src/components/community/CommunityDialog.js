import React from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { useAuth } from 'context/auth';
import CategoryIcon from 'components/icons/CategoryIcon'
import { useMediaQuery, useTheme, NativeSelect, InputLabel, FormControl, FormHelperText } from '@material-ui/core';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
        backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    icon: {
        color: theme.palette.primary.main,
    },	
    avatarClass: {
        width: 36,
        height: 36,
        // borderRadius: 10,
        // fontSize: '0.8em',
        color: theme.palette.primary.main,
      },
}));

const CommunityDialog = (props) => {
    const theme = useTheme()
    const classes = useStyles(theme);
    const onMobile = useMediaQuery(theme.breakpoints.down('xs'))

    const { authData } = useAuth()
    const [community, setCommunity] = React.useState(props.community)
    React.useEffect(() => setCommunity(props.community), [props.community])

    const allIcons = {
        fitness: ["bicycle", "machine", "cobra", "meditate"],
        game: ["boardgame", "bowling" ,"cards" ,"chess"],
        individualsport: ["archery", "athletics", "dancing", "gymnastics", "gashootingme", "horse"],
        martialart: ["fencing", "boxing", "karate"],
        outdoorsport: ["biking", "climbing", 'golf'],
        outing: ["amusement-park", "camping", "concert", "market", "movie", "party"],
        racketsport: ["badmington", "pingpong", "tennis"],
        skatingsport: ["iceskating", "rollerblade", "skateboard", "hockey"],
        teamsport: ["basketball", "football", "rugby", "volleyball"],
        watersport: ["swimming", "waterpolo"],}

    const handleChange = event => { 
        const { name, value } = event.target
        setCommunity({ ...community, [name]: value })
    }
    const iconChange = icon => { setCommunity({ ...community, icon_name: icon }) }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.defaults.headers= { 
            "Content-Type": "application/json",
            Authorization: "Token " + authData.token, }

        if (community.url) {
            return axios
                .put(community.url, community)
                .then(res => {
                    props.refresh();
                    props.close()
                })
                .catch(err => console.log(err));
            } else {
            const membership = {community:{...community}, profile:{...authData.profile}, status:1}
            return axios
                .post("/api/v1/memberships/", membership)
                .then(res => {
                    props.refresh();
                    props.close()
                })
                .catch(err => console.log(err));
        }
    }

    const onDelete = () => {
        if (authData.token !== null) {
            axios.defaults.headers= {
                "Content-Type": "application/json",
                Authorization: "Token " + authData.token,
            }
            axios
                .delete(community.url)
                .then(res => {
                    props.refresh()
                    props.close()
                })
                .catch(err => console.log(err));
        }
    }

    if (props.mode==="delete") {
        return (
            <Dialog
                open={props.open}
                onClose={props.close}
                aria-labelledby="alert-delete"
                aria-describedby="alert-delete-are-you-sure"
            >
                <DialogTitle id="alert-dialog-title">
                    Etes vous sur de vouloir supprimer {community.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Après avoir supprimé la communauté, les membres ne pourront plus créer des activités ou échanger
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDelete} color="primary" autoFocus>
                        Accepter
                    </Button>
                    <Button onClick={props.close} color="primary">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <Dialog open={props.open} onClose={props.close} 
                aria-labelledby="Nouveau Community" 
                fullScreen = {onMobile}>
            <DialogTitle id="community-dialog" style={{backgroundColor: theme.palette.primary.main, color: theme.palette.common.white}}>
                {community.url? 
                    "Modifier la communauté "+community.name 
                    : 
                    "Ajouter une nouvelle communauté"}
            </DialogTitle>
            <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField
                    id="name" required fullWidth
                    name="name" label="Nom" autoComplete="name" 
                    onChange={handleChange}
                    value={community.name || ''}
                    helperText={community.name === "" ? 'Champ obligatoire!' : ' '}
                    error = {community.name === "" ? true : false}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                    id="location" required fullWidth
                    name="location" label="Localisation" autoComplete="location"
                    onChange={handleChange}
                    value={community.location || ''}
                    helperText={community.location === "" ? 'Champ obligatoire!' : ' '}
                    error = {community.location === "" ? true : false}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl required error={community.typology === "" ? true : false}>
                        <InputLabel htmlFor="community_type_select">Type</InputLabel>
                        <NativeSelect
                            fullWidth
                            inputProps={{name:"typology", id:"community_type_select"}}
                            onChange={handleChange}
                            value={community.typology || ""}>
                            <option value=""></option>
                            <option value={1}>de voisinage</option>
                            <option value={2} default>de pratique</option>
                            <option value={3}>d'intérêt</option>
                            <option value={4}>d'action</option>
                            <option value={5}>de circomstances</option>
                        </NativeSelect>
                        <FormHelperText>{community.typology === "" ? 'Champ obligatoire!' : ' '}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField multiline rows="2"
                    id="description" required fullWidth
                    name="description" label="description" autoComplete="description"
                    onChange={handleChange}
                    value={community.description || ''}
                    helperText={community.description === "" ? 'Champ obligatoire!' : ' '}
                    error = {community.description === "" ? true : false}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl required error={community.typology === "" ? true : false}>
                        <InputLabel htmlFor="community_icon_category_select">Category</InputLabel>
                        <NativeSelect
                            fullWidth
                            inputProps={{name:"icon_category", id:"community_icon_category_select"}}
                            onChange={handleChange}
                            value={community.icon_category || ""}>
                            <option value=""></option>
                            <option value="game">Jeux d'intérieur</option>
                            <option value="teamsport">Sport d'équipe</option>
                            <option value="individualsport">Sport Individuel</option>
                            <option value="outdoorsport">Sport de plein air</option>
                            <option value="martialart">Art Martial</option>
                            <option value="racketsport">Sport de raquette</option>
                            <option value="skatingsport">Sport de glisse</option>
                            <option value="watersport">Sport Aquatique</option>
                            <option value="outing">Sorties</option>
                        </NativeSelect>
                        <FormHelperText>{community.typology === "" ? 'Champ obligatoire!' : ' '}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={8} container>
                    {allIcons[community.icon_category].map(icon =>(
                    <Grid item xs={2} sm={2} key={icon} >
                        <IconButton onClick={()=>{iconChange(icon)}} className={classes.avatarClass} >
                            <CategoryIcon 
                                category={community.icon_category}
                                name={icon} 
                                className={classes.avatarClass}
                                highlight={community.icon_name===icon? "true": undefined}/>
                        </IconButton>
                    </Grid>
                    ))}
                </Grid>
                </Grid>
            </DialogContent> 
            {props.mode==="view" ?
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={props.close}
                    >Fermer</Button>
                </DialogActions>
            :
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={handleFormSubmit}
                    >Sauver</Button>
                    <Button
                        color="primary"
                        onClick={props.close}
                    >Annuler</Button>
                </DialogActions>  
            }
    {/* </Container> */}
    </Dialog>
    );
}


export default CommunityDialog

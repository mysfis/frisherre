import React from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { useAuth } from 'context/auth';
import { useMediaQuery, useTheme } from '@material-ui/core';
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
    footer: {
        backgroundColor: theme.palette.primary.main,
    },
    footerButton: {
        color: theme.palette.common.white,
    }
}));

const OutingDialog = (props) => {
    const theme = useTheme()
    const classes = useStyles(theme);
    const onMobile = useMediaQuery(theme.breakpoints.down('xs'))

    const { authData } = useAuth()
    const [outing, setOuting] = React.useState(props.outing)
    React.useEffect(() => setOuting(props.outing), [props.outing])

    const handleChange = event => { 
        const { name, value } = event.target
        setOuting({ ...outing, [name]: value })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.defaults.headers= { 
            "Content-Type": "application/json",
            Authorization: "Token " + authData.token, }

        if (outing.url) {
            return axios
                .put(outing.url, outing)
                .then(res => {
                    props.refresh();
                    props.close()
                })
                .catch(err => console.log(err));
        } else {
        const attendance = {outing:{...outing}, profile:{...authData.profile}, status:1}
        return axios
            .post("/api/v1/attendances/", attendance)
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
                .delete(outing.url)
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
                    Etes vous sur de vouloir supprimer {outing.name}
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
                aria-labelledby="New Outing" 
                fullScreen = {onMobile}>
            <DialogTitle id="outing-dialog" style={{backgroundColor: theme.palette.primary.main, color: theme.palette.common.white}}>
                {outing.url? 
                    "Modifier la sortie "+outing.name 
                    : 
                    "Ajouter une nouvelle sortie"}
            </DialogTitle>
            <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <TextField
                    id="title" required fullWidth
                    name="title" label="Nom" autoComplete="title" 
                    onChange={handleChange}
                    value={outing.title || ''}
                    helperText={outing.title === "" ? 'Champ obligatoire!' : ' '}
                    error = {outing.title === "" ? true : false}
                    />
                </Grid>
                </Grid>
            </DialogContent> 
            {props.mode==="view" ?
                <DialogActions className={classes.footer}>
                    <Button className={classes.footerButton}
                        color="primary"
                        onClick={props.close}
                    >Fermer</Button>
                </DialogActions>
            :
                <DialogActions className={classes.footer}>
                    <Button className={classes.footerButton}
                        onClick={handleFormSubmit}
                    >Sauver</Button>
                    <Button className={classes.footerButton}
                        onClick={props.close}
                    >Annuler</Button>
                </DialogActions>  
            }
    {/* </Container> */}
    </Dialog>
    );
}


export default OutingDialog

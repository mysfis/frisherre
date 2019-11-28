import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      width:"100%",
      alignContent:'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
        
      },
    },
  }));

export function Spinner(props) {
    return (
      <CircularProgress
        aria-label="loading"
        size='100'
        {...props}
      />
    )
  }

export function FullPageSpinner() {
    const classes = useStyles()
    return (
        <Container p={{ xs: 2, sm: 3, md: 4 }} className={classes.root}>
            <Spinner />
        </Container>
    )
  }
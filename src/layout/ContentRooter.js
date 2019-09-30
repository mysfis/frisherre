/* eslint-disable */
import React from 'react';
import { Router } from "@reach/router"
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import UserAccount from '../components/UserAccount'
import HomeScreen from '../components/HomeScreen'
import Schedule from '../components/Schedule'
import Household from '../components/Household'

const styles = ({ breakpoints, transitions }) => ({
  root: {
    padding: 16,
    transition: transitions.create(),
    [breakpoints.up('sm')]: {
      padding: 24,
      maxWidth: 700,
      margin: 'auto',
    },
    [breakpoints.up('md')]: {
      maxWidth: 960,
    },
  },
})

const ContentRooter = ({ props, classes }) => (
    <Router>
      <HomeScreen path="/" classes={classes} />
      <Schedule path="schedule" classes={classes} />
      <Household path="household" classes={classes} />
      <UserAccount path="myaccount" />

    </Router>
);

ContentRooter.propTypes = {};
ContentRooter.defaultProps = {};

export default withStyles(styles)(ContentRooter)

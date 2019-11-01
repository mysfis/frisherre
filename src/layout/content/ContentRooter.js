/* eslint-disable */
import React from 'react';
import { Router } from "@reach/router"

import UserAccount from 'containers/account/View'
import HomeScreen from 'containers/home/View'
import Schedule from 'containers/schedule/MyView2'
import Household from 'containers/household/View'

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const styles = ({ breakpoints, transitions }) => ({
  content: {
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
  <div className={classes.content}>
    <Router>
      <HomeScreen path="/" />
      <Schedule path="schedule" />
      <Household path="household" />
      <UserAccount path="myaccount" />
    </Router>
  </div>
);

ContentRooter.propTypes = {};
ContentRooter.defaultProps = {};

export default withStyles(styles)(ContentRooter)

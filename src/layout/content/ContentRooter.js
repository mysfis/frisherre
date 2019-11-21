/* eslint-disable */
import React from 'react';
import { Router } from "@reach/router"

import UserAccount from 'components/user/Account'
import HomeScreen from 'components/Home'
import Outing from 'components/outing/OutingView'
import Household from 'components/household/View'
import ProfileGrid from 'components/profile/ProfileGrid'

import { withStyles } from '@material-ui/core/styles';

const styles = ({ breakpoints, transitions }) => ({
  content: {
    // padding: 16,
    transition: transitions.create(),
    [breakpoints.up('sm')]: {
      // padding: 12,
      maxWidth: 700,
      margin: 'auto',
    },
    [breakpoints.up('md')]: {
      maxWidth: 960,
    },
    [breakpoints.down('xs')]: {
      minWidth: 355,
    },
  },
})

const ContentRooter = ({ props, classes }) => (
  <div className={classes.content}>
    <Router primary={false}>
      <HomeScreen path="/" />
      <Outing path="schedule" />
      <Household path="household" />
      <UserAccount path="myaccount" />
      <ProfileGrid path="profile" />
    </Router>
  </div>
);

ContentRooter.propTypes = {};
ContentRooter.defaultProps = {};

export default withStyles(styles)(ContentRooter)

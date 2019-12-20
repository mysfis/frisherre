/* eslint-disable */
import React from 'react';
import { Router } from "@reach/router"

import UserAccount from 'components/user/Account'
import HomeScreen from 'components/Home'
import OutingGrid from 'components/outing/OutingGrid'
import Household from 'components/household/View'
import ProfileGrid from 'components/profile/ProfileGrid'
import CommunityGrid from 'components/community/CommunityGrid';

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
      <OutingGrid path="outings" />
      <Household path="household" />
      <UserAccount path="myaccount" />
      <ProfileGrid path="profiles" />
      <CommunityGrid path="communities" />
    </Router>
  </div>
);

ContentRooter.propTypes = {};
ContentRooter.defaultProps = {};

export default withStyles(styles)(ContentRooter)

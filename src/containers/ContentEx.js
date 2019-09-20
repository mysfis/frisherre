/* eslint-disable */
import React from 'react';
import { Router } from "@reach/router"
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import UserProfile from '../components/UserProfile'

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
});

const Home = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant={'overline'}>Bruno vous présente</Typography>
    <Typography weight={'bold'} variant={'h4'} gutterBottom>
      <Link underline={'none'}>Keluno</Link> - Copinage de Voisinage
    </Typography>
    <Typography gutterBottom>
      <b>Version Beta</b>
    </Typography>
    <Typography indent={'small'}>
      Keluno est une plateforme de bon voisinage pour partager les déplacements
      du quotidien, les outils d'entretien, ainsi que les bons petits plats.
    </Typography>
    <br />
    <br />
    <br />
    <Typography weight={'bold'} variant={'h5'} gutterBottom>
      {"Pourquoi une telle plateforme"}
    </Typography>
    <Typography gutterBottom>
      I created this because
      <br />
    </Typography>
    <Typography component={'div'}>
      <ol>
        <li>
          It took me a lot of time to initialize dashboard layout when I have
          new projects and I’m sure that a lot of you guys agree with me.
        </li>
        <li>
          Sometimes it is hard to refactor because the structure is so poor
          because someone isn’t deeply understand what he/she was doing, as a
          result, rewrite the whole layout (it actually happened, at least in my
          experience).
        </li>
        <li>
          Because we need to be fast to let others continue our work, we
          frequently write poor and a lot of code. However, we say we don’t have
          time to fix them. Eventually, spend all day paying technical debts.
        </li>
      </ol>
    </Typography>
    <br />
    <br />
    <br />

  </div>
)

const Schedule = ({ classes }) => (
  <div className={classes.root}>
    <Typography weight={'bold'} variant={'h5'} gutterBottom>
      Objectives
    </Typography>
    <Typography component={'div'}>
      <ol>
        <li>
          It took me a lot of time to initialize dashboard layout when I have
          new projects and I’m sure that a lot of you guys agree with me.
        </li>
        <li>
          Sometimes it is hard to refactor because the structure is so poor
          because someone isn’t deeply understand what he/she was doing, as a
          result, rewrite the whole layout (it actually happened, at least in my
          experience).
        </li>
        <li>
          Because we need to be fast to let others continue our work, we
          frequently write poor and a lot of code. However, we say we don’t have
          time to fix them. Eventually, spend all day paying technical debts.
        </li>
      </ol>
    </Typography>
    <br />
    <br />
    <br />
  </div>
)

const CustomContent = ({ props, classes }) => (
    <Router>
      <Home path="/" classes={classes} />
      <Schedule path="schedule"  classes={classes} />
      <UserProfile path="myprofile" />
    </Router>
);

CustomContent.propTypes = {};
CustomContent.defaultProps = {};

export default withStyles(styles)(CustomContent)

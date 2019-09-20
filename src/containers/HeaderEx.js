import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { isWidthUp } from '@material-ui/core/withWidth';
import InputBase from '@material-ui/core/InputBase';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


const styles = ({ spacing, transitions, breakpoints, palette, shape }) => ({
  header: {
    fontWeight: 900,
    minWidth: 0,
    fontSize: 18,
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    marginRight: 8,
    borderRadius: shape.borderRadius,
    background: palette.common.white,
    '&:hover': {
      background: palette.grey[200],
    },
    marginLeft: 0,
    width: '100%',
    [breakpoints.up('sm')]: {
      marginLeft: spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    color:palette.primary.main,
    width: spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: palette.primary.main,
    width: '100%',
  },
  inputInput: {
    borderRadius: 4,
    paddingTop: spacing(1),
    paddingRight: spacing(1),
    paddingBottom: spacing(1),
    paddingLeft: spacing(10),
    transition: transitions.create('width'),
    width: '100%',
    [breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

const HeaderEx = ({ props, classes, screen }) => (
  <>
    <Typography noWrap className={classes.header}>
      Keluno
    </Typography>
    <div className={classes.grow} />
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Icon>search</Icon>
      </div>
      <InputBase
        placeholder="Chercher sortie…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>
    {screen === 'xs' && (
      <IconButton>
        <Icon>more_vert</Icon>
      </IconButton>
    )}
    {screen === 'sm' && (
      <>
        <IconButton>
          <Icon>favorite</Icon>
        </IconButton>
        <IconButton>
          <Icon>more_vert</Icon>
        </IconButton>
      </>
    )}
    {isWidthUp('md', screen) && (
      <>
        <IconButton>
          <Icon>favorite</Icon>
        </IconButton>
        <IconButton>
          <Icon>phone</Icon>
        </IconButton>
        <IconButton>
          <Icon>camera</Icon>
        </IconButton>
      </>
    )}
  </>
);

HeaderEx.propTypes = {
  screen: PropTypes.string,
  classes: PropTypes.shape({}).isRequired,
};
HeaderEx.defaultProps = {
  screen: null,
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(HeaderEx));

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import Typography from '@material-ui/core/Typography';



const styles = () => ({
  header: {
    fontWeight: 900,
    minWidth: 0,
    fontSize: 18,
  },
  grow: {
    flexGrow: 1,
  },
});

const HeaderAnon = ({ props, classes }) => (
  <>
    <Typography noWrap className={classes.header}>
      Keluno
    </Typography>
    <div className={classes.grow} />
    <IconButton>
      <LockOpenIcon />
    </IconButton>
  </>
);

HeaderAnon.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};
HeaderAnon.defaultProps = {
};

export default withStyles(styles)(HeaderAnon);

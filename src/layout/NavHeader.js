import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import { connect } from 'react-redux';

function NavHeader ({ collapsed, token }) {

  const [user, setUser] = React.useState({})
  const getMyAccount = React.useCallback(() => {
    if (token !== null) {
      axios.defaults.headers= {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      }
      axios
          .get("/api/currentuser/")
          .then(res => setUser(res.data[0]))
          .catch(err => console.log(err));
    }
  }, [token])
  React.useEffect( () => { getMyAccount()}, [getMyAccount] );

  return (
  <>
    <div style={{ padding: collapsed ? 8 : 16, transition: '0.3s' }}>
      <Avatar
        style={{
          width: collapsed ? 48 : 60,
          height: collapsed ? 48 : 60,
          transition: '0.3s',
        }}
      />
      <div style={{ paddingBottom: 16 }} />
      <Typography variant={'h6'} noWrap>
        {user.first_name}
      </Typography>
      <Typography color={'textSecondary'} noWrap gutterBottom>
        Maisonnée {user.last_name}
      </Typography>
    </div>
    <Divider />
  </>
);}

NavHeader.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};
NavHeader.defaultProps = {};

const mapStateToProps = state => {
  return {
    token: state.token,
  }
}

export default connect(mapStateToProps)(NavHeader);

import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import { connect } from 'react-redux';

const url_server = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : '';

function NavHeaderEx ({ collapsed, token }) {

  const [user, setUser] = React.useState({})
  const [refresh, setRefresh] = React.useState(false)
  React.useEffect(() => getMyProfile(), [refresh]);
  const getMyProfile = () => {
    if (token !== null) {
      axios.defaults.headers= {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      }
      axios
          .get(url_server+"/api/currentuser/")
          .then(res => setUser(res.data[0]))
          .catch(err => console.log(err));
      setRefresh(false)
    }
  };
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

NavHeaderEx.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};
NavHeaderEx.defaultProps = {};

const mapStateToProps = state => {
  return {
    token: state.token,
  }
}

export default connect(mapStateToProps)(NavHeaderEx);

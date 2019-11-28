import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useAuth } from 'context/auth';

function NavHeader ({ collapsed }) {
    const { authData } = useAuth()

    const [user, setUser] = React.useState(authData.user)
    React.useEffect(() => { setUser(authData.user) }, [authData.user]); 
    
    const [profile, setProfile] = React.useState(authData.profile)
    React.useEffect(() => { setProfile(authData.profile) }, [authData.profile]); 

    return (
    <React.Fragment>
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
            {profile? profile.first_name: 'pending'}
        </Typography>
        <Typography color={'textSecondary'} noWrap gutterBottom>
            Maisonnée {user? user.last_name : 'pending'}
        </Typography>
        </div>
        <Divider />
    </React.Fragment>
);}

NavHeader.propTypes = {
collapsed: PropTypes.bool.isRequired,
};
NavHeader.defaultProps = {};

export default NavHeader;


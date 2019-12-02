import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { useAuth } from 'context/auth';
import ProfileAvatar from 'components/profile/ProfileAvatar'


function NavHeader ({ collapsed }) {
    const { authData } = useAuth()

    const [user, setUser] = React.useState(authData.user)
    React.useEffect(() => { setUser(authData.user) }, [authData.user]); 
    
    const [profile, setProfile] = React.useState(authData.profile)
    React.useEffect(() => { setProfile(authData.profile) }, [authData.profile]); 

    return (
    <React.Fragment>
        <div style={{ padding: collapsed ? 8 : 16, transition: '0.3s' }}>
            <ProfileAvatar 
                profile={profile}
                type='nav'
                collapsed={collapsed}/>
            <div style={{ paddingBottom: 16 }} />
            {collapsed ?
            <React.Fragment>
                <Typography variant={'h6'} noWrap>
                    {profile? profile.first_name: 'pending'}
                </Typography>
                <Typography color={'textSecondary'} noWrap gutterBottom>
                    Maisonnée {user? user.last_name : 'pending'}
                </Typography>
                </React.Fragment>
            :''}
        </div>
        <Divider />
    </React.Fragment>
);}

NavHeader.propTypes = {
    collapsed: PropTypes.bool.isRequired,
};
NavHeader.defaultProps = {};

export default NavHeader;


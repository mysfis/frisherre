import React from 'react';
import { storiesOf } from '@storybook/react';
import Avatar from 'components/user/Avatar'

const userWithAvatar = {
    id: 1,
    email: 'jitewaboh@lagify.com',
    isDriving:false,
};

const AvatarIsDriving = {
    id: 2,
    email: 'jitewaboh@lagify.com',
    size: 'big',
    
};

storiesOf('Avatar', module)
    .add('basic', () => 
        <div>
            <Avatar user={{...userWithAvatar}} size='small' />
            <Avatar user={{...userWithAvatar}} size='medium' />
            <Avatar user={{...userWithAvatar}} size='big' />
        </div>
    )
    .add('driving', () => 
        <div>
            No: <Avatar user={{...userWithAvatar,}} />
            Yes: <Avatar user={{...userWithAvatar, is_driver:true}} />
        </div>)
    .add('attending', () => 
        <div>
            default: <Avatar user={{...userWithAvatar,}} />
            Yes: <Avatar user={{...userWithAvatar, is_participant:true}} />
            No: <Avatar user={{...userWithAvatar, is_participant:false}} />
        </div>)
    .add('activity', () => 
        <div>
            default: <Avatar user={userWithAvatar} />
            Yes: <Avatar user={userWithAvatar} icon="football"/>
            No: <Avatar user={userWithAvatar} />
        </div>)
    .add('anonymous', () => <Avatar />);

import React from 'react';
import { storiesOf } from '@storybook/react';

// import ProfileCard from 'components/profile/ProfileCard'
import ProfileGrid from 'containers/profile/ProfileGrid'
import {outingMockData} from 'containers/profile/ProfileMockData'


storiesOf('Profiles', module)
    .add('List', () => <ProfileGrid scheduleData={outingMockData} />)
    // .add('Empty Card', () => <ProfileCard outing={outingMockData[0]} />)

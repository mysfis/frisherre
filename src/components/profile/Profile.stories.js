import React from 'react';
import { storiesOf } from '@storybook/react';

// import ProfileCard from 'components/profile/ProfileCard'
import ProfileGrid from 'components/profile/ProfileGrid'
import {mockData} from 'components/profile/ProfileMockData'


storiesOf('Profiles', module)
    .add('Grid default', () => <ProfileGrid profiles={mockData} />)
    // .add('Empty Card', () => <ProfileCard outing={outingMockData[0]} />)

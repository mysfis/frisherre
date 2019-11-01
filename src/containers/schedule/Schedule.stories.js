import React from 'react';
import { storiesOf } from '@storybook/react';

import MyView1 from 'containers/schedule/MyView1'
import MyView2 from 'containers/schedule/MyView2'
import HouseholdView from 'containers/schedule/HouseholdView'

import {scheduleMockData} from './ScheduleMockData'

storiesOf('Schedule', module)
    .add('MyView2', () => <MyView2 scheduleData={scheduleMockData} />)
    .add('MyView1', () => <MyView1 scheduleData={scheduleMockData} />)
    .add('HouseholdView', () => <HouseholdView scheduleData={scheduleMockData} />)

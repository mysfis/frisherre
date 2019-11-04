import React from 'react';
import { storiesOf } from '@storybook/react';

import MyView1 from 'containers/outing/MyView1'
import OutingCard from 'components/outing/OutingCard'
import Outing from 'containers/outing/OutingView'
import HouseholdView from 'containers/outing/HouseholdView'

import {outingMockData} from '././OutingMockData'

storiesOf('Outing', module)
    .add('List', () => <Outing scheduleData={outingMockData} />)
    .add('Empty Card', () => <OutingCard outing={outingMockData[0]} />)
    .add('Accepted Card', () => <OutingCard outing={outingMockData[1]} />)
    .add('Declined Card', () => <OutingCard outing={outingMockData[2]} />)
    .add('MyView1', () => <MyView1 scheduleData={outingMockData} />)
    .add('HouseholdView', () => <HouseholdView scheduleData={outingMockData} />)

import React from 'react';
import { storiesOf } from '@storybook/react';

import OutingCard from 'components/outing/OutingCard'
import Outing from 'components/outing/OutingView'

import {outingMockData} from '././OutingMockData'

storiesOf('Outing', module)
    .add('List', () => <Outing scheduleData={outingMockData} />)
    .add('Empty Card', () => <OutingCard outing={outingMockData[0]} />)
    .add('Accepted Card', () => <OutingCard outing={outingMockData[1]} />)
    .add('Declined Card', () => <OutingCard outing={outingMockData[2]} />)

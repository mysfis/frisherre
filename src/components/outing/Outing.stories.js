import React from 'react';
import { storiesOf } from '@storybook/react';

import OutingCard from 'components/outing/OutingCard'
import OutingGrid from 'components/outing/OutingGrid'

import {outingMockData} from '././OutingMockData'

storiesOf('Outing', module)
    .add('List', () => <OutingGrid scheduleData={outingMockData} />)
    .add('Empty Card', () => <OutingCard outing={outingMockData[0]} />)
    .add('Accepted Card', () => <OutingCard outing={outingMockData[1]} />)
    .add('Declined Card', () => <OutingCard outing={outingMockData[2]} />)

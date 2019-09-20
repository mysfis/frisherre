import React from 'react';
import { Nav } from 'mui-layout';
import NavHeaderEx from '../containers/NavHeaderEx';
import NavRouterEx from '../containers/NavRouterEx';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

export default function CustomNav ({props}) {
  return (
    <Nav
      renderIcon={collapsed =>
        collapsed ? <ChevronRight /> : <ChevronLeft />
      }
      header={({ collapsed }) => <NavHeaderEx collapsed={collapsed} />}
    >
    {({ setOpened }) => <NavRouterEx setOpened={setOpened} />}
    </Nav>
  )
}

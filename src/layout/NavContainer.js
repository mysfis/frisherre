import React from 'react';
import { Nav } from 'mui-layout';
import NavHeader from './NavHeader';
import NavRouter from './NavRouter';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

export default function NavContainer ({props}) {
  return (
    <Nav
      renderIcon={collapsed =>
        collapsed ? <ChevronRight /> : <ChevronLeft />
      }
      header={({ collapsed }) => <NavHeader collapsed={collapsed} />}
    >
    {({ setOpened }) => <NavRouter setOpened={setOpened} />}
    </Nav>
  )
}

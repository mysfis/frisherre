import React from 'react'
import { makeStyles } from '@material-ui/styles';

import { Header,} from 'mui-layout';
import MenuRounded from '@material-ui/icons/MenuRounded';
import HeaderAnonComponent from './HeaderAnonComponent';

const useHeaderStyles = makeStyles(({ palette, spacing }) => ({
  header: {
    backgroundColor: palette.primary.light,
    color: palette.common.white,
  },
  menuBtn: {
    padding: spacing(2.5),
    borderRadius: 0,
  },
  icon: {
    color: palette.common.white,
  },
  toolbar: {
    padding: spacing(0, 1),
  },
}));

export default function HeaderAnonContainer() {
  const {
    icon: iconCss,
    header: headerCss,
  } = useHeaderStyles();
  return (
    <Header
      classes={{ root: headerCss }}
      renderMenuIcon={() => <MenuRounded />}
    >
      {({ screen, collapsed }) => (
        <HeaderAnonComponent screen={screen} collapsed={collapsed} classIcon={{ root: iconCss }}/>
      )}
    </Header>
  )
}

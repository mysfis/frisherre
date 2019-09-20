import React from 'react'
import { makeStyles } from '@material-ui/styles';

import { Header,} from 'mui-layout';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import MenuRounded from '@material-ui/icons/MenuRounded';
import HeaderUser from '../containers/HeaderUser';

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

export default function CustomHeader(props) {
  const {
    icon: iconCss,
    toolbar: toolbarCss,
    header: headerCss,
    menuBtn: menuBtnCss,
  } = useHeaderStyles();
  return (
    <Header
      classes={{ root: headerCss }}
      renderMenuIcon={open => (open ? <ChevronLeft /> : <MenuRounded />)}
    >
      {({ screen, collapsed }) => (
        <HeaderUser screen={screen} collapsed={collapsed} classIcon={{ root: iconCss }} />
      )}
    </Header>
  )
}

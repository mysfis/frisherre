import React from 'react'

import { Header,} from 'mui-layout';
import HeaderUserComponent from 'layout/header/HeaderUserComponent';

import { makeStyles } from '@material-ui/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import MenuRounded from '@material-ui/icons/MenuRounded';

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

export default function HeaderUserContainer(props) {
  const {
    icon: iconCss,
    header: headerCss,
  } = useHeaderStyles();
  return (
    <Header
      classes={{ root: headerCss }}
      renderMenuIcon={open => (open ? <ChevronLeft /> : <MenuRounded />)}
    >
      {({ screen, collapsed }) => (
        <HeaderUserComponent screen={screen} collapsed={collapsed} classIcon={{ root: iconCss }} />
      )}
    </Header>
  )
}

import React from "react";
import { Link } from "@reach/router"

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import { navigate } from "@reach/router"


const list = [
  {
    primaryText: "A propos",
    icon: "star",
    to: "/"
  },
  {
    primaryText: "Mon planning",
    icon: "schedule",
    to: "/schedule"
  },
  {
    primaryText: "Ma Maisonnée",
    icon: "people",
    to: "/login"
  },
];
const NavRouterEx = ({ setOpened }) => (
  <List>
    {list.map(({ primaryText, icon, to }, i) => (
      <ListItem
        key={primaryText}
        // selected={i === 0}
        button={!!to}
        component={to ? Link : "div"}
        {...!!to && { to }}
        onClick={() => setOpened(false)}
      >
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText
          primary={primaryText}
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>
    ))}
    <Divider style={{ margin: "12px 0" }} />
    <ListItem
      button
      onClick={() => {navigate('/myprofile');setOpened(false);}}>
      <ListItemIcon>
        <Icon>settings</Icon>
      </ListItemIcon>
      <ListItemText
        primary={"Mon compte"}
        primaryTypographyProps={{ noWrap: true }}
      />
    </ListItem>
  </List>
);

NavRouterEx.propTypes = {};
NavRouterEx.defaultProps = {};

export default NavRouterEx;

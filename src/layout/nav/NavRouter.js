import React from "react";
import { Link, navigate } from "@reach/router"

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";


const list = [
  {
    primaryText: "A propos",
    icon: "star",
    to: "/"
  },
  {
    primaryText: "Mon planning",
    icon: "schedule",
    to: "/outings"
  },
  {
    primaryText: "Ma Maisonnée",
    icon: "people",
    to: "/profiles"
  },
  {
    primaryText: "Communautés",
    icon: "work",
    to: "/communities"
  },
  {
    primaryText: "Terminé",
    icon: "delete",
    to: "/household"
  }
];
const NavRouter = ({ setOpened }) => (
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
      onClick={() => {navigate('/myaccount');setOpened(false);}}>
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

NavRouter.propTypes = {};
NavRouter.defaultProps = {};

export default NavRouter;

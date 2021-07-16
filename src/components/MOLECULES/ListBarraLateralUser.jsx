import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PeopleIcon from "@material-ui/icons/People";
import PublicIcon from "@material-ui/icons/Public";
import BusinessIcon from "@material-ui/icons/Business";
import TimelineIcon from "@material-ui/icons/Timeline";
import { NavLink } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  color: {
    color: "#F7F9FC",
  },
  top: {
    position: "relative",
    top: 50,
  },
  whiteDiver: {
    backgroundColor: "white",
  },
}));

const ListBarraLateralUser = ({ active }) => {
  const classes = useStyle();
  return (
    <div className={classes.color}>
      <List component="ul">
        <NavLink to="/contacts" className={`${classes.color}`}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon className={`${classes.color}`} />
            </ListItemIcon>
            <ListItemText className={`${classes.color}`}>
              Contactos
            </ListItemText>
          </ListItem>
        </NavLink>

        <NavLink to="/countries" className={`${classes.color}`}>
          <ListItem button>
            <ListItemIcon>
              <PublicIcon className={`${classes.color}`} />
            </ListItemIcon>
            <ListItemText className={`${classes.color}`}>
              Región/País
            </ListItemText>
          </ListItem>
        </NavLink>

        <NavLink to="/company" className={`${classes.color}`}>
          <ListItem button>
            <ListItemIcon>
              <BusinessIcon className={`${classes.color}`} />
            </ListItemIcon>
            <ListItemText className={`${classes.color}`}>
              Compañías
            </ListItemText>
          </ListItem>
        </NavLink>

        <Divider className={`${classes.whiteDiver}`} />

        <NavLink to="/analitycs" className={`${classes.color}`}>
          <ListItem button>
            <ListItemIcon>
              <TimelineIcon className={`${classes.color}`} />
            </ListItemIcon>
            <ListItemText className={`${classes.color}`}>
              Analitycs
            </ListItemText>
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
};

export default ListBarraLateralUser;

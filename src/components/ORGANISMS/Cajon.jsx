import React from "react";
import ListBarraLateralUser from "../MOLECULES/ListBarraLateralUser";
import { makeStyles, Drawer } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    displa: "flex",
  },
  tolbar: 50,
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    top: 50,
    width: 240,
    background: "#1b2831",
  },
}));

const Cajon = () => {
  const classes = useStyle();
  return (
    <div className={`${classes.root}`}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <ListBarraLateralUser />
      </Drawer>
    </div>
  );
};

export default Cajon;

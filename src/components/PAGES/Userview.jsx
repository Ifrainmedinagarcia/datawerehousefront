import React from "react";
import NavbarUser from "../MOLECULES/NavbarUser";
import Cajon from "../ORGANISMS/Cajon";
import Tables from "../ORGANISMS/Tables";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
    paddingLeft: 300,
    position: "relative",
    top: 30,
    marginBottom: 20,
  },
}));

const Userview = () => {
  const classes = useStyle();

  return (
    <>
      <NavbarUser />
      <Cajon />
      <main className={classes.content}>
        <Tables />
      </main>
    </>
  );
};

export default Userview;

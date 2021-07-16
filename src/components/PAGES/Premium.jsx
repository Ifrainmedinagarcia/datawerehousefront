import React from "react";
import NavbarUser from "../MOLECULES/NavbarUser";
import Cajon from "../ORGANISMS/Cajon";
import { makeStyles } from "@material-ui/core";
import Cardprice from "../MOLECULES/Cardprice";

const useStyle = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexGrow: 1,
    padding: theme.spacing(10),
    paddingLeft: 300,
    position: "relative",
    justifyContent: "center",
    top: 120,
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    position: "relative",
    width: 500,
    top: 100,
  },
  containerText: {
    width: 300,
    position: "relative",
    margin: "auto",
  },
}));

const Premium = () => {
  const classes = useStyle();
  return (
    <>
      <NavbarUser />
      <Cajon />
      <div className={classes.containerText}>
        <h1 className={classes.text}>
          ¡Hazte premium y disfruta de todos los beneficios!
        </h1>
      </div>
      <main className={classes.content}>
        <Cardprice
          plan="BASIC"
          price="$0/m"
          benef1="Gestión de contactos"
          benef2="Clasifica según interés"
          benef3="10 contactos nuevo por día"
          link="/analitycs"
        />
        <Cardprice
          plan="PREMIUM"
          price="$100/m"
          benef1="Incluye ambos planes"
          benef2="Contactos ilimitados"
          benef3="Analitycs full"
          scale="scale"
          link="/analitycs"
        />
        <Cardprice
          plan="MEDIUM"
          price="$90/m"
          benef1="Todo del plan BASIC"
          benef2="100 contactos nuevos por día"
          benef3="Funciones de analytics básicas"
          link="/analitycs"
        />
      </main>
    </>
  );
};

export default Premium;

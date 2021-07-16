import React from "react";
import Numberstatistics from "../MOLECULES/Numberstatistics";

const Statistics = () => {
  return (
    <section className=" container__statistics">
      <div className="container__statistics__flex">
        <Numberstatistics number="+80%" benef="Productividad" />
        <Numberstatistics number="+60%" benef="Nuevos clientes" />
        <Numberstatistics number="+90%" benef="Más organizado" />
      </div>
    </section>
  );
};

export default Statistics;

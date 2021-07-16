import React from "react";

const Numberstatistics = ({ number, benef }) => {
  return (
    <div className="container__statistics__item">
      <p className="porcentaje">{number}</p>
      <p className="beneficios">{benef}</p>
    </div>
  );
};

export default Numberstatistics;

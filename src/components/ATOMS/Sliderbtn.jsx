import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "97%",
  },
  display: {
    marginRight: 25,
  },
});

const marks = [
  {
    value: 4,
    label: "25%",
  },
  {
    value: 14,
    label: "50%",
  },
  {
    value: 24,
    label: "75%",
  },
  {
    value: 34,
    label: "100%",
  },
];

function valuetext(value) {
  return `${value}%`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

const Sliderbtn = ({ name, defaultValue }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.root} ${classes.display}`}>
      Nivel de interés
      <Slider
        name={name}
        min={0}
        max={34}
        defaultValue={defaultValue || 4}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Sliderbtn);

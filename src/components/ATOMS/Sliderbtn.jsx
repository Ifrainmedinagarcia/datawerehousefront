import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        width: '97%',
    },
    display: {
        marginRight: 25

    }
});

const marks = [

    {
        value: 25,
        label: '25%',
    },
    {
        value: 50,
        label: '50%',
    },
    {
        value: 75,
        label: '75%',
    },
    {
        value: 100,
        label: '100%',
    },
]

function valuetext(value) {
    return `${value}%`;
}

function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1
}

const Sliderbtn = () => {
    const classes = useStyles();
    return (
        <div className={`${classes.root} ${classes.display}`}>
            Nivel de interés
            <Slider
                name='sliderCommitment'
                defaultValue={25}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
            />
        </div>
    );
}

const mapStateToProps = state => ({

})


export default connect(mapStateToProps, {})(Sliderbtn)


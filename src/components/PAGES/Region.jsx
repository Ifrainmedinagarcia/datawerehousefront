import React from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import { makeStyles } from '@material-ui/core'
import AcordionRegion from '../ATOMS/AcordionRegion'
import { Button } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
    root: {
        width: '80%',
        position: 'relative',
        margin: 'auto'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(10),
        paddingLeft: 300,
        position: 'relative',
        justifyContent: 'center',
        top: 50,
        marginBottom: 20,

    },
    margin: {
        marginBottom: 20
    },
    color: {
        color: '#F7F9FC'
    },
    top: {
        position: 'relative',
        top: 30,
        left: '72%'
    }
}))


const Region = () => {
    const classes = useStyle()
    return (
        <>
            <NavbarUser />
            <Cajon />
            <main className={`${classes.content} ${classes.root}`}>
                <Button className={`btn__card__agregar ${classes.color} ${classes.top}`} variant="text">
                    Agregar
                </Button>
                <h3 className={classes.margin}>Región/País</h3>
                <AcordionRegion />
                <AcordionRegion />
                <AcordionRegion />
            </main>
        </>
    )
}

export default Region

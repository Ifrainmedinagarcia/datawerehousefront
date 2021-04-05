import React from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import { makeStyles } from '@material-ui/core'
import AcordionRegion from '../ATOMS/AcordionRegion'
import { connect } from 'react-redux';
import store from '../../REDUX/store'
import { getAllRegions } from '../../REDUX/actionsCreators'
store.dispatch(getAllRegions())

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


const Region = ({ regions }) => {
    const classes = useStyle()
    return (
        <>
            <NavbarUser />
            <Cajon />
            <main className={`${classes.content} ${classes.root}`}>
                <h3 className={classes.margin}>Región/País</h3>

                {
                    regions.length !== 0 ?
                        regions.map(r => (
                            <AcordionRegion
                                key={r.id_region}
                                idRegion={r.id_region}
                                labelRegion={r.name_region}
                                countries={r.Paises}
                            />
                        ))
                        : <AcordionRegion />
                }

            </main>
        </>
    )
}


const mapStateToProps = state => ({
    regions: state.regionReducer.regions
})

export default connect(mapStateToProps, {})(Region)


import React from 'react'
import { makeStyles } from '@material-ui/core'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import TableCompany from '../ORGANISMS/TableCompany'


const useStyle = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(10),
        paddingLeft: 300,
        position: 'relative',
        top: 30,
        marginBottom: 20,

    }
}))

const Company = () => {
    const classes = useStyle()
    return (
        <>
            <NavbarUser />
            <Cajon />
            <main className={classes.content}>
                <TableCompany />
            </main>
        </>
    )
}

export default Company

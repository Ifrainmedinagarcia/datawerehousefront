import React from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import Tables from '../ORGANISMS/Tables'
import { makeStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import store from '../../REDUX/store'
import { getAllContacts } from '../../REDUX/actionsCreators'


store.dispatch(getAllContacts())


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


const Userview = ( { contacts } ) => {
    const classes = useStyle()
    console.log(contacts)
    const [rows, setRows] = React.useState(contacts)

    return (
        <>
            <NavbarUser />
            <Cajon />
            <main className={classes.content}>
                <Tables 
                    contacts={rows}
                />
            </main>
        </>
    );
}

const mapStateToProps = state => ({
    contacts: state.contactsReducer.contacts

})


export default connect(mapStateToProps, {})(Userview)



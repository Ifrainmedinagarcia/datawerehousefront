import React, { useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../../REDUX/store'
import { getUserByid } from '../../REDUX/actionsCreators'


const useStyles = makeStyles({
    tamaño: {
        width: 30,
        height: 30
    }, color: {
        color: 'black'
    },
})

const NavbarUser = ({ users }) => {
    const classes = useStyles()

    useEffect(() => {
        store.dispatch(getUserByid())
    }, [])
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const cerrarSesion = () => {
        setAnchorEl(null);
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('welcome')
        window.location = '/'
    }
    return (

        <header className="header__flex">
            <figure>
                <img className="img__navbar" src="https://favicontidyup.s3-sa-east-1.amazonaws.com/logodata.png" alt="" />
            </figure>
            <nav className="nav__container">
                <ul className="nav__container__lists__flex">
                    <IconButton aria-label="" onClick={handleClick}>
                        {
                            users.Photo ?
                                <Avatar className={classes.tamaño} alt="Remy Sharp" src={users.Photo.urlPhoto_contact} />
                            : <Avatar className={classes.tamaño} alt="Remy Sharp" src='https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png' />
                        }
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {
                            users.Photo ?
                                <Link to={{
                                    pathname: '/profile',
                                    urlPhoto: users.Photo.urlPhoto_contact,

                                }} className={`${classes.color}`}>
                                    <MenuItem onClick={handleClose}>Perfil</MenuItem>
                                </Link>

                                : <Link to='/profile' className={`${classes.color}`}>
                                    <MenuItem onClick={handleClose}>Perfil</MenuItem>
                                </Link>
                        }
                        <MenuItem onClick={cerrarSesion}>Cerrar Sesión</MenuItem>
                    </Menu>
                </ul>
            </nav>
        </header>
    )
}

const mapStateToProps = state => ({
    users: state.usersReducer.users
})

export default connect(mapStateToProps, {})(NavbarUser)
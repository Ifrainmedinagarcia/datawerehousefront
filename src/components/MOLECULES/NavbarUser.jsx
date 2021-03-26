import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    tamaño: {
        width: 30,
        height: 30
    }, color: {
        color: 'black'
    },
})



const NavbarUser = () => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (

        <header className="header__flex">
            <figure>
                <img className="img__navbar" src="https://favicontidyup.s3-sa-east-1.amazonaws.com/logodata.png" alt="" />
            </figure>
            <nav className="nav__container">
                <ul className="nav__container__lists__flex">
                    <IconButton aria-label="" onClick={handleClick}>
                        <Avatar className={classes.tamaño} alt="Remy Sharp" src="https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png" />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >

                        <NavLink to='/profile' className={`${classes.color}`}>
                            <MenuItem onClick={handleClose}>Perfil</MenuItem>
                        </NavLink>
                        <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
                    </Menu>

                </ul>
            </nav>
        </header>
    )
}

export default NavbarUser

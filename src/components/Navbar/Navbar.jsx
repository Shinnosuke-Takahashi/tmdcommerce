import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import Logo from '../../Assets/Images/Logos/Store_logo.png';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ( { totalItems } ) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color='inherit'>
                        <img src={Logo} alt="TMD Studio Store" height="25px" className={classes.image}/>
                        TMD Studio Store
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                    <div className={classes.button}>
                        <IconButton aria-label="Show Cart Items" color='inherit' component={Link} to="/cart">
                            <Badge overlap="rectangular" badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div> )}
                </Toolbar>
            </AppBar>     
        </>
    );
};

export default Navbar
import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';


import useStyles from './styles';

const NavBar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();

    

    return (
    <>
        <AppBar position='fixed' className={classes.appBar} color='inherit'>
            <Toolbar>
                <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                    <img src={logo} alt='Commerce.js' height='25
                    px' className={classes.image} />
                    Minimalist Store
                </Typography>
            
                <div className={classes.grow} />

                <div className={classes.button}>
                {location.pathname === '/' && (
                <IconButton component={Link} to='/cart' aria-label='Show cart item' color='inherit'>
                    <Badge badgeContent={totalItems} color='secondary'>
                        <ShoppingCart />
                    </Badge>
                </IconButton>
                )}
            </div>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default NavBar;
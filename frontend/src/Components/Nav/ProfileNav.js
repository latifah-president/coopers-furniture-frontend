import React from 'react';
import { NavLink } from 'react-router-dom';
import {ProfileNavWrapper, ProfileLinkContainer, } from './page-nav-styles';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        border: "1px solid green",
    },
    root: {
      flexGrow: 1,
      border: "3px solid purple",
      display: "flex",
      justifyContent: "space-around",
      width: "90%"
    },
    category: {
        color: "black",
        // fontSize: "1.2rem",
        textTransform: "uppercase"

    },
    catNav: {
        display: "flex",
        justifyContent: "space-around",
        width: "90%",
        border: "1px solid red",
        height: "20px",
        margin: "2rem 0",
    },
    toolBar: {
      display: "flex",
      // border: "1px solid blue",
      justifyContent: "space-between",
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  
    link: {
      color: "black"
    },

  hide: {
    display: "none",
  }, 
logo: {
    backgroundColor: "orange",
    height: "260px",
    borderRadius: "50%",
    width: "15%",
    textAlign: "center",
    margin: "2rem auto 0 auto",
    border: "1px solid pink",
}
  }));

const ProfileNav = () => {
    const classes = useStyles();
    const firebase_id = useSelector(state => state.user.firebase_id);
    const admin = useSelector(state => state.user.admin);
    console.log("is admin", admin)

    return (
        <Grid className={classes.root}>
            <ProfileLinkContainer>
                <NavLink className='link' activeClassName='activeRoute' exact to='/'>
                    Home
                </NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={`/profile/${firebase_id}/orders`}>
                    Orders
                </NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={admin ? `/admin/customers` : `/address`}>
                    {admin ? "Customers" : "Address"}
                </NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={admin ? `/admin/addproduct` : `/paymentmethods`}>
                    {admin ? "Add Product" : "Payment Methods"}
                </NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={`/settings`}>
                    Account Settings
                </NavLink>
            </ProfileLinkContainer>
        </Grid>
    )
};

export default ProfileNav
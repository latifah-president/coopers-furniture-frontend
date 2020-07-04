import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import {useSelector} from "react-redux";
import {Home,  AccountCircleOutlined, Work, ShoppingCart, LocalShippingOutlined, Storefront} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import Drawer from "./MobileDrawer";
import {iconColor} from "./../../GlobalStyles/styles";




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
    // position: "fixed",
    border: "1px solid green",
    bottom: 0,
    [theme.breakpoints.up("sm")]: {
        display: "none",
    }
    
  },
  appBar: {
    minHeight: 70,
    maxHeight: 70,
    borderTop: "1px solid gray",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "scroll",
    // zIndex: 1,
    position: "relative"
  },
  iconWrapper: {
      // border: "1px solid blue",
      backgroundColor: "white",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      height: "100%",
  },
  icon: {
      fontSize: "1.7rem",
      color: `${iconColor}`,
  }
}));

const MobileNav = (props) => {
  const classes = useStyles();
const firebase_id = useSelector(state => state.user.firebase_id);
const admin= useSelector(state => state.user.admin);
const agent = useSelector(state => state.user.agent);
const cart = useSelector(state => state.user.cart);

 

 
  return (
    <div className={classes.root}>
      <div className={classes.appBar}>
          <div className={classes.iconWrapper}>
              <IconButton  aria-label="home" onClick={() => props.history.push('/')}>
                  <Home className={classes.icon}/>
              </IconButton>
              <IconButton  aria-label="products" onClick={() => props.history.push('/products')}>
                  <Storefront className={classes.icon}/>
              </IconButton>
              {admin || agent ? 
            <IconButton  aria-label="store manager" onClick={() => props.history.push(`storemanager/${firebase_id}`)}>
            <Work className={classes.icon}/>
        </IconButton> : null  
            }
               <IconButton  aria-label="account" onClick={() => props.history.push(`profile/${firebase_id}`)}>
                  <AccountCircleOutlined className={classes.icon}/>
              </IconButton>
              <Badge badgeContent={cart.length}>
                <IconButton  aria-label="cart" onClick={() => props.history.push(`profile/${firebase_id}`)}>
                    <ShoppingCart className={classes.icon}/>
                </IconButton>
              </Badge>
              {admin ? 
              <Badge badgeContent={0}>
                <IconButton  aria-label="orders" onClick={() => props.history.push(admin ? `storemanager/${firebase_id}` : `profile/${firebase_id}`)}>
                    <LocalShippingOutlined className={classes.icon}/>
                </IconButton>
              </Badge> : null
              }
              <Drawer/>
          </div>
    
      </div>
      
    </div>
  );
};

export default withRouter(MobileNav);

import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import {ProfileNavWrapper, ProfileLinkContainer, } from './page-nav-styles';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, AppBar, Toolbar, CircularProgress, Button } from '@material-ui/core';
import {Home, Edit, AssignmentOutlined,   AddCircleOutline, AccountCircleOutlined, Work, ShoppingCart, LocalShippingOutlined, Storefront, Group} from '@material-ui/icons';
import { greenColor, iconColor } from '../../GlobalStyles/styles';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        border: "1px solid green",
    },
    root: {
      flexGrow: 1,
      // border: "3px solid purple",
      display: "flex",
      justifyContent: "space-around",
      width: "100%"
    },
    nav: {
      // backgroundColor: "white", 
      // boxShadow: "0 2px 5px rgba(0,0,0,.2)",
      // padding: "1rem",
      display: "flex",
      // border: "1px solid green",
      overflowX: "scroll",
      margin: "0 auto",
      width: 1000,
      paddingTop: "1rem",
      [theme.breakpoints.down("xs")]: {
        width: 900,
      }
    },
    active: {
      borderBottom: `1.5px solid ${greenColor}`
    },
    btn: {
      // border: "1px solid red",
      display: "flex",
      flexDirection: "column",
      minheight: 93,
      minWidth: 72,
      paddingTop: "9px",
      fontSize: "0.875rem",
      maxWidth: "200px",
      // background: "white",
      color: "black",
      borderRadius: 0,
      alignItems: "center",
      textDecoration: "none",
      justifyContent: "space-between",
      marginBottom: "1px solid transparent"
    },
    appBar: {
      margin: "0 auto", 
      backgroundColor: "white",
      height: 110, 
      // top: 165,
      // height: 400,
      overflowX: "auto",
      zIndex: 100,
      backgroundColor: "#f5f5f5",
      flexShrink: 0,
      flexDirection: "column",
      [theme.breakpoints.down("xs")]: {
        // top: 42,
      }
    },
    icon: {
      // border: "1px solid orange",
      fontSize: "2rem",
      marginBottom: "1.5rem",
      color: `${iconColor}`
    },
    btnGrid: {
      width: "100%",
      // overflow: "scroll",
      display: "flex",
      // border: "1px solid hotpink",
      justifyContent: "space-around",
      alignItems: "center",
    },
    span: {
      fontSize: "1.2rem",
      textTransform: "uppercase",
      fontWeight: 500,
    }
  }));

const ProfileNav = (props) => {
    const classes = useStyles();
    const firebase_id = useSelector(state => state.user.firebase_id);
    const admin = useSelector(state => state.user.admin);
    const loading = useSelector(state => state.user.loading);
    const error = useSelector(state => state.user.error);
    const agent = useSelector(state => state.user.agent);
    const loggedIn = useSelector(state => state.user.loggedIn);

    // console.log("error", error)
    // console.log("loading", loading)


    return (
        <Grid className={classes.root}>
      <AppBar position="static" className={classes.appBar}  >
      {loading  ? <CircularProgress/> : 
        <Toolbar
          // value={value}
          // onChange={handleChange}
          // variant="scrollable"
          // scrollButtons="on"
          color="primary"
          aria-label="store-manager"
          className={classes.nav}
          style={{display: "flex", justifyContent: "center", alignItems: "center"}} 
        >
                      {/* <Tab className={admin ? null : classes.hide} label="Add Product" icon={<AddCircleOutline />} {...a11yProps(0)} />
                      <Tab label="Profile &amp;  Tools" icon={<AccountCircleOutlined />} {...a11yProps(1)} />

          <Tab label="Book Order" icon={<Edit/>} {...a11yProps(2)} />
          <Tab label="My Orders" icon={<AssignmentOutlined />} {...a11yProps(3)} />

            <Tab className={admin ? null : classes.hide}  label="All Orders" icon={<AssignmentOutlined />} {...a11yProps(4)} />
            <Tab className={admin ? null : classes.hide}  label="Customers" icon={<Group />} {...a11yProps(5)} />
            <Tab className={admin ? null : classes.hide}  label="View Agents" icon={<BusinessCenterOutlined />} {...a11yProps(6)} />   */}
        
       <Grid className={classes.btnGrid}>
       <NavLink
       style={{display: "flex", flexDirection: "column"}}
        variant="contained"
        to={`${props.match.url}/settings`}
            activeClassName={classes.active}
        className={classes.btn}
        aria-label={admin || agent ? "Profile & Tools" : "Profile"}
      >
        <AccountCircleOutlined className={classes.icon}/>
            <span className={classes.span}>{admin || agent ? "Profile & Tools" : "Profile"}</span>
      </NavLink>
      {/* {admin || agent && loggedIn ?
      
      <NavLink
      activeClassName={classes.active}
       style={{display: "flex", flexDirection: "column"}}
        variant="contained"
        to={`${props.match.url}/bookorder`}
        // color="secondary"
        className={classes.btn}
        aria-label="Book Order"
      >
<Edit className={classes.icon}/>           
 <span className={classes.span}>Book Order</span>
      </NavLink> : null
    } */}
     
     {admin  && loggedIn ?
      
      <NavLink
      activeClassName={classes.active}
       style={{display: "flex", flexDirection: "column"}}
        variant="contained"
        to={`${props.match.url}/addproduct`}
        // color="secondary"
        className={classes.btn}
        aria-label="Add A Product"
      >
<AddCircleOutline className={classes.icon}/>           
 <span className={classes.span}>Add Product</span>
      </NavLink> : null
    }
      <NavLink
       style={{display: "flex", flexDirection: "column"}}
        variant="contained"
        to={`${props.match.url}/orders`}
        activeClassName={classes.active}
        // color="secondary"
        className={classes.btn}
        aria-label={admin ? "Orders" : "My Orders"}
      >
<AssignmentOutlined className={classes.icon}/>           
 <span className={classes.span}>{admin ? "Orders" : "My Orders"}</span>
      </NavLink> 
   
      {loggedIn ?
      
      <NavLink
       style={{display: "flex", flexDirection: "column"}}
        variant="contained"
        to={`${props.match.url}/cart`}
        // color="secondary"
        className={classes.btn}
        aria-label="Cart"
        activeClassName={classes.active}
      >
        <ShoppingCart className={classes.icon}/>
            <span className={classes.span}>Cart</span>
      </NavLink> : null
    }
 {admin  && loggedIn ?
      
      <NavLink
       style={{display: "flex", flexDirection: "column"}}
        variant="contained"
        to={`${props.match.url}/customers`}
        // color="secondary"
        className={classes.btn}
        aria-label="View Customers"
        activeClassName={classes.active}
      >
        <Group className={classes.icon}/>
            <span className={classes.span}>Customers</span>
      </NavLink> : null
    }
 {admin  && loggedIn ?
      
      <NavLink
       style={{display: "flex", flexDirection: "column"}}
        variant="contained"
        to={`${props.match.url}/agents`}
        // color="secondary"
        className={classes.btn}
        aria-label="View Agents"
        activeClassName={classes.active}
      >
        <Group className={classes.icon}/>
            <span className={classes.span}>Agents</span>
      </NavLink> : null
    }
       </Grid>
          
        </Toolbar>
        }
      </AppBar>
        </Grid>
    )
};

export default withRouter(ProfileNav);
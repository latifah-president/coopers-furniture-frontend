import React, {useState} from 'react';
import { Route, Switch, NavLink} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// import ProfileNav from '../../Components/Nav/ProfileNav';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Typography } from '@material-ui/core';
import CustomersPage from "./../CustomersPage/Customers";
import AddProductPage from "./../AddProductPage/AddProduct";
import UnauthorizedPage from "./../ErrorPage/Unauthorized";
import Settings from "./Settings";
import {useSelector} from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    border: "2px solid red",
    marginTop: "4rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "white"
    // color: `${fontColor}`
  },
  tabWrapper: {
    flexGrow: 1,
    width: "95%",
    backgroundColor: "transparent",
    border: "1px solid red",
  },
  heading: {
    fontSize: "1.8rem",
    margin: "2rem 0",
    // border: `2px solid purple`,
    width: "5%",
    fontWeight: 400,
    width: "100%",
    paddingLeft: "4rem",

  },
  profileNav: {
    border: "1px solid black",
    // width: "100%",
    color: "black",
    boxShadow: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    top: 426,
    zIndex: 100,
    height: 100
  // right: 0,
  },
  tabs: {
   width: "50%",
    // border: "1px solid limegreen",
    display: "flex",
    // backgroundColor: "green",

    justifyContent: "center",
    [theme.breakpoints.down('sm')]: { 
      width: "100%",
    },
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box p={5}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `profile-tabpanel-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}
const Profile = (props) => {
  const classes = useStyles();
  const firebase_id = useSelector(state => state.user.firebase_id);
  const admin = useSelector(state => state.user.admin);
  const hash = props.location.hash[1]
  const hashToNum = parseInt(hash)
  console.log("hash", hash)

  const [value, setValue] = useState(0);


  const handleChange = (event, newValue) => {
   
      setValue(newValue);
   
  };
  console.log("prams", props)
    let adminRoutes = (
      <Switch>
        <Route exact path="/admin/customers" component={CustomersPage}/>
        <Route exact path='/admin/addproduct' component={AddProductPage}/>
      </Switch>
    )
    return (
      <Grid className={classes.root}>
    
          <div className={classes.tabWrapper} >
      <AppBar className={classes.profileNav} position="fixed">
        <Tabs className={classes.tabs} value={value} onChange={handleChange} aria-label="profile tabs" variant="scrollable" scrollButtons="auto">
          {/* <Tab label="Home" {...a11yProps(0)} /> */}
          <Tab label="Orders" {...a11yProps(0)} />
          <Tab label={admin ? "Customers" : "Address"} {...a11yProps(1)} />
          <Tab label={admin ? "Add Product" : "Payment Methods"} {...a11yProps(2)} />
          <Tab label="Account Settings" {...a11yProps(3)} />

        </Tabs>
      </AppBar>
      {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel> */}
      <TabPanel value={value} index={0} id="orders">
        Orders
      </TabPanel>
      <TabPanel value={value} index={1} id={admin ? "Customers" : "Address"}>
      {admin ? <CustomersPage/> : "Address"}
      </TabPanel>

      <TabPanel value={value} index={2} id={admin ? "add products" : "Payment Methods"}>
      {admin ? <AddProductPage/> : "Payment Methods"} 
      </TabPanel>
      <TabPanel value={value} index={3} id="account settings">
        Account Settings
      </TabPanel>
    </div>
    
      </Grid> 
    )
};

export default withRouter(Profile);
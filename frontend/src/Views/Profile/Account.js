import React from 'react';
import {useSelector} from "react-redux";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddProductPage from "./../AddProductPage/AddProduct";
import CartPage from "./../Cart/Cart";
import Profile from "./../Profile/Profile";
import BookOrderPage from "./../StoreManagerPage/NewOrder";
import CustomersPage from "./../CustomersPage/Customers";
import {AddCircleOutline, Edit, Group, AccountCircleOutlined, BusinessCenterOutlined, AssignmentOutlined} from  '@material-ui/icons';
// import PhoneIcon from '@material-ui/icons/Phone';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import PersonPinIcon from '@material-ui/icons/PersonPin';
// import HelpIcon from '@material-ui/icons/Help';
// import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
// import ThumbDown from '@material-ui/icons/ThumbDown';
// import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: "scroll",
    // position: "fixed",
    margin: "0 auto",
    minHeight: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    }
  },
  hide: {
    display: "none"
  },
  tabs: {
    // border: "1px solid red",
    display: "flex",
    justifyContent: "center"
  },
  appBar: {
    margin: "0 auto", 
    backgroundColor: "white", 
    top: 165,
    [theme.breakpoints.down("xs")]: {
      top: 42,
    }
  },
  box: {
    marginTop: "4.7rem",
    // border: "1px solid red",
    overflow: "scroll",
    [theme.breakpoints.down("xs")]: {
      marginTop: ".5rem",
      padding: "0",
      // border: "1px solid red",
    }
  }
}));







export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
const admin= useSelector(state => state.user.admin);
const loading= useSelector(state => state.user.loading);
const loggedIn = useSelector(state => state.user.loggedIn);
const error = useSelector(state => state.user.error);
console.log("value", value)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3} className={classes.box}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }
  return (

    <div className={classes.root}>
    {loggedIn ? <div>
        <AppBar position="static" className={classes.appBar}  >
      {loading || error ? <CircularProgress/> : 
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="store-manager"
          className={classes.tabs}
          style={{display: "flex", justifyContent: "center", alignItems: "center"}} 
        >
                      <Tab className={admin ? null : classes.hide} label="Add Product" icon={<AddCircleOutline />} {...a11yProps(0)} />
                      <Tab label="Profile &amp;  Tools" icon={<AccountCircleOutlined />} {...a11yProps(1)} />

          <Tab label="Book Order" icon={<Edit/>} {...a11yProps(2)} />
          <Tab label="My Orders" icon={<AssignmentOutlined />} {...a11yProps(3)} />

            <Tab className={admin ? null : classes.hide}  label="All Orders" icon={<AssignmentOutlined />} {...a11yProps(4)} />
            <Tab className={admin ? null : classes.hide}  label="Customers" icon={<Group />} {...a11yProps(5)} />
            <Tab className={admin ? null : classes.hide}  label="View Agents" icon={<BusinessCenterOutlined />} {...a11yProps(6)} />  
        
       
          
        </Tabs>
        }
      </AppBar>
      <TabPanel value={value} index={0}>
        <AddProductPage handleChange={handleChange}/>

      </TabPanel>
      <TabPanel value={value} index={1}>
      <Profile/>

      </TabPanel>
      <TabPanel value={value} index={2}>
      <BookOrderPage/>
      </TabPanel>

      <TabPanel value={value} index={3}>
          <BookOrderPage/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        <CustomersPage/>
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
      
    </div> : null}
   
     
    
    </div>
   
  );
}


// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import {Switch, Route, withRouter} from "react-router-dom";
// import AddProductPage from "./../AddProductPage/AddProduct";
// import NewOrderPage from "./../StoreManagerPage/NewOrder";
// import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import Drawer from "./../../Components/Admin/Drawer";

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     //  border: "1px solid orange",
//     width: "100%",
    
//   },
//   appBar: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   // necessary for content to be below app bar
//   toolbar: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing(3),
//   },
// }));


// const AdminConsole = (props) => {
//     const classes = useStyles()
//     return (
//         <Drawer>
//           <div className={classes.root}>
//             {/* <Switch> */}
//             <Route path={`${props.match.path}/admin/addproduct`} exact={true} component={AddProductPage} />
//             <Route path={`${props.match.path}/bookorder`} exact={true} component={NewOrderPage} />

//             {/* </Switch> */}

//           </div>

//         </Drawer>
 
//     )
// };

// export default withRouter(AdminConsole);
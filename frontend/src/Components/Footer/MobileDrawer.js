import React, {useState} from 'react';
import {withRouter, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {auth} from '../../firebaseConfig';
import {logOut} from '../../Store/Actions/users';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/icons/Menu';
import { AccountCircle, ExitToApp, LockOpen, Storefront, Home, Phone, HelpOutline } from '@material-ui/icons';
import {categories, iconColor, } from "./../../GlobalStyles/styles";

const useStyles = makeStyles({
    drawer: {
        // border: "1px solid red"
    },
  list: {
    width: 250,
  },
  fullList: {
    width: '100%',
    // border: "1px solid red"
  },
  listItem: {
    //   border: "1px solid red"
  },
  listItemText: {
    // border: "1px solid green",
    textTransform: "capitalize",
    color: `${iconColor}`
},
listItemIcon: {
    color: `${iconColor}`
}
});

 const MobileDrawer = (props) => {
  const classes = useStyles();
  const [state, setState] = useState(false);
  const firebase_id = useSelector(state => state.user.firebase_id);
const loggedIn = useSelector(state => state.user.loggedIn);

const dispatch = useDispatch();

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(!state);
  };

  const logout = () => {
    auth.signOut()
      dispatch(logOut())
    props.history.push("/");
    console.log('clicked')
    
  };

 

  const list = [
    {
      label: 'Home',
      icon: <Home/>,
      link: "/"
    },
    {
        label: "Shop all products",
        icon:  <Storefront/>,
        link: '/products',
    },
    {
        label: loggedIn ? 'Account' : "Create an Account",
        icon: <AccountCircle/>,
        link: loggedIn ? `${`/profile/${firebase_id}`}/settings` : '/register'
    },
    // {
    //     label: loggedIn ? 'Logout' : "Login",
    //     icon:  loggedIn ? <ExitToApp/> : <LockOpen/>,
    //     link: loggedIn ? logout : "/signin",
    // },
    {
        label: "Frequently Asked Questions",
        icon:  <HelpOutline/>,
        link: "/faq",
    },
    {
        label: "Contact Us",
        icon:  <Phone/>,
        link: "/contact",
    },
   
]



  return (
    <div className={classes.drawer}>
        <div >
          <Button aria-label="menu" onClick={toggleDrawer(true)}><Menu /></Button>
          <Drawer  open={state} onClose={toggleDrawer( false)} >
          <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer( false)}
    >
      <List>
        {list.map((item, index) => (
          <ListItem button aria-label={item.label} key={item.label} onClick={() => props.history.push(item.link)}>
            <ListItemIcon className={classes.listItemIcon} >{item.icon}</ListItemIcon>
            <ListItemText className={classes.listItemText}  primary={item.label} />
          </ListItem>
        ))}
        {loggedIn ? <ListItem button aria-label= 'Logout'  onClick={logout}>
        <ListItemIcon className={classes.listItemIcon} ><ExitToApp/> </ListItemIcon>
            <ListItemText className={classes.listItemText}  primary='Logout'/>
          </ListItem> : 
          
          
          <ListItem button aria-label= 'Login'  onClick={() => props.history.push("/signin")}>
          <ListItemIcon className={classes.listItemIcon} ><LockOpen/></ListItemIcon>
              <ListItemText className={classes.listItemText}  primary="Login" />
            </ListItem>
          
          } 
        
      </List>
      <Divider />

      <List className={classes.sub}>
      <ListItem >
      <ListItemText className={classes.subMenuText} primary="Shop By Department"/>
      {/* {openMenu ? <IconExpandLess /> : <IconExpandMore />} */}
      </ListItem>
      {/* <Collapse in={openMenu} timeout="auto" unmountOnExit> */}
        {/* <Divider /> */}
        {/* <List component="div" disablePadding> */}
        {categories.map((category, index) => (
          <ListItem className={classes.listItem} component={ Link }  key={category}  to={`/product/?col=category&filter=${category}`}>
            <ListItemText className={classes.listItemText} inset primary={category} />
          </ListItem>
        ))}
    </List>
    </div>
          </Drawer>
        </div>
     
    </div>
  );
};

export default withRouter(MobileDrawer);

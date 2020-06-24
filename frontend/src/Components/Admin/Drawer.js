import React from 'react';
import {useSelector} from "react-redux";
import {Link, NavLink, withRouter} from "react-router-dom";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import StoreIcon from '@material-ui/icons/Store';
import CircularProgress from '@material-ui/core/CircularProgress';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: "100%",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    top: 164.4,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    top: 50,
    // zIndex: 2
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'scroll',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    [theme.breakpoints.down('xs')]: {
      height: 520,
      top: 50
    },
    // height: "70%",
    top: 166,
    // zIndex: 4,
    // border: "1px solid red"

  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    // border: "1px solid red"

  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
}));



const MiniDrawer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const firebase_id = useSelector(state => state.user.firebase_id);
  const loading = useSelector(state => state.user.loading);

  console.log("prams", props.match.path)

  const menuItems = [
    {
      name: "Agent Profile",
      link: `${props.match.url}/agentprofile/`,
      icon: <AccountCircle/>
    },
    {
      name: "Book An Order",
      link: `${props.match.url}/bookorder`,
      icon: <EditIcon/>
    },
    {
      name: "Your Orders",
      link: `${props.match.url}/agentorders`,
      icon: <InboxIcon/>
    },
    
  ];
  
  const subMenuItems = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon/>
    },
    {
      name: "View All Customers",
      link: "/admin/users",
      icon: <GroupIcon/>
    },
    {
      name: "View All Orders",
      link: `${props.match.url}/orders`,
      icon: <InboxIcon/>
    },
    {
      name: "Add Product",
      link: `${props.match.url}/admin/addproduct`,
      icon: <AddCircleOutlineIcon/>
    },
  ];
  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Store Manager
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton aria-label="open menu" onClick={handleDrawerOpen}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem component={Link} to={`${item.link}`} key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {subMenuItems.map((subItem, index) => (
            <ListItem component={Link} to={subItem.link} key={index}>
              <ListItemIcon>{subItem.icon}</ListItemIcon>
              <ListItemText primary={subItem.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {loading ? <CircularProgress/> : props.children }
            
      </main>
    </div>
  );
};

export default withRouter(MiniDrawer);

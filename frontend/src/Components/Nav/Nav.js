import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import { withRouter, NavLink } from "react-router-dom";
import { auth} from '../../firebaseConfig';
import Aux from "./../../HOC/Aux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LocalShipping from '@material-ui/icons/LocalShipping';
import MoreIcon from '@material-ui/icons/MoreVert';
import Grid  from "@material-ui/core/Grid";
import {logOut} from '../../Store/Actions/users';
import MobileNav from "./MobileNav";
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // border: "1px solid orange",
    height: "60px"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
    // border: "4px solid red",
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down('sm')]: { 
      justifyContent: "flex-start",
    },
    maxWidth: "500px",
  },
  nav: {
    backgroundColor: "transparent",
    boxShadow: "none",
    marginTop: "3rem",
    zIndex: 100,
  },
  toolBar: {
    display: "flex",
    alignItems: "center",
    // border: "1px solid blue",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    position: "static",
  },
  icons: {
    // border: "1px solid red",    
    justifyContent: "center",
    alignItems: "center",
    // [theme.breakpoints.down('sm')]: {
    //   border: "2px solid red",
    //   flexBasis: "0"
    // }
    [theme.breakpoints.down('sm')]: {
      display: 'none',
      // border: " 1px solid red"
    },
  },
  icon: {
    color: "#374F71",
    fontSize: "1.8rem"
  }, 
  link: {
    color: "white",
    textDecoration: "none",
    // border: " 1px solid red",
    
  },
  btn: {
    color: "white",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    
},
hide: {
  display: "none",
}, 
mobileLink: {
  textDecoration: "none",
  color: "#374F71",
  border: "1px solid transparent"
},
activeMobileLink: {
  color: "orange",
  border: "1px solid #374F71"
},
sectionMobile: {
  display: 'flex',
  color: "white",
  [theme.breakpoints.up('md')]: { 
    display: 'none',
  },
  // border: "1px solid black"
},
iconBtn: {
  // border: "1px solid orange",
  display:"flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  margin: 0,
  width: "90%"
},
iconText: {
  fontSize: ".8rem",
  textDecoration: "none",
  color: "#374F71"
},
iconWrapper: {
  // border: "1px solid green",
  display: "flex",
  alignSelf: "center",
  justifyContent: "space-around",
  marginTop: "2rem",
  width: "30%",
  zIndex: 200,
  [theme.breakpoints.down('sm')]: { 
    display: 'none',
  },
},
home: {
  color: "white",
  // border: "2px solid pink",
  width: "100%",
  fontSize: "1.3rem",
  [theme.breakpoints.down('sm')]: { 
    fontSize: "1rem"
  }

},
socialMedia: {
  [theme.breakpoints.down('sm')]: { 
    display: "none",
  },
},
socialIcon: {
  color: "white",
  fontSize: "2rem",
  [theme.breakpoints.down('sm')]: { 
    fontSize: "1.5rem",
  },
},
topNav: {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#03C9B7",
  width: "100%",
  // border: "1px solid red",
  height: "60px",
  marginBottom: "1rem",
  alignItems: "center",
  padding: "0 .5rem",
  position: "fixed",
  zIndex: 100,
},
mobileMenu: {
  color: "black",
  width: "90%",
  paddding: "3"
  // border: "1px solid red",
},
menuItem: {
  padding: 0,
  width: "100%",
  border: "1px solid red"
},
deliveryCaption: {
  textAlign: "left",
  width: "50%",
  color: "white",
  // border: "1px solid red"
},
caption: {
  textAlign: "right",
  width: "100%",
  color: "white",
  marginLeft: "1.5rem",
  // border: "1px solid blue",
  [theme.breakpoints.down('sm')]: { 
    marginLeft: "2.3rem",
    textAlign: "center",
    fontSize: ".7rem"
  },
},
deliver: {
  display: "flex",
  justifyContent: "center",
  width: "35%",
  alignItems: "center",
  // border: "1px solid white"
  [theme.breakpoints.down('sm')]: { 
    display: 'none',
  },
},
deliveryIcon: {
  marginRight: "2rem",
  color: "white",
  fontSize: "2rem"
},
active: {
  color: "orange"
},
dropdown: {
  position: 'absolute',
  top: 60,
  right: 16,
  // left: 0,
  zIndex: 1,
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  width: "38%",
  // border: "1px solid red"
},
menuLink: {
  color: "#374F71",
  textDecoration: "none",
  border: "1px solid green"
},
li: {
  textDecoration: "none",
}
}));

const NavBar = (props) => {
  const classes = useStyles();
  const loggedIn = useSelector(state => state.user.loggedIn);
  const admin = useSelector(state => state.user.admin);
  const firebase_id = useSelector(state => state.user.firebase_id);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  };
 
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  const logout = () => {
    auth.signOut()
    dispatch(logOut())
    props.history.push("/");
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const profileSignUp = () => {
    {loggedIn ? props.history.push(`/profile/${firebase_id}/orders`) : props.history.push(`/register`) }
    
  }
  const loginCart = () => {
    {loggedIn? props.history.push(`/profile/${firebase_id}/cart`) : props.history.push(`/register`) }

  }
  const mobileMenuId = 'profile-mobile';
  // const renderMobileMenu = (
 

        {/* <MenuItem className={classes.mobileLink} onClick={profileSignUp}> {loggedIn ? 
          <IconButton aria-label="Account" color="inherit">
          <Badge color="inherit" style={{border: "1px solid red"}}>
            <AccountCircle/>
            <Typography className={classes.menuItemContent}>ACCOUNT</Typography>
          </Badge>
        </IconButton> :
        <Typography>CREATE ACCOUNT</Typography> }
      </MenuItem >

      <MenuItem onClick={loginCart}> {loggedIn ?
        <IconButton aria-label={admin ? "Orders" : "Cart"} color="inherit">
          { admin ? <Aux> <Badge badgeContent={11}  color="secondary"> <LocalShipping /></Badge> <Typography className={classes.menuItemContent}>Orders</Typography> </Aux> :  
          <Badge badgeContent={1}> <ShoppingCartIcon />  <Typography className={classes.menuItemContent}>CART</Typography></Badge> }
        </IconButton> : <Typography>LOGIN</Typography> }
      </MenuItem>

      <MenuItem className={classes.mobileLink}> {loggedIn ? 
        <IconButton aria-label="Logout" color="inherit" onClick={logout}>
        <Badge>
          <ExitToAppIcon/>
          <Typography className={classes.menuItemContent}>LOGOUT</Typography>
        </Badge>
      </IconButton> :
      <Typography>CONTACT</Typography> }
    </MenuItem > */}

  //);
  return (
    <Aux>
      <Grid className={classes.topNav}>
        <Grid item className={classes.socialMedia}>
          <IconButton aria-label="Facebook">
            <FacebookIcon  className={classes.socialIcon}/>
          </IconButton>
          <IconButton aria-label="Instagram">
            <InstagramIcon className={classes.socialIcon}/>
          </IconButton>
          <IconButton aria-label="Twitter">
            <TwitterIcon  className={classes.socialIcon}/>
          </IconButton>
        </Grid>
        <Grid item className={classes.title}>
          <NavLink to='/'className={classes.link} >
            <Typography className={classes.home} variant="h5"> Cooper's Home Furniture </Typography>
            <Typography  className={classes.caption} variant="caption"> POWERED BY A.R.C. LIMITED </Typography>
          </NavLink>
        </Grid>
        <Grid item className={classes.deliver}>
          <LocalShipping className={classes.deliveryIcon}/>
          <Typography className={classes.deliveryCaption} variant="caption">WE DELIVER TO THE GREATER AUSTIN AREA, KILLEEN, WACO, AND HUSTON</Typography>
        </Grid>
          <div className={classes.sectionMobile}>
            {/* <IconButton
              aria-label="menu"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            > */}
              {/* <MoreIcon onClick={handleClick}/> */}
            {/* </IconButton> */}
            <ClickAwayListener
            onClickAway={handleClickAway}
            id={mobileMenuId}
            aria-label="cart"
            aria-labelledby
      // anchorEl={mobileMoreAnchorEl}
      // anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      
      // keepMounted
      // transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      // open={isMobileMenuOpen}
      // onClose={handleMobileMenuClose}
      // className={classes.mobileMenu}
    >

<div>
        <IconButton type="button" onClick={handleClick}>
          <MoreIcon/>
        </IconButton>
        {open ? (
          
      <nav className={classes.dropdown} style={{border: "1px solid red"}}>
   
    <ul className={classes.menuItem}>
      <li className={classes.menuLink}><NavLink  to={loggedIn ? `/profile/orders${firebase_id}/orders` : `/register`} href={loginCart}>
            <Typography>{loggedIn ? `ACCOUNT` : `CREATE ACCOUNT`}</Typography>
          </NavLink></li>
        <li>
          <NavLink className={classes.menuLink} to={loggedIn ? `/profile/orders${firebase_id}/cart` : `/singin`} href={loginCart}>
            <Typography>{loggedIn ? `CART` : `LOGIN`}</Typography>
          </NavLink>
        </li>
        <li>
          <NavLink className={classes.menuLink} to='/contact'>
            <Typography>CONTACT</Typography>
          </NavLink>
        </li>
    </ul>
</nav>
        ) : null}
      </div>
      </ClickAwayListener>
          </div> 
        </Grid>
    <div className={classes.root}>
      <AppBar className={classes.nav}>
        <Toolbar className={classes.toolBar}>
          <Grid item  className={loggedIn ? classes.iconWrapper : classes.hide}>
            <NavLink className={classes.iconText} activeClassName={classes.active}  to={`/profile/${firebase_id}/orders`}>
              <IconButton aria-label="account" className={classes.iconBtn}> <AccountCircle  className={classes.icon}/> </IconButton>
            <Typography variant="button" >
                Account
              </Typography>
            </NavLink>
            <NavLink className={classes.iconText} to={admin && loggedIn ? `/profile/${firebase_id}/orders` : `/cart`}>
            <IconButton
                aria-label="cart"
                className={classes.iconBtn}
                // aria-controls={menuId}
                // aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
            >
              <Badge badgeContent={1} color="secondary">
                {admin ? <LocalShipping className={classes.icon}/> :  <ShoppingCartIcon  className={classes.icon}/>}
              </Badge> 
            </IconButton>
            <Typography variant="button"> {admin ? "Orders" :  "Cart"} </Typography>
            </NavLink>
            <NavLink className={classes.iconText} to={`/`}>
            <IconButton
                aria-label="logout"
                className={classes.iconBtn}
                // aria-controls={menuId}
                // aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
            >
              <ExitToAppIcon  className={classes.icon}/>
            </IconButton>
            <Typography variant="button">
                LogOut
              </Typography>
            </NavLink>
          </Grid>   
          {/* <Grid className={loggedIn ? classes.hide : classes.mobileMenu} item xs={"auto"}>
            <Button className={classes.btn} color="inherit" onClick={() => props.history.push("/register")}>Register</Button>
            <Button className={classes.btn}  color="inherit" onClick={() => props.history.push("/signin")}>Login</Button>
            <Button className={classes.btn} onClick={logout}>Log Out </Button>
          </Grid>  */}
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}

    </div>
    <div className={classes.log}>

    </div>
    </Aux>
  )
};

export default withRouter(NavBar);

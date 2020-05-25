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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // border: "1px solid orange",
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

  },
  toolBar: {
    display: "flex",
    alignItems: "center",
    // border: "1px solid blue",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
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
    fontSize: "2rem"
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
  fontSize: ".7rem"
},
iconWrapper: {
  // border: "1px solid green",
  display: "flex",
  alignSelf: "center",
  justifyContent: "space-around",
  marginTop: "2rem",
  width: "30%",
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
  padding: "0 .5rem"
  
},
mobileMenu: {
  color: "black",
  width: "90%",
  // border: "1px solid red",
},
menuItemContent: {
  marginLeft: "1rem"
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
  marginLeft: "3rem",
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
}
}));

const NavBar = (props) => {
  const classes = useStyles();
  const loggedIn = useSelector(state => state.user.loggedIn);
  const admin = useSelector(state => state.user.admin);
  const firebase_id = useSelector(state => state.user.firebase_id);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const dispatch = useDispatch();
  
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  };
 
  const logout = () => {
    auth.signOut()
    dispatch(logOut())
    props.history.push("/");
  };
 
  const mobileMenuId = 'profile-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className={classes.mobileMenu}
    >
      <NavLink className={classes.mobileLink} to={`/profile/${firebase_id}/orders/`}>
      <MenuItem> {loggedIn ? 
        <IconButton aria-label="Account" color="inherit">
        <Badge color="inherit">
          <AccountCircle/>
          <Typography className={classes.menuItemContent}>Account</Typography>
        </Badge>
      </IconButton> :
      <Typography>Create Account</Typography> }
    </MenuItem >
    </NavLink>
    <NavLink className={classes.mobileLink} to={`/profile/${firebase_id}/orders`}>
      <MenuItem> {loggedIn ?
        <IconButton aria-label={admin ? "Orders" : "Cart"} color="inherit">
          { admin ? <Aux> <Badge badgeContent={11}  color="secondary"> <LocalShipping /></Badge> <Typography className={classes.menuItemContent}>Orders</Typography> </Aux> :  
          <Badge> <ShoppingCartIcon />  <Typography className={classes.menuItemContent}>Cart</Typography></Badge> }
        </IconButton> : <Typography>Login</Typography> }
      </MenuItem>
    </NavLink>
      <MenuItem className={classes.mobileLink}> {loggedIn ? 
        <IconButton aria-label="Logout" color="inherit" onClick={logout}>
        <Badge>
          <ExitToAppIcon/>
          <Typography className={classes.menuItemContent}>Logout</Typography>
        </Badge>
      </IconButton> :
      <Typography>Create Account</Typography> }
    </MenuItem >
    </Menu>
  );
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
            <Typography  className={classes.caption} variant="caption"> POWERED BY A.R.C. </Typography>
          </NavLink>
        </Grid>
        <Grid item className={classes.deliver}>
          <LocalShipping className={classes.deliveryIcon}/>
          <Typography className={classes.deliveryCaption} variant="caption">WE DELIVER TO THE GREATER AUSTIN AREA, KILLEEN, AND SAN ANTONIO</Typography>
        </Grid>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div> 
        </Grid>
    <div className={classes.root}>
      <AppBar className={classes.nav} position="fixed">
        <Toolbar className={classes.toolBar}>
          <Grid item  className={loggedIn ? classes.iconWrapper : classes.hide}>
            <NavLink  to={`/profile/${firebase_id}/orders`}>
              <IconButton aria-label="profile" className={classes.iconBtn}> <AccountCircle  className={classes.icon}/> </IconButton>
            <Typography variant="button" lassName={classes.iconText}>
                Account
              </Typography>
            </NavLink>
            <NavLink  to={`/`}>
            <IconButton
                aria-label="cart"
                className={classes.iconBtn}
                // aria-controls={menuId}
                // aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
            >
              <ShoppingCartIcon  className={classes.icon}/>
             
            </IconButton>
            <Typography variant="button" lassName={classes.iconText}>
                Cart
              </Typography>
            </NavLink>
           
            <NavLink  to={`/`}>
            <IconButton
                aria-label="logout"
                className={classes.iconBtn}
                // aria-controls={menuId}
                // aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
            >
              <ExitToAppIcon  className={classes.icon}/>
             
            </IconButton>
            <Typography variant="button" lassName={classes.iconText}>
                LogOut
              </Typography>
            </NavLink>
          </Grid>   
          <Grid className={loggedIn ? classes.hide : classes.mobileMenu} item xs={"auto"}>
            <Button className={classes.btn} color="inherit" onClick={() => props.history.push("/register")}>Register</Button>
            <Button className={classes.btn}  color="inherit" onClick={() => props.history.push("/signin")}>Login</Button>
            <Button className={classes.btn} onClick={logout}>Log Out </Button>
          </Grid> 
                
        </Toolbar>
      </AppBar>
      {/* {renderMenu} */}
      {renderMobileMenu}
    </div>
    <div className={classes.log}>

    </div>
    </Aux>
  )
};

export default withRouter(NavBar);

import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { auth} from '../../firebaseConfig';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LoginIcon from '@material-ui/icons/LockOpen';
import LocalShipping from '@material-ui/icons/LocalShipping';
import MoreIcon from '@material-ui/icons/MoreVert';
import Grid  from "@material-ui/core/Grid";
import {logOut} from '../../Store/Actions/users';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Dropdown from "./CategoryNav";
import Divider from '@material-ui/core/Divider';
import Portal from '@material-ui/core/Portal';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 2,
    // border: "1px solid orange",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  icons: {
    // border: "1px solid red",    
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  icon: {
    color: "#374F71",
    fontSize: "1.8rem"
  }, 
sectionMobile: {
  display: 'flex',
  color: "white",
  // border: "1px solid red",
  [theme.breakpoints.up('md')]: { 
    display: 'none',
  },
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
  width: "30%",
  [theme.breakpoints.down('sm')]: { 
    display: 'none',
  },
},
topNav: {
  display: "flex",
  backgroundColor: "#366E82",
  width: "100%",
  alignItems: "center",
  padding: "0 .5rem",
  position: "fixed",
  zIndex: 1,
  [theme.breakpoints.down('sm')]: { 
    justifyContent: "flex-end",

  },
},
mobileMenu: {
  color: "black",
  width: "90%",
  paddding: "3",
  // border: "1px solid red",
},
deliveryCaption: {
  textAlign: "left",
  width: "100%",
  color: "white",
  // border: "1px solid red"
},
deliveryIcon: {
  marginRight: "2rem",
  color: "#F2CC7E",
  fontSize: "2rem",
},
active: {
  color: "orange"
},
dropdown: {
  position: 'fixed',
  maxWidth: 360,
  width: 300,
  top: "5.5%",
  right: '.5%',
  border: '1px solid #0C1D33',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
 zIndex: 3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  textTransform: "uppercase",
},
menuLink: {
  color: "#374F71",
  textDecoration: "none",
  // border: "1px solid green"
},
li: {
  textDecoration: "none",
},
link: {
  color: "white",
  textDecoration: "none",
  // border: " 1px solid red",
},
home: {
  color: "#0C1D33",
  // border: "2px solid pink",
  width: "100%",
  fontSize: "2rem",
  letterSpacing: 4,
  [theme.breakpoints.down('sm')]: { 
    fontSize: "1rem",
  }

},
caption: {
  textAlign: "right",
  width: "100%",
  color: "#0C1D33",
  // border: "1px solid blue",
  [theme.breakpoints.down('sm')]: { 
    marginLeft: "2.3rem",
    textAlign: "center",
    fontSize: ".7rem"
  },
},
title: {
  flexGrow: 1,
  color: "black",
  // border: "4px solid red",
  display: "flex",
  alignItems: "center",
  paddingLeft: "1rem",
  height: 100,
  width: "100%",
  marginTop: "2rem",
  backgroundColor: "#EFEAE1",
  justifyContent: "space-between",
  [theme.breakpoints.down('sm')]: { 
    justifyContent: "center",
  },
},
catNav: {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#366E82",
  width: "100%",
  // border: "1px solid red",
  height: "32px",
  alignItems: "center",
  padding: "0 .5rem",
 
},
listItem: {
  width: "100%",
  height: "150px",
  // border: "1px solid red",
  padding: 0,
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexDirection: "column"
},
listItemText: {
  width: "100%",
  // border: "1px solid green",
  listStyle: "none"
},
divider: {
  width: "100%", 
  color: "#EA4D1F",
},

'@keyframes blinker': {
  from: {opacity: 1},
  to: {opacity: 0}
},
"@keyframes drive": {
  from: {
    transform: "translate(0em,0)"
  },
  to: {
    transform: "translate(100em,0)"
  }
},
delivery: {
  // border: "1px solid red",
  width: "38%",
  display: "flex",
  alignItems: "center",
  animationName: '$drive',
  animationDuration: '12s',
  animationTimingFunction: 'linear',
  animationIterationCount:'infinite',
  [theme.breakpoints.down('sm')]: { 
    animation: "none",
    width: "100%"
  },
},
}));

const NavBar = (props) => {
  const classes = useStyles();
  const loggedIn = useSelector(state => state.user.loggedIn);
  const admin = useSelector(state => state.user.admin);
  const firebase_id = useSelector(state => state.user.firebase_id);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  const logout = () => {
    auth.signOut()
    console.log("click")
    // dispatch(logOut())
    props.history.push("/");
  };
 
  const profileSignUp = () => {
    {loggedIn ? props.history.push(`/profile/${firebase_id}/orders`) : props.history.push(`/register`) }
    
  }
  const loginCart = () => {
    {loggedIn? props.history.push(`/profile/${firebase_id}/cart`) : props.history.push(`/signin`) }
  }
  const login = () => {
    {loggedIn ? logOut() : props.history.push(`/signin`) }
  }

  return (
  <div className={classes.root}>
        <Grid className={classes.topNav}>
          <Grid className={classes.delivery}>
          <Typography className={classes.deliveryCaption} variant="caption">WE DELIVER TO THE GREATER AUSTIN AREA, KILLEEN, WACO, AND HOUSTON</Typography>
          <LocalShipping className={classes.deliveryIcon}/>
          </Grid>
          <div className={classes.sectionMobile}> 
            <ClickAwayListener
              onClickAway={handleClickAway}
              className={classes.mobileMenu} 
           > 
            <div >
              <IconButton style={{color: "#F2CC7E"}} type="button" onClick={handleClick}>
                <MoreIcon/>
              </IconButton>
                {open ? (
                    <Portal>
                      <div className={classes.dropdown}>
                       <nav aria-label="Menu" >
                        <ul className={classes.listItem}>
                          <li className={classes.listItemText}>
                            <NavLink className={classes.menuLink} to={loggedIn ? `/profile/orders${firebase_id}/orders` : `/register`} href={loginCart}>
                              <Typography>{loggedIn ? `ACCOUNT` : `CREATE ACCOUNT`}</Typography>
                            </NavLink></li>
                            <Divider  className={classes.divider}/>
                          <li className={classes.listItemText}>
                            <NavLink className={classes.menuLink} to={loggedIn ? `/profile/orders${firebase_id}/cart` : `/singin`} href={loginCart}>
                              <Typography>{loggedIn ? `CART` : `LOGIN`}</Typography>
                            </NavLink>
                          </li>
                          <Divider  className={classes.divider}/>

                          <li className={classes.listItemText}>
                            <NavLink className={classes.menuLink} to='/contact'>
                              <Typography>CONTACT</Typography>
                            </NavLink>
                          </li>
                          <Divider  className={classes.divider}/>
                        </ul>
                      </nav>
                  </div>
                  </Portal>
                ) : null}
            </div>
            </ClickAwayListener>
          </div> 
        </Grid>
        <Grid item className={classes.title}>
          <NavLink to='/'className={classes.link} >
            <Typography className={classes.home} variant="h5"> Cooper's Home Furniture </Typography>
            <Typography  className={classes.caption} variant="caption"> POWERED BY A.R.C. LIMITED </Typography>
          </NavLink>
          <Grid item  className={classes.iconWrapper}>
            <NavLink onClick={profileSignUp} className={classes.iconText} activeClassName={classes.active}  to={loggedIn ? `/profile/${firebase_id}/orders` : `/register`}>
              <IconButton aria-label="account" className={classes.iconBtn}> <AccountCircle  className={classes.icon}/> </IconButton>
              <Typography variant="button" >
                {loggedIn ? "ACCOUNT" : "CREATE ACCOUNT"}
              </Typography>
            </NavLink>
            <NavLink className={classes.iconText} to={admin && loggedIn ? `/profile/${firebase_id}/orders` : `/cart`}>
            <IconButton
                aria-label="cart"
                className={classes.iconBtn}
            >
              <Badge badgeContent={1} color="secondary">
                {admin ? <LocalShipping className={classes.icon}/> :  <ShoppingCartIcon  className={classes.icon}/>}
              </Badge> 
            </IconButton>
            <Typography variant="button"> {admin ? "Orders" :  "Cart"} </Typography>
            </NavLink>
            {loggedIn ? 
             <IconButton
                 aria-label={loggedIn ? "LOGOUT" : "LOGIN"}
                 className={classes.iconBtn}
               
             >
               <ExitToAppIcon  onClick={logout} className={classes.icon}/> 
               <Typography variant="button"> {loggedIn ? "LOGOUT" : "LOGIN"} </Typography>

             </IconButton>

         :
           <NavLink className={classes.iconText} to={`/`}>
   <IconButton
                 aria-label={loggedIn ? "LOGOUT" : "LOGIN"}
                 className={classes.iconBtn}
               
             >
           <LoginIcon  onClick={login} className={classes.icon}/>
           </IconButton>
           <Typography variant="button"> {loggedIn ? "LOGOUT" : "LOGIN"} </Typography>

           </NavLink>
          }
          </Grid>
        </Grid>
        <Grid className={classes.catNav}>
            <Dropdown/>
        </Grid>
    </div>
  )
};

export default withRouter(NavBar);
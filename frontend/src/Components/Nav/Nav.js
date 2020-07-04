import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { withRouter, NavLink, Link } from "react-router-dom";
import {auth} from '../../firebaseConfig';
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
import Dropdown from "./CategoryNav";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import {categories, iconColor, } from "./../../GlobalStyles/styles";
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import WorkIcon from '@material-ui/icons/Work';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
    top: 0,
    width: "100%",
    zIndex: 2,
    [theme.breakpoints.down('xs')]: {
      position: "fixed",
    },
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
  zIndex: 1300,
  display: 'none',
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
  width: "40%",
  
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
  minHeight: 32,
  maxWidth: "100%",
  overflow: "hidden",
  // position: "sticky",
  zIndex: 1,
  [theme.breakpoints.down('sm')]: { 
    justifyContent: "space-between",
    // border: "1px solid green"
  },
  [theme.breakpoints.down('xs')]: { 
    width: "96%",
    //  border: "1px solid green"
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
  zIndex: 14000,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  textTransform: "uppercase",
  color: `${iconColor}`
  // height: 500
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
  [theme.breakpoints.down('xs')]: { 
    color: "white"
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
  // marginTop: "2rem",
  backgroundColor: "#EFEAE1",
  justifyContent: "space-between",
  [theme.breakpoints.down('sm')]: { 
    justifyContent: "center",
  },
  [theme.breakpoints.down('xs')]: { 
    display: "none",
  },
},
catNav: {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#366E82",
  width: "100%",
  // border: "4px solid green",
  height: "32px",
  alignItems: "center",
  alignSelf: "flex-end",
  padding: "0 .5rem",
 [theme.breakpoints.down("md")]: {
  justifyContent: "flex-end",
 },
 [theme.breakpoints.down("xs")]: {
  display: "none",
 }
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
  marginBottom: "1rem",
  
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
  [theme.breakpoints.down('md')]: { 
    // border: "1px solid red",
    width: "50%",
  },
  [theme.breakpoints.down('sm')]: { 
    // border: "1px solid blue",
    // display: "none",
    animation: "none",
    width: "70%",
    marginRight: "10rem"
  },
  [theme.breakpoints.down('xs')]: { 
    // border: "1px solid orange",
    display: "none"
  },
},
subMenuText: {
  color: `${iconColor}`,
},
hide: {
  display: "none",
},
mobileHome: {
  display: "none",
  [theme.breakpoints.down("xs")]: {
    display: "flex",
    // border: "1px solid orange",
  }
},
sub: {
  marginTop: "4rem",
  [theme.breakpoints.down("xs")]: {
    marginTop: "4rem",
  }
},
nav: {
  paddingTop: "6rem",
  [theme.breakpoints.down("xs")]: {
    paddingTop: "4rem",
  }
},
portal: {
  display: "flex",
  justifyContent: 'space-around',
  // border: "1px solid red",
  width: "40%"
}
}));

const NavBar = (props) => {
  const classes = useStyles();
  const loggedIn = useSelector(state => state.user.loggedIn);
  const admin = useSelector(state => state.user.admin);
  const agent = useSelector(state => state.user.agent);
  const cart = useSelector(state => state.user.cart)
  const firebase_id = useSelector(state => state.user.firebase_id);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
// eslint-disable-next-line 
  const [anchorEl, setAnchorEl] = React.useState(null);


 
  const handleClick = () => {
    setOpen((prev) => !prev);
    // setOpen(true)
  };

 
  const logout = () => {
    auth.signOut()
      const msg = "User Signed Out Successfully"
      dispatch(logOut(msg))
    props.history.push("/");
    
  };
 
  const profileSignUp = () => {
    props.history.push(loggedIn ? `/profile/${firebase_id}` : `/register`)
  };

  const loginCart = () => {
    props.history.push(loggedIn ? `/profile/${firebase_id}/cart` : `/signin`) 
  };

  // const login = () => {
  //   {loggedIn ? logOut() : props.history.push(`/signin`) }
  // }

  const handleMenuClick = () => {
    setOpenMenu(!openMenu)
  }

  const subMenu = (
    <List className={classes.sub}>
      <ListItem aria-label={openMenu ? 'close' : "open"} button onClick={handleMenuClick}>
      <ListItemText className={classes.subMenuText} primary="Deparments"/>
      {openMenu ? <IconExpandLess /> : <IconExpandMore />}
      </ListItem>
      <Collapse in={openMenu} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          {categories.map((category) => (
            <ListItem key={category} component={ Link } to={`/product/?col=category&filter=${category}`} variant="contained" className={classes.menuItem}>
            <ListItemText className={classes.subMenuText} inset primary={category} />
          </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  )
  // const subMenu = (
  //   <List className={classes.catNav} style={{marginTop: "1rem"}}>
  //     <ListItem button  aria-label="categories menu" onClick={handleMenuClick}>
  //     <ListItemText style={{color: ` ${iconColor}`}} className={classes.listItemText} primary="Categories"/>
  //     {openMenu ? <IconExpandLess style={{color: `${iconColor}`}}/> : <IconExpandMore style={{color: `${iconColor}`}}/>}
  //     </ListItem>
  //     <Collapse in={openMenu} timeout="auto" unmountOnExit>
  //       <Divider style={{border: `1px solid ${iconColor}`, backgroundColor: `${iconColor}`}}/>
  //       <List component="div" disablePadding>
  //         {categories.map((category) => (
  //             console.log("category", category),
  //           <ListItem style={{textDecoration: "none", color: '#0C1D33'}}  key={category} component={ Link } to={`/product/category/?col=category&filter=${category}`} variant="contained" className={classes.menuItem}>
  //           <ListItemText className={classes.listItemText} inset primary={category} />
  //         </ListItem>
  //         ))}
  //       </List>
  //     </Collapse>
  //   </List>
  // )
  return (
  <div className={classes.root}>
        <Grid className={classes.topNav}>
          <Grid className={classes.delivery}>
          <Typography className={classes.deliveryCaption} variant="caption">WE DELIVER TO THE GREATER AUSTIN AREA, KILLEEN, WACO, AND HOUSTON</Typography>
          <LocalShipping className={classes.deliveryIcon}/>
          </Grid>

          <Grid className={classes.mobileHome}>
            <NavLink to='/'className={classes.link}  >
              <Typography style={{color: "white", fontSize: "1rem"}} className={classes.home} variant="h5"> Cooper's Home Furniture </Typography>
              <Typography  className={classes.caption} variant="caption"> POWERED BY A.R.C. LIMITED </Typography>
            </NavLink>
          </Grid>
         
          <div className={classes.sectionMobile}> 
         
            <div
              // onClick={handleClickAway}
              className={`${classes.mobileMenu} ${classes.sectionMobile}`}
           > 
            <div >
              <IconButton aria-label="menu" style={{color: "#F2CC7E"}} type="button" onClick={handleClick}>
                {open ? <CloseIcon/> : <MoreIcon/>}
              </IconButton>
                {open ? (
                    // <Portal>
                      <div className={open ? classes.dropdown : classes.hide}>
                       <nav aria-label="Menu" className={classes.nav}>
                        <ul className={classes.listItem} >
                        <li className={classes.listItemText}>
                            <NavLink className={classes.menuLink} to="/">
                              <Typography>HOME</Typography>
                            </NavLink></li>
                            <Divider  className={classes.divider}/>
                          <li className={classes.listItemText}>
                            <NavLink className={classes.menuLink} to={loggedIn ? `/profile/${firebase_id}` : `/register`}>
                              <Typography>{loggedIn ? `ACCOUNT` : `CREATE ACCOUNT`}</Typography>
                            </NavLink></li>
                            <Divider  className={classes.divider}/>
                            
                            {admin || agent ? 
                            <li className={classes.listItemText}>
                            <NavLink className={classes.menuLink} to={admin ? `/storemanager/${firebase_id}` : `/storemanager/${firebase_id}`}>
                              <Typography>STORE MANAGER</Typography>
                            </NavLink></li>
                             : null
                            }
                            <Divider  className={admin || agent ? classes.divider : classes.hide}/>
                          <li className={loggedIn ? classes.listItemText : classes.hide}>
                            <NavLink className={classes.menuLink} to={loggedIn  ? `/profile/orders${firebase_id}/cart`  : `/signin` } href={loginCart}>
                              <Typography>CART</Typography>
                            </NavLink>
                          </li>
                          <Divider  className={loggedIn ? classes.divider : classes.hide}/>
                         
                          <li className={loggedIn ? classes.listItemText : classes.hide}>
                            <Button aria-label="logout" style={{padding: 0}} className={classes.menuLink} onClick={logout}>
                              <Typography>LOGOUT</Typography>
                            </Button>
                          </li>
                          <Divider  className={loggedIn ? classes.divider : classes.hide}/>

                          <li className={!loggedIn ? classes.listItemText : classes.hide}>
                            <NavLink className={classes.menuLink} to='/signin'>
                              <Typography>LOGIN</Typography>
                            </NavLink>
                          </li>
                          <Divider  className={!loggedIn ? classes.divider : classes.hide}/>

                          <li className={classes.listItemText}>
                            <NavLink className={classes.menuLink} to='/contact'>
                              <Typography>CONTACT</Typography>
                            </NavLink>
                          </li>
                          <Divider  className={classes.divider}/>

                          <li className={classes.listItemText}>
                            <NavLink className={classes.menuLink} to='/portal/signin'>
                              <Typography>EMPLOYEE PORTAL</Typography>
                            </NavLink>
                          </li>
                          <Divider  className={classes.divider}/>

                          <li className={classes.listItemText}>
                            <NavLink className={classes.menuLink} to='/products'>
                              <Typography>SHOP ALL PRODUCTS</Typography>
                            </NavLink>
                          </li>
                          <Divider  className={classes.divider}/>

                        </ul>
                      </nav>
                      {subMenu}
                  </div>
                  //  </Portal>
                ) : null}
            </div>
            </div>
          </div> 
        </Grid>
        <Grid item className={classes.title}>
          <NavLink to='/'className={classes.link} >
            <Typography className={classes.home} variant="h5"> Cooper's Home Furniture </Typography>
            <Typography  className={classes.caption} variant="caption"> POWERED BY A.R.C. LIMITED </Typography>
          </NavLink>
          <Grid item  className={classes.iconWrapper}>
            {loggedIn && admin ||  agent ? 
            <NavLink onClick={profileSignUp} className={classes.iconText} activeClassName={classes.active}  to={`/storemanager/${firebase_id}`}>
            <IconButton aria-label="STORE MANAGER" className={classes.iconBtn}> <AccountCircle  className={classes.icon}/> </IconButton>
            <Typography variant="button" >
              STORE MANAGER
            </Typography>
          </NavLink>
            : 
            <NavLink onClick={profileSignUp} className={classes.iconText} activeClassName={classes.active}  to={loggedIn ? `/profile/${firebase_id}` : `/register`}>
              <IconButton aria-label={loggedIn ? "ACCOUNT" : "CREATE ACCOUNT"} className={classes.iconBtn}> <AccountCircle  className={classes.icon}/> </IconButton>
              <Typography variant="button" >
                {loggedIn ? "ACCOUNT" : "CREATE ACCOUNT"}
              </Typography>
            </NavLink> }
            <NavLink className={classes.iconText} to={loggedIn ? `profile/${firebase_id}/cart` : `/signin` }>
            <IconButton
                aria-label="cart"
                className={classes.iconBtn}
            >
              <Badge badgeContent={cart.length} color="secondary">
                 <ShoppingCartIcon  className={classes.icon}/>
              </Badge> 
            </IconButton>
            <Typography variant="button">Cart</Typography>
            </NavLink>
                  {admin || agent ? 
            <NavLink className={classes.iconText} to={admin && loggedIn ? `/storemanager/${firebase_id}` : agent && loggedIn ? `/storemanager/${firebase_id}` : `/`}>
            <IconButton
                aria-label="orders"
                className={classes.iconBtn}
            >
              <Badge badgeContent={1} color="secondary">
                 <LocalShipping className={classes.icon}/> 
              </Badge> 
            </IconButton>
            <Typography variant="button"> Orders</Typography>
            </NavLink> : null
              }
            {loggedIn ? 
            <div onClick={logout}>
              <IconButton  aria-label= "LOGOUT" className={classes.iconBtn}>
               <ExitToAppIcon   className={classes.icon}/> 
             </IconButton> 
             <Typography style={{color: `${iconColor}`}} variant="button">LOGOUT</Typography>

             
          </div> 
             :
             <div className={classes.portal} >
           <NavLink className={classes.iconText} to="/portal/signin">
            <IconButton
                aria-label="employee login"
                className={classes.iconBtn}
            >
         
                 <WorkIcon className={classes.icon}/>
             
            </IconButton>
            <Typography variant="button">PORTAL</Typography>
            </NavLink>
<div>
        <NavLink className={classes.iconText} to="/signin">
           <IconButton  aria-label= "LOGOUT" className={classes.iconBtn}>
           <LoginIcon  className={classes.icon}/> 
         </IconButton> 
         <Typography style={{color: `${iconColor}`}} variant="button">LOGIN</Typography>
         </NavLink>
         </div>
         </div>
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
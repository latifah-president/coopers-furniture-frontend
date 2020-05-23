import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import { auth} from '../../firebaseConfig';
import { NavLink, withRouter } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Header, NavWrapper, LinkContainer, Logo, PageNav, MobileLinks, MobileNav, purpleColor} from '../../GlobalStyles/styles';
import {logOut} from '../../Store/Actions/users';

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -1,
      top: 3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      color: `${purpleColor}`,
      fontSize: "1rem",
    },
  }))(Badge);

const Nav= (props) => {
    const loggedIn = useSelector(state => state.user.loggedIn);
    const firebase_id = useSelector(state => state.user.firebase_id);
    const qty = useSelector(state => state.user.cart.qty);
    const dispatch = useDispatch();

    const logout = () => {
        auth.signOut().then(res => {
            console.log("logout res: ", res)
            dispatch(logOut())
        })
        .catch(err => {
            console.log(err)
        })
        localStorage.clear();
        props.history.push("/");
      };

      const renderAdminLinks = (
          <React.Fragment className={loggedIn ? null : 'hide'}>
            <NavLink className='link' activeClassName='activeRoute' to='/addproduct'>Add Product</NavLink>
            <NavLink className='link' activeClassName='activeRoute' to='/orders'>Orders</NavLink>
            <NavLink className='link' activeClassName='activeRoute' to='/customers'>Customers</NavLink>
          </React.Fragment>
      );

      return (
        <Header>
            <NavWrapper endNav>
                <LinkContainer>
                <NavLink onClick={logout} to='/'>Sign Out</NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={loggedIn ? `/profile/${firebase_id}/orders` : '/register'}>
                    {loggedIn ? 'Account' : 'Create An Account'}
                </NavLink>
                <span className={loggedIn ? 'hide' : null}>or</span>

                <NavLink className={loggedIn ? 'hide' : 'link'} activeClassName='activeRoute' exact to='/signin'>
                        Sign In
                </NavLink>
                {renderAdminLinks}
                <IconButton aria-label="cart">
                    <StyledBadge badgeContent={qty}>
                        <ShoppingCartIcon className='icon'/>
                    </StyledBadge>
                </IconButton>
                </LinkContainer>
            </NavWrapper>
            <Logo>
                
            </Logo>

            <PageNav mobile>
                {/* <MobileLinks> */}
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/earrings'> 
                        earrings
                    </NavLink>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/necklaces'> 
                        necklaces
                    </NavLink>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/bracelets'> 
                        bracelets
                    </NavLink>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/rings'> 
                        rings
                    </NavLink>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/guypieces'> 
                        guy pieces
                    </NavLink>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/earringssets'> 
                        earring sets
                    </NavLink>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/chokers'> 
                        chokers
                    </NavLink>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/hairclips'> 
                        hairclips
                    </NavLink>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/anklets'> 
                        anklets
                    </NavLink>
            </PageNav>

            <MobileNav>
            <PageNav >
                <MobileLinks>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/earrings'> 
                        earrings
                    </NavLink>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/necklaces'> 
                        necklaces
                    </NavLink>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/bracelets'> 
                        bracelets
                    </NavLink>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/rings'> 
                        rings
                    </NavLink>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/guypieces'> 
                        guy pieces
                    </NavLink>
                </MobileLinks>

                <MobileLinks bottom>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/earringssets'> 
                        earrings sets
                    </NavLink>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/chokers'> 
                        chokers
                    </NavLink>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/hairclips'> 
                        hairclips
                    </NavLink>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/anklets'> 
                        anklets
                    </NavLink>
                </MobileLinks>
            </PageNav>
            </MobileNav>
        </Header>    
    )
};

export default withRouter(Nav);

// import React, {useState} from "react";
// import Button from "@material-ui/core/Button";
// import { withRouter, NavLink } from "react-router-dom";
// // import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import { makeStyles } from '@material-ui/core/styles';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
// import MoreIcon from '@material-ui/icons/MoreVert';
// import Grid  from "@material-ui/core/Grid";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
   
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     color: "white"
//   },
//   nav: {
//     backgroundColor: "blue"
//   },
//   toolBar: {
//     display: "flex",
//     // border: "1px solid blue",
//     justifyContent: "space-between",
//     paddingLeft: theme.spacing(3),
//     paddingRight: theme.spacing(3),
//   },
//   icons: {
//     // border: "1px solid red",    
//     justifyContent: "center",
//     alignItems: "center",
//     // [theme.breakpoints.down('sm')]: {
//     //   border: "2px solid red",
//     //   flexBasis: "0"
//     // }
//     [theme.breakpoints.down('sm')]: {
//       display: 'none',
//       // border: " 1px solid red"
//     },
//   },
//   icon: {
//     color: "white",
//     fontSize: "2rem"
//   }, 
//   link: {
//     color: "black"
//   },
//   btn: {
//     color: "white",
//     marginLeft: theme.spacing(2),
//     marginRight: theme.spacing(2),
    
// },
// hide: {
//   display: "none",
// }, 
// whiteLink: {
//   color: "white"
// },
// sectionMobile: {
//   display: 'flex',
//   [theme.breakpoints.up('md')]: { //do something when the screen reached 960px and up equivalent to max-width media query
//     display: 'none',
//   },
// },
// }));

// const NavBar = (props) => {
//   const classes = useStyles();
// //   const loggedIn = useSelector(state => state.user.loggedIn);
// //   const user_type = useSelector(state => state.user.user_type);
// //   const firebase_id = useSelector(state => state.user.firebase_id);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null)
//   };

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget)
//   }
 
 
//   const menuId = 'profile';
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: "top", horizontal: "right"}}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//        <MenuItem onClick={handleMenuClose}>
//          <NavLink className={classes.link} to='/user'>
//             Profile
//          </NavLink>
//          </MenuItem>
//         <MenuItem onClick={handleMenuClose}>My Orders</MenuItem>
//     </Menu>
//   );

//   const mobileMenuId = 'profile-mobile';
  
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
      
//       <MenuItem >
//         {/* <IconButton aria-label="show 4 new mails" color="inherit">
//           <Badge badgeContent={4} color="secondary">
//             <MailIcon />
//           </Badge>
//         </IconButton> */}
//         <p>Register</p>
//       </MenuItem >
//       <MenuItem > 
//         {/* <IconButton aria-label="show 11 new notifications" color="inherit">
//           <Badge badgeContent={11} color="secondary">
//             <NotificationsIcon />
//           </Badge>
//         </IconButton> */}
//         <p>Login</p>
//       </MenuItem>
      
//       <MenuItem onClick={handleProfileMenuOpen}>
//         {/* <IconButton
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton> */}
//         <p>Profile</p>
//       </MenuItem>
//       <MenuItem >
//       <p>My Orders</p>
//     </MenuItem>
//     </Menu>
//   );
//   return (
//     <div className={classes.root}>
//       <AppBar className={classes.nav} position="fixed">
//         <Toolbar className={classes.toolBar}>
//           <NavLink to='/' className={classes.title}>
//             <Typography variant="h4" >
//                 Cooper's Home Furniture
//             </Typography>
//           </NavLink>
//           <Grid  xs={2}>
//              <IconButton
//                 aria-label="profile"
//                 aria-controls={menuId}
//                 aria-haspopup="true"
//                 onClick={handleProfileMenuOpen}
//             >
//               <AccountCircle  className={classes.icon}/>
//             </IconButton>
//             <IconButton
//               aria-label="user settings"
//             >
//               <HelpOutlineIcon className={classes.icon}/>
//             </IconButton>
//             <IconButton
//               aria-label="logout"
//             >
//               <ExitToAppIcon className={classes.icon}/>
//             </IconButton> 
//           </Grid>   
//           <Grid  xs={"auto"}>
//             <Button className={classes.btn} color="inherit"><NavLink className={classes.whiteLink} to="/registration/customer">Register</NavLink></Button>
//             <Button className={classes.btn}  color="inherit">Login</Button>
//             <Button className={classes.btn} >Log Out </Button>
//           </Grid> 
//           <div className={classes.sectionMobile}>
//             <IconButton
//               aria-label="show more"
//               aria-controls={mobileMenuId}
//               aria-haspopup="true"
//               onClick={handleMobileMenuOpen}
//               color="inherit"
//             >
//               <MoreIcon />
//             </IconButton>
//           </div>        
//         </Toolbar>
//       </AppBar>
//       {renderMenu}
//       {renderMobileMenu}
//     </div>
//   )
// };

// export default withRouter(NavBar);

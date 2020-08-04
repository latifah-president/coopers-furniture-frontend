import React, {useState, useEffect} from 'react';
import { Route, Switch, NavLink, Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import firebase from './../../firebaseConfig';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Snackbar, Button, Alert, IconButton, CircularProgress } from '@material-ui/core';
import CustomersPage from "./../CustomersPage/Customers";
import AddProductPage from "./../AddProductPage/AddProduct";
import UnauthorizedPage from "./../ErrorPage/Unauthorized";
import StoreManagerPage from "./../StoreManagerPage/AdminConsole";
import {useSelector, useDispatch} from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { initAuth } from '../../Store/Actions/users';
import {greenColor, fontColor} from "./../../GlobalStyles/styles";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {auth} from "./../../firebaseConfig";
import MuiAlert from '@material-ui/lab/Alert';
import {Close} from '@material-ui/icons/';
import SettingsPage from "./Settings";
import Nav from "./../../Components/Nav/ProfileNav";
import NewOrderPage from "./../StoreManagerPage/NewOrder";
import CartPage from "./../Cart/Cart";
import OrdersPage from "./../StoreManagerPage/AllOrders";
import AgentsListPage from "./../StoreManagerPage/AllAgents";
import OrderConfirmationPage from "./../Order/OrderConfirmation";
import SignIn from './../../Containers/Forms/SignIn';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    // border: "2px solid teal",
    margin: "0 auto 4rem 0",
    display: "flex",
   
    flexDirection: "column",
    minHeight: 70,
    // height: "100vh"
    [theme.breakpoints.down('xs')]: { 
      marginBottom: "7rem",
      alignItems: "center",
    },
    // color: `${fontColor}`
  },
  header: {
    borderBottom: `1px solid #e7ebf3`,
    padding: ".8rem",
    // backgroundColor: "aliceblue",
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  heading: {
    fontSize: "1rem",
    [theme.breakpoints.down('xs')]: { 
      fontSize: "1.2rem",
      fontWeight: 200
    },
  },
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "95%",
    borderBottom: `.8px solid ${greenColor}`,
    [theme.breakpoints.down('xs')]: { 
      width: "80%",
      padding: "1rem"
    },
  },
  sectionTop: {
    // border: "1px solid blue",
    width: "100%",
    marginBottom: "1rem",
  },
  sectionHeader: {
    fontSize: "1rem",
    color: `${greenColor}`,
    [theme.breakpoints.down('xs')]: { 
      fontSize: "1rem"
    },
  },
  form: {
    // border: "1px solid red",
    width: "100%",
    color: `${fontColor}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    [theme.breakpoints.down('xs')]: { 
      width: "100%",
      // border: "4px solid yellow",
    },
  },
  label: {
    // border: "1px solid orange",
    // marginBottom: ".7rem",
    fontSize: "13px",
    fontWeight: 700,
    width: "90%",
  },
  textFieldWide: {
    // border: "1px solid blue",
    padding: 0,
    width: "90%",
    marginBottom: "1rem",
  },
  paragraph: {
    fontSize: ".84rem",
    margin: ".7rem 0",
    lineHeight: 2
  },
  // snackbar: {
  //   // border: "1px solid red",
  //   width: '90%',
  //   position: "absolute",
  //   top: 130,
  //   // '& > * + *': {
  //   //   marginTop: theme.spacing(2),
  //   // },
  // },
 hide: {
   display: "none"
 },
 BtnGrid: {
   display: "flex",
   width: "60%",
   justifyContent: "space-around",
  //  border: "1px solid red",
   alignSelf: "flex-end",
 },
 btn: {
   border: `1px solid ${greenColor}`,
   backgroundColor: `${greenColor}`,
   color: "white",
   width: "40%",
   height: 33,
 },
 saveBtn: {
  backgroundColor: "white",
  color: `${greenColor}`,
  border: `1px solid ${greenColor}`,
  height: 33,
 }
}));


const Profile = (props) => {
  const classes = useStyles();
  const user_email = useSelector(state => state.user.email);
  const user_first_name = useSelector(state => state.user.first_name);
  const user_last_name = useSelector(state => state.user.last_name);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const [email, setEmail] = useState("" || user_email);
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("" || user_first_name);
  const [last_name, setLastName] = useState("" || user_last_name);
  const [cash_app_name, setCashApp] = useState('')


  // const firebase_id = useSelector(state => state.user.firebase_id);
  const admin = useSelector(state => state.user.admin);
  const agent = useSelector(state => state.user.agent);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const firebase_id = props.match.params.firebase_id
console.log("open", open)
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
console.log("clicked")
    setOpen(false);
  };

console.log("user email", user_email)
console.log("email", email)

useEffect(() => {

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user)
          const { email, uid } = user;
            firebase.auth()
            .currentUser.getIdToken()
            .then((idToken) => {
              if(idToken) {
                  dispatch(initAuth(email, uid, idToken));
              } else {
                props.history.push(`/singin`)
              }
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      })
  return () => {
    console.log("unsubscribe ");
  };
}, []);

  const handleChange = (event, newValue) => {
   
      setValue(newValue);
   
  };
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const updateEmail = () => {
    const user = auth().currentUser;
    user.updateEmail(email).then(res => {
      // Update successful.
      setOpen(true)
    }).catch(err => {
      // An error happened.
    });
  }

  const snackBar = (title) => (
  
    <div className={open ? classes.snackbar : classes.hide}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      {/* <Snackbar open={open}  onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {title}
        </Alert>
      </Snackbar> */}
  <Alert severity="success" onClose={handleClose} className={classes.alert}>{title}</Alert>
  {/* <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton> */}
    </div>
  )

  const ProtectedRoutes = (
   
    <Switch>
              
    <Route path={`${props.match.path}/settings`} exact={true} component={SettingsPage} />
    <Route path={`${props.match.path}/bookorder`} exact={true} component={NewOrderPage} />
    <Route path={`${props.match.path}/cart`} exact={true} component={CartPage} />
    <Route path={`${props.match.path}/orders`} exact={true} component={OrdersPage} />
    <Route path={`${props.match.path}/confirmation`} exact={true} component={OrderConfirmationPage} />

    {/* ROUTES BELOW THIS LINE WILL BE ADMIN ONLY  */}
    <Route path={`${props.match.path}/addproduct`} exact={true} component={AddProductPage} />
    <Route path={`${props.match.path}/agents`} exact={true} component={AgentsListPage} />
    {/* <Route path={`${props.match.path}/update/:id`} exact={true} component={AddProductPage} /> */}


   </Switch>   

  )
    return (
  
                <div className={classes.root}>
                  
                  <Nav/>
            
                  {loggedIn ? ProtectedRoutes :  <Route exact path="/signin" component={SignIn}/>}

                   
                 </div>
      
             
    )
};

export default withRouter(Profile);
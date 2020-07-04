import React, {useState, useEffect} from 'react';
import { Route, Switch, NavLink} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// import ProfileNav from '../../Components/Nav/ProfileNav';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Snackbar, Button, Alert, IconButton } from '@material-ui/core';
import CustomersPage from "./../CustomersPage/Customers";
import AddProductPage from "./../AddProductPage/AddProduct";
import UnauthorizedPage from "./../ErrorPage/Unauthorized";
import Settings from "./Settings";
import StoreManagerPage from "./../StoreManagerPage/AdminConsole";
import {useSelector, useDispatch} from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { getById } from '../../Store/Actions/users';
import {greenColor, fontColor} from "./../../GlobalStyles/styles";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {auth} from "./../../firebaseConfig";
import MuiAlert from '@material-ui/lab/Alert';
import {Close} from '@material-ui/icons/';


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

  const [email, setEmail] = useState("" || user_email);
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("" || user_first_name);
  const [last_name, setLastName] = useState("" || user_last_name);
  const [cash_app_name, setCashApp] = useState('')


  const firebase_id = useSelector(state => state.user.firebase_id);
  const admin = useSelector(state => state.user.admin);
  const agent = useSelector(state => state.user.agent);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
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

  // useEffect(() => {
  //   // dispatch(getById(firebase_id))
  //   setEmail(user_email)
  // }, [user_email])

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
    return (
      <Grid  container direction="column" justify="center" alignItems="center" className={classes.root}>
          <Grid container direction="column" item className={classes.header}>
              {/* <Typography component="h1" className={classes.heading}>Mangage Account</Typography> */}
              <a href="https://drive.google.com/drive/folders/1jvPVkx-Gx7XYhskueYrSFC1D0_y0rfYx?usp=sharing">Information Portal</a>
          </Grid>
         
        
          {/* <Grid style> */}
            <Grid className={classes.section}>
              <Grid className={classes.sectionTop}>
                <Typography className={classes.sectionHeader} component="h2">Profile</Typography>
                <Typography className={classes.paragraph} component="p">Your email address is your identity on Coopers Home Furniture and is used to log in.</Typography>
              </Grid>
              <div>
            {snackBar("Information updated!")}
          </div>
              <form className={classes.form} >
                  {/* <FormControl> */}
                    <Typography className={classes.label}  component="h4" >Email Address</Typography>
                      <TextField
                         htmlFor="email"
                        //  fullWidth
                         required
                         className={classes.textFieldWide}
                         id="email"
                        //  label="Email"
                         margin="dense"
                         variant="outlined"
                         type="email"
                         value={email}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => setEmail(e.target.value)}
                      />
              <Typography className={classes.label}  component="h4" >Name</Typography>
                      <TextField
                         htmlFor="first-name"
                        //  fullWidth
                         required
                         className={classes.textFieldWide}
                         id="first-name"
                        label="First Name"
                         margin="dense"
                         variant="outlined"
                         type="text"
                         value={first_name}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => setFirstName(e.target.value)}
                      />
                        <TextField
                         htmlFor="last-name"
                        //  fullWidth
                         required
                         className={classes.textFieldWide}
                         id="last-name"
                        label="Last Name"
                         margin="dense"
                         variant="outlined"
                         type="text"
                         value={last_name}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => setLastName(e.target.value)}
                      />
                  {/* </FormControl> */}
              </form>
              <Grid className={classes.BtnGrid}>
                <Button className={classes.btn} type="button" aria-label="save">Save</Button>  
                <Button className={classes.btn, classes.saveBtn} type="button" aria-label="cancel">Cancel</Button>
              </Grid>
             

            </Grid>

            <Grid className={classes.section}>
              <Grid className={classes.sectionTop}>
                <Typography className={classes.sectionHeader} component="h2">Password</Typography>
                {/* <Typography className={classes.paragraph} component="p">Your email address is your identity on Coopers Home Furniture and is used to log in.</Typography> */}
              </Grid>
              <form className={classes.form} >
                  {/* <FormControl> */}
                    <Typography className={classes.label}  component="h4" >Password</Typography>
                      <TextField
                         htmlFor="password"
                        //  fullWidth
                         required
                         className={classes.textFieldWide}
                         id="password"
                        //  label="Email"
                         margin="dense"
                         variant="outlined"
                         type="password"
                         value={password}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => setPassword(e.target.value)}
                      />
              {/* <Typography className={classes.label}  component="h4" >Name</Typography>
                      <TextField
                         htmlFor="first-name"
                        //  fullWidth
                         required
                         className={classes.textFieldWide}
                         id="first-name"
                        label="First Name"
                         margin="dense"
                         variant="outlined"
                         type="text"
                         value={first_name}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => setFirstName(e.target.value)}
                      />
                        <TextField
                         htmlFor="last-name"
                        //  fullWidth
                         required
                         className={classes.textFieldWide}
                         id="last-name"
                        label="Last Name"
                         margin="dense"
                         variant="outlined"
                         type="text"
                         value={last_name}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => setLastName(e.target.value)}
                      /> */}
                  {/* </FormControl> */}
              </form>
              <Grid className={classes.BtnGrid}>
                <Button className={classes.btn} type="button" aria-label="save">Save</Button>  
                <Button className={classes.btn, classes.saveBtn} type="button" aria-label="cancel">Cancel</Button>
              </Grid>
            </Grid>
          {/* </Grid> */}
          
          <Grid className={classes.section}>
          <Grid className={classes.sectionTop}>
                <Typography className={classes.sectionHeader} component="h2">Agent Information</Typography>
                <Typography className={classes.paragraph} component="p">Payouts made every Saturday for the previous week's orders to the provided $Cashtag.</Typography>
              </Grid>
              <form className={classes.form} >
                  {/* <FormControl> */}
                    <Typography className={classes.label}  component="h4" >$Cashtag</Typography>
                      <TextField
                         htmlFor="cash_app_name"
                        //  fullWidth
                         required
                         className={classes.textFieldWide}
                         id="cash_app_name"
                        //  label="Email"
                         margin="dense"
                         variant="outlined"
                         type="cash_app_name"
                         value={cash_app_name}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => setCashApp(e.target.value)}
                      />
                       <Grid className={classes.BtnGrid}>
                <Button className={classes.btn} type="button" aria-label="save">Save</Button>  
                <Button className={classes.btn, classes.saveBtn} type="button" aria-label="cancel">Cancel</Button>
              </Grid>
              <Typography className={classes.label} style={{marginTop: "2rem"}} component="h4" >Commision</Typography>
                     <Typography>$0.00</Typography>
                       
              </form>
          </Grid>
      </Grid> 
    )
};

export default withRouter(Profile);
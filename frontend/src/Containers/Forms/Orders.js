import React, {useState, useEffect, useRef} from 'react';
import { Route, Switch, NavLink} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// import ProfileNav from '../../Components/Nav/ProfileNav';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Snackbar, Button, Alert, IconButton } from '@material-ui/core';

import {useSelector, useDispatch} from "react-redux";
import {greenColor, fontColor} from "./../../GlobalStyles/styles";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {auth} from "./../../firebaseConfig";
import MuiAlert from '@material-ui/lab/Alert';
import {Close} from '@material-ui/icons/';
import Select from "@material-ui/core/Select";
import {MenuItem} from "@material-ui/core";
import MaskedInput from 'react-text-mask';

const stateCodes = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY"
];

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "60%",
    // border: "2px solid teal",
    margin: "0 auto 4rem 0",
    display: "flex",
   
    flexDirection: "column",
    minHeight: 70,
    // height: "100vh"
    [theme.breakpoints.down('xs')]: { 
      marginBottom: "7rem",
      alignItems: "center",
      width: "100%"
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
 },
 cart: {
    border: "1px solid red",
    display: "flex",
    flexDirection: "column",
 },
}));


const Profile = (props) => {
  const classes = useStyles();
  const inputLabel =useRef(null);
  const user_email = useSelector(state => state.user.email);
  const user_first_name = useSelector(state => state.user.first_name);
  const user_last_name = useSelector(state => state.user.last_name);
  const user_address = useSelector(state => state.user.address);
  const user_city = useSelector(state => state.user.city);
  const user_state = useSelector(state => state.user.state);
  const user_zip = useSelector(state => state.user.zip);
  const user_phone = useSelector(state => state.user.phone);
  const firebase_id = useSelector(state => state.user.firebase_id);
  const admin = useSelector(state => state.user.admin);
  const agent = useSelector(state => state.user.agent);
    const user_cash_app = useSelector(state => state.agent.cash_app_name)
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState('(  )    -    ')
  const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const [agent_first_name, setAgentFirstName] = useState("" || user_first_name)
  const [agent_last_name, setAgentLastName] = useState("" || user_last_name)
    const [agent_email, setAgentEmail] = useState("" || user_email);
  const [value, setValue] = useState(0);
  const [cash_app_name, setCashApp] = useState("" || user_cash_app);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const CHAR_LIMIT = 800;

console.log("open", open)
  const handleClick = () => {
    setOpen(true);
  };

  const bookOrder = () => {
    // if (reason === 'clickaway') {
    //   return;
    // }
console.log("clicked")
    setOpen(false);
  };

console.log("user email", user_email)
console.log("email", email)

//   useEffect(() => {
//     // dispatch(getById(firebase_id))
//     setEmail(user_email)
//   }, [user_email])

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
  {/* <Alert severity="success" onClose={handleClose} className={classes.alert}>{title}</Alert> */}
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
            <Grid className={classes.section}>
              <Grid className={classes.sectionTop}>
                <Typography className={classes.sectionHeader} component="h2">Customer Information</Typography>
                {/* <Typography className={classes.paragraph} component="p">Your email address is your identity on Coopers Home Furniture and is used to log in.</Typography> */}
              </Grid>
              {/* <div>
            {snackBar("Information updated!")}
          </div> */}
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
                         value={props.email}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => props.setEmail(e.target.value)}
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
                         value={props.first_name}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => props.setFirstName(e.target.value)}
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
                         value={props.last_name}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => props.setLastName(e.target.value)}
                      />
                  {/* </FormControl> */}
              </form>
            </Grid>

          
            <Grid className={classes.section}>
              <Grid className={classes.sectionTop}>
                <Typography className={classes.sectionHeader} component="h2">Delivery Details</Typography>
                {/* <Typography className={classes.paragraph} component="p">Your email address is your identity on Coopers Home Furniture and is used to log in.</Typography> */}
              </Grid>
              {/* <div>
            {snackBar("Information updated!")}
          </div> */}
              <form className={classes.form} >
                  {/* <FormControl> */}
                    <Typography className={classes.label}  component="h4" >Address</Typography>
                      <TextField
                         htmlFor="address"
                        //  fullWidth
                         required
                         className={classes.textFieldWide}
                         id="address"
                         label="address"
                         margin="dense"
                         variant="outlined"
                         type="text"
                         value={props.address}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => props.setAddress(e.target.value)}
                      />
              <Typography className={classes.label}  component="h4" >City</Typography>
                      <TextField
                         htmlFor="city"
                        //  fullWidth
                         required
                         className={classes.textFieldWide}
                         id="city"
                        label="City"
                         margin="dense"
                         variant="outlined"
                         type="text"
                         value={props.city}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => props.setCity(e.target.value)}
                      />
                    <Typography className={classes.label}  component="h4" >State</Typography>

                        <TextField
                         htmlFor="state"
                         required
                         className={classes.textFieldWide}
                         id="state"
                        label="State"
                         margin="dense"
                         variant="outlined"
                         type="text"
                         value={props.state}
                         onChange={e => props.setState(e.target.value)}
                      />

<Typography className={classes.label}  component="h4" >Zip</Typography>

<TextField
 htmlFor="zip"
 required
 className={classes.textFieldWide}
 id="zip"
label="Zip"
 margin="dense"
 variant="outlined"
 type="text"
 value={props.zip}
 onChange={e => props.setZip(e.target.value)}
/>
        
      <Typography className={classes.label}  component="h4" >Phone Number</Typography>

<TextField
 htmlFor="phone-number"
 required
 className={classes.textFieldWide}
 id="phone-number"
label="Phone Number"
 margin="dense"
 variant="outlined"
 type="text"
 value={props.phone}
 onChange={e => props.setPhone(e.target.value)}
/>

<Typography className={classes.label}  component="h4" >Order Notes</Typography>

<TextField
                // fullWidth
                    className={classes.textFieldWide}
                    id="order-notes"
                    type="text"
                    label="Order Notes"
                    margin="dense"
                    variant="outlined"
                    value={props.notes}
                    rows={4}
                    multiline
                    onChange={e => props.setNotes(e.target.value)}
                    inputProps={{
                      maxLength: CHAR_LIMIT
                    }}
                    helperText={`${props.notes.length}/${CHAR_LIMIT}`}
                /> 
              </form>
{/* 
              <Grid className={classes.section}>
          <Grid className={classes.sectionTop}>
                <Typography className={classes.sectionHeader} component="h2">Agent Information</Typography>
                <Typography className={classes.paragraph} component="p">Payouts made every Saturday for the previous week's orders to the provided $Cashtag.</Typography>
              </Grid>
              <form className={classes.form} >
                    <Typography className={classes.label}  component="h4" >$Cashtag</Typography>
                      <TextField
                         htmlFor="cash_app_name"
                         required
                         required
                         className={classes.textFieldWide}
                         id="cash_app_name"
                         margin="dense"
                         variant="outlined"
                         type="text"
                         value={user_cash_app}
                         onChange={e => props.setCashApp(e.target.value)}
                      />
                       <Grid className={classes.BtnGrid}>
                <Button className={classes.btn} type="button" aria-label="save">Save</Button>  
                <Button className={classes.btn, classes.saveBtn} type="button" aria-label="cancel">Cancel</Button>
              </Grid>
              <Typography className={classes.label} style={{marginTop: "2rem"}} component="h4" >Commision</Typography>
                     <Typography>$0.00</Typography>
                       
              </form>
          </Grid> */}
            </Grid>
         
          {/* </Grid> */}
         
      </Grid> 
    )
};

export default withRouter(Profile);
import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Snackbar, Button, Alert} from '@material-ui/core';
import {useSelector, useDispatch} from "react-redux";
import { getById } from '../../Store/Actions/users';
import {greenColor, fontColor, iconColor} from "./../../GlobalStyles/styles";
import {auth} from "./../../firebaseConfig";
import MuiAlert from '@material-ui/lab/Alert';
import { getAgentById } from '../../Store/Actions/agent';


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
    margin: "2rem 0",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    // border: "1px solid red"
  },
  link: {
    textDecoration: "none",
    color: `${fontColor}`,
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
    width: "55%",
    borderBottom: `.8px solid ${greenColor}`,
    marginBottom: "1.5rem",
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
    width: "80%",
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
   marginBottom: "1.5rem",
  //  border: "1px solid red",
  alignSelf: "center",
   [theme.breakpoints.down('xs')]: { 
    alignSelf: "flex-end",
    // border: "4px solid yellow",
  },
 },
 btn: {
   border: `1px solid ${greenColor}`,
   backgroundColor: `${greenColor}`,
   color: "white",
   width: "40%",
   height: 33,
   "&:hover": {
    backgroundColor: `${iconColor}`,
    color: "white",
   }
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
  const dispatch = useDispatch();
  //DATA FROM REDUX STATE
  const loggedIn = useSelector(state => state.user.loggedIn);
  const user_email = useSelector(state => state.user.email);
  const user_first_name = useSelector(state => state.user.first_name);
  const user_last_name = useSelector(state => state.user.last_name);
  const user_address = useSelector(state => state.user.address);
  const user_city = useSelector(state => state.user.city);
  const user_state = useSelector(state => state.user.state);
  const user_zip = useSelector(state => state.user.zip);
  const user_phone = useSelector(state => state.user.phone);
  const user_cash_app = useSelector(state => state.agent.cash_app_name);

  // const [email, setEmail] = useState(user_email);
  // const [password, setPassword] = useState("");
  // const [first_name, setFirstName] = useState("" || user_first_name);
  // const [last_name, setLastName] = useState("" || user_last_name);
  // const [address, setAddress] = useState("" || user_address);
  // const [city, setCity] = useState("" || user_city);
  // const [state, setState] = useState("" || user_state);
  // const [zip, setZip] = useState("" || user_zip);
  // const [phone, setPhone] = useState("" || user_phone);

  // const [cash_app_name, setCashApp] = useState('' || user_cash_app)

  //COMPONENT STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("" );
  const [last_name, setLastName] = useState("" );
  const [address, setAddress] = useState("" );
  const [city, setCity] = useState("" );
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [cash_app_name, setCashApp] = useState('' || user_cash_app)

  const firebase_id = useSelector(state => state.user.firebase_id);
  const admin = useSelector(state => state.user.admin);
  const agent = useSelector(state => state.user.agent);
  
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const id = props.match.params.firebase_id
 

  const handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
console.log("clicked")
    setOpen(false);
  };

console.log("email", email)
console.log("id", id)



  useEffect(() => {
    if(agent === true) {
      dispatch(getAgentById(firebase_id))
    }
    dispatch(getById(id))
    setFirstName(user_first_name);
    setLastName(user_last_name);
    setEmail(user_email );
    setAddress(user_address);
    setAddress(user_city);
    setAddress(user_state);
    setAddress(user_zip);
    setAddress(user_phone);
    // eslint-disable-next-line 
  }, [dispatch, loggedIn])


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
          <Grid container item className={classes.header}>
              <a className={classes.link} aria-label="Information Portal" target="_blank" rel="noopener noreferrer" href="https://drive.google.com/drive/folders/1jvPVkx-Gx7XYhskueYrSFC1D0_y0rfYx?usp=sharing">Information Portal</a>
              <a className={classes.link} aria-label="Finance Information" target="_blank" rel="noopener noreferrer" href=" https://consumer.snapfinance.com/#/?mid=490237487 ">Finance Information</a>
             {admin || agent ?  <a className={classes.link} aria-label="agent chat" target="_blank" rel="noopener noreferrer" href="https://groupme.com/join_group/60636648/G3rnJtSa">Agent Chat</a> : null }

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
                <Button className={`${classes.btn} ${classes.saveBtn}`} type="button" aria-label="cancel">Cancel</Button>
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
                <Button className={`${classes.btn} ${classes.saveBtn}`} type="button" aria-label="cancel">Cancel</Button>
              </Grid>
            </Grid>
          {/* </Grid> */}
          <Grid className={classes.section}>
          <Grid className={classes.sectionTop}>
                <Typography className={classes.sectionHeader} component="h2">Delivery Information</Typography>
                <Typography className={classes.paragraph} component="p">Keep your address up to date so your furniture always gets there on time.</Typography>
              </Grid>
              <form className={classes.form} >
                  {/* <FormControl> */}
                    <Typography className={classes.label}  component="h4" >Address</Typography>
                      <TextField
                         htmlFor="address"
                        //  fullWidth
                         required
                         className={classes.textFieldWide}
                         id="address"
                         label="Address"
                         margin="dense"
                         variant="outlined"
                         type="text"
                         value={address}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => setAddress(e.target.value)}
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
                         value={city}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => setCity(e.target.value)}
                      />
                        <Typography className={classes.label}  component="h4" >State</Typography>

                       <TextField
                         htmlFor="state"
                        //  fullWidth
                         required
                         className={classes.textFieldWide}
                         id="state"
                         label="State"
                         margin="dense"
                         variant="outlined"
                         type="text"
                         value={state}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => setState(e.target.value)}
                      />
                       <Typography className={classes.label}  component="h4" >Zip</Typography>

                       <TextField
                         htmlFor="zip"
                        //  fullWidth
                         required
                         className={classes.textFieldWide}
                         id="zip"
                         label="Zip"
                         margin="dense"
                         variant="outlined"
                         type="text"
                         value={zip}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => setZip(e.target.value)}
                      />
                       <Typography className={classes.label}  component="h4" >Phone Number</Typography>

<TextField
  htmlFor="phone"
 //  fullWidth
  required
  className={classes.textFieldWide}
  id="phone"
  label="Phone Number"
  margin="dense"
  variant="outlined"
  type="text"
  value={phone}
 //  defaultValue={user_email}
 //  helperText={errorMsg}
  onChange={e => setPhone(e.target.value)}
/>
                       <Grid className={classes.BtnGrid}>
                <Button className={classes.btn} type="button" aria-label="save">Save</Button>  
                <Button className={`${classes.btn} ${classes.saveBtn}`} type="button" aria-label="cancel">Cancel</Button>
              </Grid>
            
                       
              </form>
          </Grid>
          



{agent  ? 
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
                         type="text"
                         value={cash_app_name}
                        //  defaultValue={user_email}
                        //  helperText={errorMsg}
                         onChange={e => setCashApp(e.target.value)}
                      />
                       <Grid className={classes.BtnGrid}>
                <Button className={classes.btn} type="button" aria-label="save">Save</Button>  
                <Button className={`${classes.btn} ${classes.saveBtn}`} type="button" aria-label="cancel">Cancel</Button>
              </Grid>
              {/* <Typography className={classes.label} style={{marginTop: "2rem"}} component="h4" >Commision</Typography>
                     <Typography>$0.00</Typography> */}
                       
              </form>
          </Grid> 
          : null}
      </Grid> 
    )
};

export default withRouter(Profile);
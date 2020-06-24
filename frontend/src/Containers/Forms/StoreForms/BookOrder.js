import React, {useState} from 'react';
import {auth} from '../../../firebaseConfig';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import {useDispatch} from 'react-redux';
import { registerAdmin } from "../../../Store/Actions/admin";
import { registerAgent } from "../../../Store/Actions/agent";
import {iconColor, greenColor} from "./../../../GlobalStyles/styles"
import { Typography } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  wrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // border: "5px solid green",
    marginTop: "2rem",
    [theme.breakpoints.down('sm')]: {
      height: "70%",
    }
  },
  form: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // width: "50%",
    // border: "1px solid red"
  },
  formControl: {
    // border: "1px solid blue",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    // marginBottom: "2rem",
    // minWidth: 120,
    // maxWidth: 280
  },
  textFieldThin: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "200px",
    justifyContent: "left"
  },
  textFieldWide: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "416px",
    justifyContent: "left"
  },
  selectFieldThin: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "200px",
    justifyContent: "left"
  },
  root: {
    justifyContent: "center",
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "500px"
  },
  header: {
    marginBottom: "2rem",
    textAlign: "center",
    fontSize: "2rem",
  },
  btn: {
    margin: "2rem auto",
    color: "white",
    width: "20%",
    backgroundColor: `${iconColor}`,
    borderRadius: 0,
    "&:hover": {
      backgroundColor: `${greenColor}`,

    },
    [theme.breakpoints.down('xs')]: { 
      width: "90%",
    },
  }
}));

  const Form = (props) => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const classes = useStyles();
    const dispatch = useDispatch();
    console.log(props.match.path === "/admin/register" ? "admin reg page" : "nope");
    console.log("path", props );

    const signUpWithEmailAndPassword = () => {
      if (!email || !password) {
        setError(true)
        setErrorMsg("Please enter email and password")
      }
      auth
          .createUserWithEmailAndPassword(email, password)
          .then(({ user }) => {
            if (user) {
              // console.log("incoming user", user);
              if (user.email) {
                const { email, uid } = user;
                // console.log("emailuser", user);
                const userObj = {
                  email,
                  firebase_id: uid,
                  first_name: first_name,
                  last_name: last_name,
                  // admin: true
                  };
                  if (props.match.path === "/admin/register" ) {
                    dispatch(registerAdmin(userObj))
                  } else if (props.match.path === "/agent/register") {
                    dispatch(registerAgent(userObj))
                  }
                   
                  
                  props.history.push(`/storemanager/${userObj.firebase_id}/bookorder`)
              }
            }
          })
          .catch(err => {
            console.log("Error Authenticating User:", err)
            setError(true)
            setErrorMsg(err.message)
          })
    };
  

      return (
        <Grid container item xs={12} className={classes.wrapper}>
          <Typography className={classes.header} component="h3" variant="h3">Book An Order</Typography>
          <form className={classes.form} >
            <FormControl className={classes.formControl}>
              <TextField
                for="firstName"
                required
                className={classes.textFieldWide}
                id="firstName"
                type="text"
                label="First Name"
                margin="dense"
                variant="outlined"
                value={first_name}
                onChange={e => setFirstName(e.target.value)}
              />
                <TextField
                for="lastName"
                required
                className={classes.textFieldWide}
                id="lastName"
                type="text"
                label="Last Name"
                margin="dense"
                variant="outlined"
                value={last_name}
                onChange={e => setLastName(e.target.value)}
              />
            </FormControl>
           
            <FormControl className={classes.formControl}>
              <TextField
                  for="email"
                  fullWidth
                  required
                  className={classes.textFieldWide}
                  id="email"
                  label="Email"
                  margin="dense"
                  variant="outlined"
                  type="email"
                  value={email}
                  helperText={errorMsg}
                  onChange={e => setEmail(e.target.value)}
                />
              <TextField
                for="address"
                required
                className={classes.textFieldWide}
                id="password"
                label="Password"
                type="password"
                margin="dense"
                variant="outlined"
                value={password}
                helperText={errorMsg}
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
          </form>
          <Button arai-label="Signup" className={classes.btn} type="submit" variant="contained" color="primary" onClick={signUpWithEmailAndPassword}>Sign Up</Button>
      </Grid>
    )
  }
  export default Form;

  {/* 
           <FormControl className={classes.formControl}>
        <TextField
                required
                className={classes.textFieldWide}
                id="confirm password"
                label="Confirm Password"
                type="password"
                margin="dense"
                variant="outlined"
                value={password2}
                helperText={errorMsg}
                onChange={e => setPassword2(e.target.value)}
              /> 
           </FormControl> */}
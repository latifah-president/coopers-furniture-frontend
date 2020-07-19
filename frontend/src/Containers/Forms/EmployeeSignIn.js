import React, {useState} from 'react';
import {withRouter} from "react-router-dom"
import {useDispatch, } from "react-redux";
import {auth} from '../../firebaseConfig';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { iconColor, greenColor } from '../../GlobalStyles/styles';
import { logIn } from '../../Store/Actions/users';
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
    [theme.breakpoints.down('xs')]: {
      height: "70%",
    }
  },
  form: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    // width: "75%",
    // border: "1px solid red",
    height: 150,
  },
  textFieldWide: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "416px",
    justifyContent: "left",
    [theme.breakpoints.down('xs')]: {
      width: "316px",
    }
  },
  root: {
    width: '30%',
    '& > * + *': {
      marginTop: theme.spacing(2),
  },},
  btn: {
    margin: "2rem auto",
    color: "white",
    width: "25%",
    backgroundColor: `${iconColor}`,
    borderRadius: 0,
    "&:hover": {
      backgroundColor: `${greenColor}`,

    },
    [theme.breakpoints.down('xs')]: { 
      width: "90%",
    },
},
paper: {
  position: 'absolute',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  // border: '2px solid green',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
},
helperText: {
  display: "flex",
  justifyContent: "flex-end",
  // border: "1px solid green",
},
pwrdbtn: {
  backgroundColor: "transparent",
  fontSize: "1rem",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "transparent",
  },
},
header: {
  marginBottom: "2rem",
  textAlign: "center",
  fontSize: "2rem",
  [theme.breakpoints.down("xs")]: {
    lineHeight: 2
  }
},
}));

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();

    const signInWithEmail = () => {
        if (!email || !password) {
            setError(true)
            setErrorMsg("Field Required")
        }
        auth.signInWithEmailAndPassword(email, password).then(({user}) => {
          if (user) {
            dispatch(logIn(user))
             props.history.push(`/profile/${user.uid}/settings`) 
            
          } else {
            console.log("error no user")
          }
            
        })
        .catch (err => {
            setError(true)
            setErrorMsg(err.message)
        })
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const passwordReset = () => {
      auth.sendPasswordResetEmail(email).then(res => {
        // console.log("res from reset password", res)
        setSuccess(true)
      }).catch(function(error) {
        console.log("error from password reset", error)

      });
    };
//TODO: FIX ALERT FOR WHEN PASSWORD RESET SUCCESSFUL
    const alert = (
      <div className={classes.root}>
      <Collapse in={success}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccess(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Password reset sent. Please check email.
        </Alert>
      </Collapse>
     
    </div>
    )
    return (
   
           <Grid container item xs={12} className={classes.wrapper}>
          <Typography className={classes.header} component="h3" variant="h3">Cooper's Home Furniture Employee Portal</Typography>
                         {alert}

          <form className={classes.form}>
              <TextField
                  error={error}
                  htmlFor="email"
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
                <FormControl>
                  <TextField
                    error={error}
                    htmlFor="password"
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
                  {/* <FormHelperText className={classes.helperText}> */}
                    <div className={classes.helperText}>
                      <Button aria-label="forgot password" type="button" onClick={handleClickOpen} className={classes.pwrdbtn}>
                        <Typography variant="p" gutterBottom style={{fontSize: ".9rem"}}>Forgot your password?</Typography>
                      </Button>
                      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="Reset password">Rest Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password enter the email adddress that was used to sign up for Copper's Home Furniture and email will be sent with directions to reset your password.
          </DialogContentText>
          <TextField
                  error={error}
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
        </DialogContent>
        <DialogActions>
          <Button aria-label="cancel" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button  aria-label="reset password" onClick={passwordReset} color="primary">
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
                    </div>
                {/* </FormHelperText> */}
            </FormControl>

          </form>
          <Button aria-label="signin" className={classes.btn} type="submit" variant="contained"  onClick={signInWithEmail}>Sign In</Button>
      
                </Grid>
           
    
    )
};

export default withRouter(SignIn);
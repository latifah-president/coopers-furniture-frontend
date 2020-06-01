import React, {useState} from 'react';
import {withRouter} from "react-router-dom"
import {useDispatch} from "react-redux";
import {auth} from '../../firebaseConfig';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import { purpleColor } from '../../GlobalStyles/styles';
import { logIn } from '../../Store/Actions/users';

const useStyles = makeStyles(theme => ({
    wrapper: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      border: "5px solid green",
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
      width: "75%",
      border: "1px solid red",
      margin: "0 auto",
    },
    formControl: {
      border: "1px solid blue",
      display: "flex",
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      marginBottom: "2rem",
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
      textAlign: "center"
    },
    btn: {
      margin: "2rem auto",
      color: "white",
      width: "10%",
      backgroundColor: `${purpleColor}`,
      borderRadius: 0,
      "&:hover": {
        // backgroundColor: `${mainBtnColor}`,
  
      }
    }
  }));

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const classes = useStyles();
    const dispatch = useDispatch()
    const signInWithEmail = () => {
        if (!email || !password) {
            setError(true)
            setErrorMsg("Field Required")
        }
        auth.signInWithEmailAndPassword(email, password).then(({user}) => {
          if (user) {
            dispatch(logIn(user))
            props.history.push(`/profile/${user.uid}/orders`)
          } else {
            console.log("error no user")
          }
            
        })
        .catch (err => {
            setError(true)
            setErrorMsg(err.message)
        })
    };

    return (
        <Grid>
            <form className={classes.form} >    
                <FormControl className={classes.formControl}>
                    <TextField
                        error={error}
                        fullWidth
                        required
                        className={classes.textFieldWide}
                        id="email"
                        placeholder="Email"
                        label="Email"
                        margin="dense"
                        variant="outlined"
                        type="email"
                        value={email}
                        helperText={errorMsg}
                        onChange={e => setEmail(e.target.value)}
                        />

                    <TextField
                        error={error}
                        required
                        className={classes.textFieldWide}
                        id="password"
                        placeholder="Password"
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
          <Button className={classes.btn} type="submit" variant="contained"  onClick={signInWithEmail}>Sign In</Button>

        </Grid>
    )
};

export default withRouter(SignIn);
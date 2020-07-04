import React, {useState, useRef} from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import {iconColor, greenColor} from "./../../../GlobalStyles/styles"
import { Typography, FormHelperText } from '@material-ui/core';
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
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
}

const useStyles = makeStyles(theme => ({
  wrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    

    // border: "5px solid green",
    margin: "4rem 0",
    [theme.breakpoints.down('sm')]: {
      height: "70%",
      // border: "5px solid green"
    },
    [theme.breakpoints.down('xs')]: {
      height: "70%",
      // border: "5px solid green"
    }
  },
  form: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,.2)",
    width: "100%",
    padding: "2rem 0",
    [theme.breakpoints.down('xs')]: {
      width: "95%",
     
      // border: "5px solid green"
    }
  },
  formControl: {
    // border: "1px solid blue",
    display: "flex",
    flexDirection: "row",
   width: "70%",
    [theme.breakpoints.down('xs')]: {
      width: "90%",
      flexDirection: "column",
      justifyContent: "center",
    }
    // marginBottom: "2rem",
    // minWidth: 120,
    // maxWidth: 280
  },
  // textFieldWide: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   width: "416px",
  //   justifyContent: "left",
  //   [theme.breakpoints.down('xs')]: {
  //    width: "350px"
  //   }
  // },
  textFieldWide: {
    padding: 0,
    width: "90%",
    marginBottom: "1rem",
    [theme.breakpoints.down('xs')]: {
      width: "90%",
    }
  },
  // selectFieldThin: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   width: "200px",
  //   justifyContent: "left"
  // },
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
    color: `${greenColor}`
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
  },
  stateZip: {
    // border: "1px solid red",
    display: "flex",
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: "1rem",
    [theme.breakpoints.down('xs')]: { 
      marginRight: "1.6rem",
      width: "82%",
      justifyContent: "space-between",
    },
  },
  stateInp: {
    marginLeft: theme.spacing(2),

},
selectFieldThin: {
  // marginLeft: theme.spacing(2),
  // border: "1px solid orange",
  width: "42%",
  [theme.breakpoints.down('xs')]: { 
    width: "40%",
    height: 40,
  },
},
zip: {
  width: "42%",
  paddingLeft: "1rem",
  marginLeft: "1rem",
  [theme.breakpoints.down('xs')]: { 
    width: "40%",
    padding: 0,
  },
},
label: {
  // border: "1px solid orange",
  // marginBottom: ".7rem",
  fontSize: "13px",
  fontWeight: 700,
  width: "90%",
},
helper: {
  marginBottom: "1.5rem",
},
box: {
  display: "flex",
  flexDirection: "column",
  width: "50%",
  [theme.breakpoints.down('xs')]: { 
    // border: "1px solid orange",
    width: "100%",
  },
}
}));

  const Form = (props) => {
    const [state, setStateInp] = useState("");
    const classes = useStyles();
    const inputLabel =useRef(null);


      return (
        <Grid container item xs={12} className={classes.wrapper}>
          <Typography  className={classes.header} component="h3" variant="h3">Welcome aboard!</Typography>
          <form className={classes.form} >

            <FormControl className={classes.formControl}>
              <div className={classes.box}>
          <Typography className={classes.label}  component="h4" >First Name</Typography>

              <TextField
                htmlFor="first-name"
                 required
                 className={classes.textFieldWide}
                 id="first-name"
                placeholder="First Name"
                 margin="dense"
                 variant="outlined"
                 type="text"
                 value={props.first_name}
                onChange={e => props.setFirstName(e.target.value)}
              />
               <FormHelperText className={classes.helper}>{props.errorMsg || null}</FormHelperText>
               </div>

               <div className={classes.box}>
              <Typography className={classes.label}  component="h4" >Last Name</Typography>

                <TextField
                htmlFor="lastName"
                required
                className={classes.textFieldWide}
                id="lastName"
                type="text"
                placeholder="Last Name"
                margin="dense"
                variant="outlined"
                value={props.last_name}
                onChange={e => props.setLastName(e.target.value)}
              />
               <FormHelperText className={classes.helper}>{props.errorMsg || null}</FormHelperText>
               </div>
            </FormControl>
           
            <FormControl className={classes.formControl}>
            <div className={classes.box}>
            <Typography className={classes.label}  component="h4" >Email</Typography>

              <TextField
                  htmlFor="email"
                  fullWidth
                  required
                  className={classes.textFieldWide}
                  id="email"
                  placeholder="Email"
                  margin="dense"
                  variant="outlined"
                  type="email"
                  value={props.email}
                  helperText={props.errorMsg || null}
                  onChange={e => props.setEmail(e.target.value)}
                />
               <FormHelperText className={classes.helper}>{props.errorMsg || null}</FormHelperText>
</div>
<div className={classes.box}>
               <Typography className={classes.label}  component="h4" >Password</Typography>

              <TextField
                htmlFor="password"
                required
                className={classes.textFieldWide}
                id="password"
                placeholder="Password"
                type="password"
                margin="dense"
                variant="outlined"
                value={props.password}
                helperText={props.errorMsg || null}
                onChange={e => props.setPassword(e.target.value)}
              />
               <FormHelperText className={classes.helper}>{props.errorMsg || null}</FormHelperText>
               </div>

               </FormControl >
              


               <FormControl className={classes.formControl}>
               <div className={classes.box}>
               <Typography className={classes.label}  component="h4" >Address</Typography>

               <TextField
                htmlFor="address"
                required
                className={classes.textFieldWide}
                id="address"
                placeholder="Address"
                type="text"
                margin="dense"
                variant="outlined"
                value={props.address}
                helperText={props.errorMsg || null}
                onChange={e => props.setAddress(e.target.value)}
              />
               <FormHelperText className={classes.helper}>{props.errorMsg || null}</FormHelperText>
               </div>

               <div className={classes.box}>
              <Typography className={classes.label}  component="h4" >City</Typography>

               <TextField
                htmlFor="city"
                required
                className={classes.textFieldWide}
                id="city"
                placeholder="City"
                type="text"
                margin="dense"
                variant="outlined"
                value={props.city}
                helperText={props.errorMsg || null}
                onChange={e => props.setCity(e.target.value)}
              />
               <FormHelperText className={classes.helper}>{props.errorMsg || null}</FormHelperText>
               </div>
              </FormControl>
              <FormControl variant="outlined"  required  className={classes.stateZip}>
              {/* <FormControl className={classes.formControl} > */}
              <InputLabel className={classes.stateInp} ref={inputLabel} htmlFor="State" >State</InputLabel>
                        <Select
                            className={classes.selectFieldThin}
                            variant="outlined"
                            margin="dense"
                            id="state"
                            value={props.state}
                            label="State"
                            onChange={e => props.setState(e.target.value)}
                        >
                            {stateCodes.map(code => (
                            <MenuItem value={code} key={code}>{code}</MenuItem>
                            ))}
                        </Select> 
                    {/* </FormControl>  */}
                {/* <TextField
                  htmlFor="state"
                  required
                  className={classes.textFieldWide}
                  id="state"
                  label="state"
                  type="text"
                  margin="dense"
                  variant="outlined"
                  value={props.state}
                  helperText={props.errorMsg}
                  onChange={e => props.setState(e.target.value)}
                /> */}
                              {/* <Typography className={classes.label}  component="h4" >Zip</Typography> */}

                <TextField
                  htmlFor="zip"
                  required
                  className={classes.zip}
                  id="zip"
                  placeholder="Zip"
                  type="text"
                  margin="dense"
                  variant="outlined"
                  value={props.zip}
                  helperText={props.errorMsg || null}
                  onChange={e => props.setZip(e.target.value)}
                />
               <FormHelperText className={classes.helper}>{props.errorMsg || null}</FormHelperText>

              </FormControl>

              <FormControl className={classes.formControl}>
              <div className={classes.box}>
              <Typography className={classes.label}  component="h4" >Phone Number</Typography>

                <Input
                htmlFor="phone-number"
                required
                className={classes.textFieldWide}
                id="phone-number"
                // label="Phone Number"
                placeholder="Phone Number"
                type="text"
                margin="dense"
                variant="outlined"
                value={props.phone}
                helperText={props.errorMsg || null}
                onChange={e => props.setPhone(e.target.value)}
                inputComponent={TextMaskCustom}

              />
                <FormHelperText className={classes.helper}>{props.errorMsg || null}</FormHelperText>
                </div>
                <div className={classes.box}>
              <Typography className={classes.label}  component="h4" >$Cashtag</Typography>

                <TextField
                htmlFor="cash-tag"
                required
                className={classes.textFieldWide}
                id="cash-app-tag"
                placeholder="$Cashtag"
                // label="Cash App Name"
                type="text"
                margin="dense"
                variant="outlined"
                value={props.cash_app_name}
                helperText={props.errorMsg || "We use Cashapp to send your commission."}
                onChange={e => props.setCashApp(e.target.value)}
              />
                <FormHelperText className={classes.helper}>{props.errorMsg || null}</FormHelperText>
                </div>
            </FormControl>
          </form>
          {/* <Button arai-label="Signup" className={classes.btn} type="submit" variant="contained" color="primary" onClick={signUpWithEmailAndPassword}>Sign Up</Button> */}
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
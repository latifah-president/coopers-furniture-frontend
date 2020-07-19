import React, {useState,} from "react";
import PersonalDeatails from "./Steps/AgentSignUp";
import HowItWorks from "./Steps/HowItWorks";
import Payment from "./Steps/Payment";
import Terms from "./Steps/Terms";
import { registerAgent } from "../../Store/Actions/agent";
import {auth} from '../../firebaseConfig';
import {withRouter} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux"
import { iconColor, greenColor, offWhiteColor} from "./../../GlobalStyles/styles";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Error from "./../../Components/Error/Error";
import IntroVideo from "./Steps/Video";
const useStyles = makeStyles((theme) => ({

    root: {
      width: '100%',
      display: "flex",
      flexDirection: "column",
    //  border: "1px solid blue",
     backgroundColor: `${offWhiteColor}`,
     height: "100vh",
     paddingBottom: "4rem",
    },
    backButton: {
     // margin: "2rem auto",
     color: "white",
     width: "25%",
     // border: "1px solid red",
     backgroundColor: `${greenColor}`,
     borderRadius: 0,
     margin: ".3rem auto",
     "&:hover": {
       backgroundColor: `${iconColor}`,
 
     },
     [theme.breakpoints.down('xs')]: { 
       width: "90%",
     },
    },
    instructions: {
      // marginTop: theme.spacing(1),
      // marginBottom: theme.spacing(1),
      margin: "1rem auto",
      // border: "1px solid blue",
      width: "80%",
      [theme.breakpoints.down('xs')]: { 
        width: "95%",
      },
    },
    btn: {
        // margin: "2rem auto",
        color: "white",
        width: "25%",
        // border: "1px solid red",
        backgroundColor: `${iconColor}`,
        borderRadius: 0,
        margin: ".3rem auto",
        "&:hover": {
          backgroundColor: `${greenColor}`,
    
        },
        [theme.breakpoints.down('xs')]: { 
          width: "90%",
        },
    },
    hide: {
        display: "none"
    },
    btnGrid: {
      // border: "1px solid blue",
      width: "70%",
      margin: "0 auto 4rem auto",
      justifyContent: "space-around",
      display: "flex",
      [theme.breakpoints.down('xs')]: { 
        margin: "0 auto 10rem auto",

        flexDirection: "column",
        alignItems: "center",
        width: "90%"
      },
    }
  }));

const MultiStepForm = (props) => {

    function getSteps() {
        return ['Details', 'How It Works', 'Payment', 'Terms of Agreement', 'Welcome Video'];
      }
      
      const dispatch = useDispatch();
      const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
   
    const [phone, setPhone] = useState('(  )    -    ')
    const [cash_app_name, setCashApp] = useState('')
    const [activeStep, setActiveStep] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState(false);

    const steps = getSteps();
      console.log("firs name", first_name.length)
      console.log("last name", last_name.length)
      console.log("password", password.length)
      console.log("cash app name", cash_app_name.length)
      console.log("address", address.length)
      console.log("zip", zip.length)
      console.log("city", city.length)
      console.log("state", state.length)
      console.log("phone", phone.length)
      console.log("error", error)
      console.log("errorMsg", errorMsg)

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
                    address: address,
                    city: city,
                    state: state,
                    zip: zip,
                    phone: phone,
                    cash_app_name: cash_app_name
                    // admin: true
                    };
                  
                     
                    dispatch(registerAgent(userObj))
                    props.history.push(`/profile/${userObj.firebase_id}/settings`)
                }
              }
            })
            .catch(err => {
              console.log("Error Authenticating User:", err)
              setError(true)
              setErrorMsg(err.message)
            })
      };
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleReset = () => {
        setActiveStep(0);
      };

     

  function getStepContent(stepIndex) {
        switch (stepIndex) {
          case 0:
            return (
                <PersonalDeatails
                   first_name={first_name}
                   setFirstName={setFirstName}
                   last_name={last_name}
                   setLastName={setLastName}
                   email={email}
                   setEmail={setEmail}
                   password={password}
                   setPassword={setPassword}
                   address={address}
                   setAddress={setAddress}
                   city={city}
                   setCity={setCity}
                   state={state}
                   setState={setState}
                   zip={zip}
                   setZip={setZip}
                   phone={phone}
                   setPhone={setPhone}
                   cash_app_name={cash_app_name}
                   setCashApp={setCashApp}
                    next={handleNext} 
                    step={activeStep}
                    errorMsg={errorMsg}
                    error={error}
                />
            );
          case 1:
            return (
                <HowItWorks
                    next={handleNext} 
                    prev={handleBack}
                   
                    
                />
                
            );
          case 2:
            return (
                <Payment
                    next={handleNext} 
                    prev={handleBack}
                   
                />
            );
        case 3:
            return (
                <Terms
                    next={handleNext} 
                    prev={handleBack}
                    
                />
            );
        case 4:
          return (
              <IntroVideo
                  next={handleNext} 
                  prev={handleBack}
                  
              />
          );
            default:
            return (
                <Error/>
            );
        }
      }

    return (
        <Grid className={classes.root} >
        <Stepper activeStep={activeStep} alternativeLabel aria-hidden="true">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button className={classes.btn} onClick={handleReset}>Add Product</Button>
          </div>
        ) : (
          <div>
             
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
            <div className={classes.btnGrid}>
            {/* <Button className={classes.backButton}  variant="contained" onClick={activeStep === steps.length - 1 ? signUpWithEmailAndPassword : handleNext}  > */}
            <Button className={classes.btn}  variant="contained" disabled={first_name.length===0 || last_name.length===0 || email.length===0 || password.length===0 || address.length===0 || city.length===0 || state.length===0 || zip.length===0 || phone.length===0 || cash_app_name.length===0 ? true : false}
  onClick={activeStep === steps.length - 1 ? signUpWithEmailAndPassword : handleNext} >
                {activeStep === steps.length - 1 ? 'Agree and Submit' : 'Agree and Continue'}
              </Button>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={activeStep === 0 ? classes.hide : classes.btn}
              >
                Back
              </Button>
              
            </div>
          </div>
        )}
      </div>
        </Grid>
    )
};

export default withRouter(MultiStepForm);
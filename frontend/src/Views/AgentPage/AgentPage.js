import React, {useState} from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import AgentModal from "./../../Containers/AgentOnboarding/AgentModal";
import {greenColor, fontColor, offWhiteColor} from "./../../GlobalStyles/styles";


const useStyles = makeStyles((theme) => ({
    root: {
      color: "#0C1D33",
      // border: "1px dotted purple",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        height: "auto",
      },
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // marginTop: "4rem",
      height: "100vh",
      backgroundColor: `${offWhiteColor}`,
      margin: "0 auto",
      paddingTop: "4rem",
      // height: "100vh"
    },
    wrapper: {
      boxShadow: "0 2px 5px rgba(0,0,0,.2)",
      width: "90%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      backgroundColor: "white",
      marginBottom: "2rem",
      [theme.breakpoints.down("xs")]: {
        width: "80%",
        // border: "1px dotted purple",
      },
    },
    heading: {
        textTransform: "uppercase",
        fontSize: "2.6rem",
        textAlign: "center",
        color: `${greenColor}`,
        marginBottom: "2rem",
    },
    content: {
        // border: "1px solid red",
        width: "95%",
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down("xs")]: {
          flexDirection: "column",
          alignItems: "center"
        },
    },
    question: {
        // border: "1px solid green",
        margin: "1rem 0",
        fontSize: "1.6rem",
       textAlign: "center",
       textTransform: "capitalize"
    },
    answer: {
        // border: "1px solid black",
        lineHeight: 2,
        fontSize: "1rem",
        padding: "1rem",
        color: `${fontColor}`
    },
    a: {
        color: "#0C1D33",
    },
    paragraph: {
      fontSize: ".899rem",
      margin: ".7rem 0",
      lineHeight: 2,
      padding: ".5rem",
    },
    box: {
      width: "28%",
      display: "flex",
      flexDirection: "column",
      border: "1px solid black",
      marginBottom: "2rem",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },

    },
    btn: {
      backgroundColor: "white",
      color: `${greenColor}`,
      fontWeight: 700,
      "&:hover": {
        backgroundColor: "white",
      }
    },
    boxBottom: {
      width: "90%",
      display: "flex",
      flexDirection: "column",
      // border: "1px solid black",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },

    },
  }));

const AgentPage = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      props.history.push('/agent/register')
    };
    return(
        <Grid className={classes.root}>
            <Typography className={classes.heading} component="h2" variant="h2">Become a CHF sales agent</Typography>
            <Grid className={classes.wrapper}>
            <Grid className={classes.content}>
                <Grid className={classes.box}>
                <Typography className={classes.question} component="h4" variant="h4">Is This Work From Home?</Typography>
                <Typography className={classes.answer}  variant="body2"> Yes it is. We will show you how to sell our furniture at home with out ever leaving your house. This is perfect to make some quick, or even passive income. It doesn’t require a lot of time and you can work when ever you want, how ever hard you want, its really up to you.</Typography>
                </Grid>

                <Grid className={classes.box}>
                <Typography className={classes.question} component="h4" variant="h4">How much does it pay?</Typography>
                <Typography className={classes.answer}  variant="body2">
                You get a commission on each product that you sell. All payouts are done every Saturday to your cash app. 
                Agents will be paid $10 for every product under $500, $25 for every product over $500, and $50 every product over $1000.                  

                If you don’t make at least one sale every 30 days we will remove you from our agents list and you will not be allowed to sign up again. 
                </Typography>
                </Grid>

                <Grid className={classes.box}>
                <Typography className={classes.question} component="h4" variant="h4"> Do I have to pay for anything?</Typography>
                <Typography className={classes.answer}  variant="body2"> Absolutely not. Working with us is free as it should be and there is really no requirements aside from you owning a smart phone and having access to the internet.</Typography>
                
                {/* <Typography className={classes.question} component="body2" variant="body2"> We cant wait to welcome you to our team. Please sign up <a className={classes.a} href="https://forms.gle/d8hPYbQbhirdpKSR7">here and one of reps will get back to you.</a></Typography> */}
        
            </Grid>
            
            </Grid>
            <Grid className={classes.boxBottom}>
              <Typography className={classes.question}  variant="body2"> We cant wait to welcome you to our team. </Typography>
              <Typography className={classes.answer}  variant="body2">  
              CHF sales agents can use our platform to make some extra money from home or supplement their income. You work when you want, and by following our strategies you can have people reaching out to you without much effort on your part. This makes our platform perfect for those stuck at home and wanting to make some quick cash consistently. Sign up below to get access to our agent portal where you can read through our training and get started. We look forward to you joining our community of agents.
                <Button aria-label="Sign Up" className={classes.btn} component={Link} onClick={handleClickOpen}>Become An Agent!</Button>

              </Typography>

              <AgentModal
                disableEnforceFocus
                open={open}
                handleClose={handleClose}
                handleClickOpen={handleClickOpen}
              />
            </Grid>
            </Grid>
        </Grid>
    )
};

export default AgentPage;
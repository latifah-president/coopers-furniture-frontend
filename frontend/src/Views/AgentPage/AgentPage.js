import React, {useState} from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import AgentModal from "./../../Containers/AgentOnboarding/AgentModal";
import {greenColor, fontColor} from "./../../GlobalStyles/styles";


const useStyles = makeStyles((theme) => ({
    root: {
      color: "#0C1D33",
    //   border: "1px dotted purple",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "4rem",
    },
    heading: {
        textTransform: "uppercase",
        fontSize: "2.6rem",
        textAlign: "center",
        color: `${greenColor}`,
        marginBottom: "2rem",
    },
    content: {
        border: "1px solid red",
        width: "95%",
        display: "flex",
        justifyContent: "space-between",
    },
    question: {
        border: "1px solid green",
        margin: "1rem 0",
        fontSize: "1.6rem",
       
    },
    answer: {
        border: "1px solid black",
        lineHeight: 2,
        fontSize: "1rem",
        padding: "1rem"
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
      width: "22%",
      display: "flex",
      flexDirection: "column",
      border: "1px solid black",

    }
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
            <Grid className={classes.content}>
              {/* <Grid className={classes.box}>
                <Typography className={classes.question} component="h4" variant="h4">How does it work?</Typography>
                <Typography className={classes.answer}  variant="body2">Sign up bellow and one of our reps will be in contact with you for a short explainer and introduction, this is to be sure we know who you are. You’ll get access to your very own back office where you can book orders and we’ll walk you through the best sales practices to get the best results.</Typography>
                </Grid> */}

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
                <Typography className={classes.question}  variant="body2"> We cant wait to welcome you to our team. </Typography>
<Button conponent={Link} onClick={handleClickOpen} aria-label="Begin onboarding process">Sign Up</Button>
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
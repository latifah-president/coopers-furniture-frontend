import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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
      alignItems: "center"
    },
    heading: {
        textTransform: "uppercase"
    },
    content: {
        // border: "1px solid red",
        width: "70%",
    },
    question: {
        // border: "1px solid green",
        marginBottom: "1rem"
    },
    answer: {
        // border: "1px solid black",
        lineHeight: 2,
        fontSize: "1rem"
    },
    a: {
        color: "#0C1D33",
    }
  }));

const AgentPage = () => {
    const classes = useStyles();

    return(
        <Grid className={classes.root}>
            <Typography className={classes.heading} component="h2" variant="h2">Become a CHF sales agent</Typography>
            <Grid className={classes.content}>
                <Typography className={classes.question} component="h4" variant="h4">How does it work?</Typography>
                <Typography className={classes.answer} component="body2" variant="body2">Sign up bellow and one of our reps will be in contact with you for a short explainer and introduction, this is to be sure we know who you are. You’ll get access to your very own back office where you can book orders and we’ll walk you through the best sales practices to get the best results.</Typography>

                <Typography className={classes.question} component="h4" variant="h4">Is This Work From Home?</Typography>
                <Typography className={classes.answer} component="body2" variant="body2"> Yes it is. We will show you how to sell our furniture at home with out ever leaving your house. This is perfect to make some quick, or even passive income. It doesn’t require a lot of time and you can work when ever you want, how ever hard you want, its really up to you.</Typography>

                <Typography className={classes.question} component="h4" variant="h4">How much does it pay?</Typography>
                <Typography className={classes.answer} component="body2" variant="body2">You get 10$ every time you book an order under 500$ and 25$ every time you book an order over 500$. After your first 50 orders are booked, we give you a percentage of each booking and we put you in our top agents list. That comes with its own set of perks.</Typography>

                <Typography className={classes.question} component="h4" variant="h4"> Do I have to pay for anything?</Typography>
                <Typography className={classes.answer} component="body2" variant="body2"> Absolutely not. Working with us is free as it should be and there is really no requirements aside from you owning a smart phone and having access to the internet.</Typography>

                <Typography className={classes.question} component="body2" variant="body2"> We cant wait to welcome you to our team. Please sign up <a className={classes.a} href="https://forms.gle/d8hPYbQbhirdpKSR7">here and one of reps will get back to you.</a></Typography>

            </Grid>
        </Grid>
    )
};

export default AgentPage;
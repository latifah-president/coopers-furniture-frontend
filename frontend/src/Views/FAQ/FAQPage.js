import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography} from '@material-ui/core';
import {fontColor} from "./../../GlobalStyles/styles"
const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      // border: "2px solid teal",
      display: "flex",
     
      flexDirection: "column",
      minHeight: 70,
      [theme.breakpoints.down('xs')]: { 
        marginBottom: "7rem",
        alignItems: "center",
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
  }));
const FAQ = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.root}>
            <Typography className={classes.question}>
                Are customers able to return a product that is either  damaged or the wrong color or style?
            </Typography>
            <Typography className={classes.answer}>
                Customers must either reach out to their sales agents within 24 hours of delivery to 
                report the damage, or they can call our customer support line with in 24 hours to report any damages or issues with their order. 
                After reviewing the damages and talking  with the customer, if there is probable cause  Our team will issue a refund for the product in question.
            </Typography>

            <Typography className={classes.question}>
                Do we do trade ins?
            </Typography>
            <Typography className={classes.answer}>
                All sales are final once the product has reached the customer and is  payed for 
                by the customer or a member of the household for the address provided. We do not take returns, and we only offer refunds within 24 hours of delivery granted there are any damages to the product in question, or there was a mistake with the order upon booking and the customer received the wrong product.
            </Typography>

            <Typography className={classes.question}>
                Do we offer set up?
            </Typography>
            <Typography className={classes.answer}>
                 We do not currently offer set up at this time due to the Covid19 pandemic. We are unsure when we will be offering set up at this time. The product will arrive brand new in the box, and easy set up instructions will be provided.
            </Typography>

            <Typography className={classes.question}>
                What forms of payment do we accept? 
            </Typography>
            <Typography className={classes.answer}>
                We currently accept cash or card upon delivery. Or you can also reach out to our support team after applying for our financing option, a member of our team will walk you through next steps. If you apply for financing, please before booking your order, reach out to a member of our team you must sign your  contract before you can continue.
            </Typography>

            <Typography className={classes.question}>
                Is any of your furniture used?
            </Typography>
            <Typography className={classes.answer}>
                All of our furniture is brand new from our suppliers and have never been opened or used before arriving to your home.
            </Typography>

            <Typography className={classes.question}>
                Do we have a storefront where are products are held on display?
            </Typography>
            <Typography className={classes.answer}>
                No we do not, Coopers Home Furniture is and will always be  online only. We currently don’t offer a show room of any kind.
            </Typography>

            <Typography className={classes.question}>
                What happens if my driver does not arrive with my product?            </Typography>
            <Typography className={classes.answer}>
                Reach out to your sales agent or a member of our team by either messaging your agent, or calling our customer support line.  We will provide you with another delivery time. And remember you don’t pay for your product until it arrives to you.            
            </Typography>
        </Grid>
    )
};

export default FAQ;
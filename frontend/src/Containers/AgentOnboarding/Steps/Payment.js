import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {greenColor} from "./../../../GlobalStyles/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  sectionHeader: {
    fontSize: "1rem",
    color: `${greenColor}`,
    [theme.breakpoints.down('xs')]: { 
      fontSize: "1.5rem"
    },
  },
}));



export default function CustomizedDialogs() {
 
 const classes = useStyles();

  return (
    < div className={classes.root}>
      <Typography className={classes.sectionHeader} component="h2">Payment information.</Typography>
        <hr/>
          <Typography gutterBottom>
                You are payed $10 for every product sold under $500, 
                $25 for every product over $500, and $50 for every product over $1000.
                Payments will be made every Saturday for the previous week.
           </Typography>
          <Typography gutterBottom>
              We have plans to expand on this payment structure in the upcoming weeks,
            but as this program is still in a trial phase we are sticking to this structure for now.
          </Typography>
          <Typography gutterBottom>
          Our goal is to work with our agents to build out a master sales 
          strategy that expands on our current model and allow us to pay out a lot more in the future.
          </Typography>
          <Typography gutterBottom>
          You’ll be able to join in our agent  group chat, you can ask our team any questions you may have there, as well as talk with other agents and trade ideas and what might be working for everyone else. 
          Our goal is to create a community where we all want to see each other succeed. 
          As we scale and grow our sales force we hope to receive your feedback on how we can make our platform better for us all.
          </Typography>
          <Typography gutterBottom>
          By clicking on agree and continue below, you are confirming that you understand our pay structure, 
          and you are agreeing to be added to our group chat using the group me app.
          </Typography>
    </div>
  );
};


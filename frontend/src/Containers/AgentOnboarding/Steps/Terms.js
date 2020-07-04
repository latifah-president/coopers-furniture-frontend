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
    <div className={classes.root}>
      
      <Typography className={classes.sectionHeader} component="h2">Terms of agreement.</Typography>

        <hr/>
          <Typography gutterBottom>
          By clicking the continue button below you understand 
          that you are not an employee of Coopers Home Furniture or its parent company A.R.C. Limited.
           </Typography>
          <Typography gutterBottom>
          Becoming a Coopers Home Furniture sales agent is a freelance opportunity that offers a way for individuals 
          to make some passive income selling furniture on line. You will not be entitled to any employee benefits, hourly pay,  vacation time or 
          any other bonuses that may be given to an individual under employment with Coopers Home Furniture or its parent company A.R.C. Limited.
          </Typography>
          <Typography gutterBottom>
          You understand that signing up to become a sales agent with Coopers Home Furniture does not guarantee  that you will make any money, however Coopers Home Furniture will provide all the necessary 
          tools and instruction in order for you to get the best possible outcome from working with us.
          </Typography>
          <Typography gutterBottom>
          You understand that our methods for making sales have been tested  real time with a high success rate,
           but each individual may have different results and successes depending on a number of unknown  factors. 
          </Typography>
          <Typography gutterBottom>
          By clicking agree and  continue  you are confirming that you have read and understand all of our turns and conditions and you are  acknowledging that you understand that you  
          have no claim to any employment benefits and that this opportunity is commission only.
          </Typography>
    </div>
  );
}


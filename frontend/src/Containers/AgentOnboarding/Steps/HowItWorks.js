import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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
}))

export default function CustomizedDialogs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.sectionHeader} component="h2">Let’s go over how this works.</Typography>

        <hr/>
          <Typography gutterBottom>
          We will provide you with a more in-depth walk through of our best practices once you get to your agent portal. You will take our 
          furniture off of our site and post on different market places such as Facebook Market Place, Offer Up, Let Go, Craigs List and more.          </Typography>
          <Typography gutterBottom>
          When ever someone reaches out to you about a product you just give them the rundown. Let them know we deliver 
          for free, and they don’t pay for there product until it arrives to there front door.
          </Typography>
          <Typography gutterBottom>
          You then collect the customers information. Name, address, phone number and  email. 
          Enter that information into your book an order tab on your agent profile and our team will handle the rest.
          </Typography>
          <Typography gutterBottom>
            When ever the product is payed for by the customer, we send you your cash. Simple note,
           you never need to ask for payment information from the customer, they pay our delivery drivers when they arrive.
          </Typography>
       
        {/* <DialogActions>
          <Button autoFocus onClick={props.handleClose} color="primary">
            Continue
          </Button>
        </DialogActions> */}
      
    </div>
  );
}


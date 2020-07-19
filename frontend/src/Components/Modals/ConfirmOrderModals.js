import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Snackbar,  IconButton } from '@material-ui/core';
import {fontColor} from "./../../GlobalStyles/styles";
import {withRouter} from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    root: {
      color: `${fontColor}`,
      // width: "60%",
    border: "2px solid teal",
      // margin: "0 auto 4rem 0",
      // display: "flex",
     
      // flexDirection: "column",
      // minHeight: 70,
      // // height: "100vh"
      // [theme.breakpoints.down('xs')]: { 
      //   marginBottom: "7rem",
      //   alignItems: "center",
      //   width: "100%"
      // },
    },
    hide: {
      display: "none"
    },
    orderItem: {
        // border: "1px solid orange",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    imgGrid: {
        // border: "1px solid red"
    },
    img: {
        // border: "1px solid yellow",
        width: "80%",
    },
    text: {
        // border: "1px solid green",
        color: `${fontColor}`,
    },
  }));

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function AlertDialog(props) {

  const close = () => {
    props.setSuccess(false)

  }
  const classes=useStyles();
  const snackBar = () => (
  
    <div className={props.success ? classes.snackbar : classes.hide}>
   
  <Alert severity="success" onClose={close} className={classes.alert}>Your order is being processed!</Alert>

    </div>
  )

  return (
    <div className={props.open ? classes.root : classes.hide}>
      {/* <Button variant="outlined" color="primary" onClick={props.handleClickOpen}>
        Confirm that the information being submitted is correct
      </Button> */}
      {snackBar}
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">{"Confirm Order"}</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.text} id="confirmation-dialog-description">
            Please confirm that all order information is accurate.
          </DialogContentText>
          <DialogContent id="confirmation-details">
              <Typography className={classes.text} >Customer Name: {props.first_name} {props.last_name}</Typography>
              <Typography className={classes.text} >Customer Email: {props.email}</Typography>
              <Typography className={classes.text} >Customer Address: {props.address} {props.city} {props.state}</Typography>
              <Typography className={classes.text} >Customer Phone Number: {props.phone}</Typography>
          </DialogContent>
          <DialogContent id="confirmation-details">
            <DialogContent>
              {props.order_items.map((item) => (
                <DialogContent key={item.title} className={classes.orderItem}>
                <img className={classes.img} src={item.image_url} alt={props.title}/>
              <Typography className={classes.text}>{item.title}</Typography>
              <Typography className={classes.text}>${item.price}</Typography>
              <Typography className={classes.text}>{item.color}</Typography>
              </DialogContent>
              ))}
            </DialogContent>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.bookOrder} color="primary">
            Book Order
          </Button>
          {/* <Button onClick={props.handleClose} color="primary" autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

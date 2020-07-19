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
    <div className={props.openModal ? classes.root : classes.hide}>
      <Dialog
        open={props.openModal}
        onClose={props.handleModalClose}
        aria-labelledby="delete-confirmation-dialog-title"
        aria-describedby="delete-confirmation-dialog-description"
      >
        <DialogTitle id="delete-confirmation-dialog-title">{"Are you sure you want to delete this product?"}</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.text} id="confirmation-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        
         
        </DialogContent>
        <DialogActions>
        <Button onClick={props.handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.confirmDelete} color="primary">
            Delete
          </Button>
         
        </DialogActions>
      </Dialog>
    </div>
  );
}

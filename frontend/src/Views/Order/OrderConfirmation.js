import React, {useState} from "react";
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Snackbar, Button, Alert, IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      width: "60%",
      // border: "2px solid teal",
      margin: "0 auto 4rem 0",
      display: "flex",
     
      flexDirection: "column",
      minHeight: 70,
      // height: "100vh"
      [theme.breakpoints.down('xs')]: { 
        marginBottom: "7rem",
        alignItems: "center",
        width: "100%"
      },
    },
    orderItem: {
        border: "1px solid orange"
    },
    imgGrid: {
        border: "1px solid red"
    },
    img: {
        border: "1px solid yellow"
    },
    text: {
        border: "1px solid green"
    },
  }));
const OrderConfirmation = (props) => {
    const classes = useStyles();

    return (
        <Grid className={classes.root} container>
            <Grid className={classes.orderItem} container item>
            <Grid className={classes.imgGrid} item>
                {/* <img src={props.image_url} alt={props.title}/> */}
            </Grid>
            </Grid>
           
             <Grid item>
                    <Typography className={classes.text} component="p" varient="body2">Customer Name: {props.first_name} {props.last_name}</Typography>
                    <Typography className={classes.text} component="p" varient="body2">Customer Address: {props.address} {props.city} {props.state} {props.zip}</Typography>
                    <Typography className={classes.text}component="p" varient="body2">Customer Phone Number: {props.phone}</Typography>

            </Grid>
           
           
        </Grid>
    )
};

export default OrderConfirmation;
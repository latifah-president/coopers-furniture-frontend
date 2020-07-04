import React from 'react';
import {withRouter} from "react-router-dom";
import AddProductForm from "./../../Containers/Forms/StoreForms/AddProduct";
import Error from "./../../Components/Error/Error";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {iconColor,  greenColor} from "./../../GlobalStyles/styles";
import MultiStepForm from '../../Containers/Forms/StoreForms/MobileForm/AddProduct/MultiStepForm';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "2px solid green",
        width: "100%",
        // marginTop: "15rem",
        [theme.breakpoints.up("md")]: {
            marginTop: "2rem"
        }
    },
    mobileForm: {
        display: "none",
        [theme.breakpoints.down("md")]: {
            display: "flex",
            width: "100%",
            margin: "0 auto",
            flexDirection: "column",
        }
    },
    deskTopForm: {
        // border: "1px solid red",
        width: "100%",
        // [theme.breakpoints.down("sm")]: {
        //     border: "10px solid orange",
            
        // },
        [theme.breakpoints.down("md")]: {
            // border: "1px solid pink",
            display: "none",
        }
    },
    backButton: {
        marginRight: theme.spacing(1),
      },
      instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
      btn: {
          // margin: "2rem auto",
          color: "white",
          width: "25%",
          // border: "1px solid red",
          backgroundColor: `${iconColor}`,
          borderRadius: 0,
          margin: ".3rem 0",
          "&:hover": {
            backgroundColor: `${greenColor}`,
      
          },
          [theme.breakpoints.down('xs')]: { 
            width: "100%",
          },
      },
      hide: {
          display: "none"
      }
}))

const AddProduct = (props) => {

const classes = useStyles();



    return (
        <Grid className={classes.root} >
           
            <div className={classes.mobileForm}>
              <MultiStepForm
                handleChange={props.handleChange}
              />
            
            </div>
           
            <div className={classes.deskTopForm}><AddProductForm/></div>
        </Grid>
    )
};

export default withRouter(AddProduct);
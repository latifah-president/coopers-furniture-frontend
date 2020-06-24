import React from 'react';
import AddProductForm from "./../../Containers/Forms/AddProduct";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid green",
        width: "100%",
    },
    cart: {
        border: "1px solid red"
    },
}))

const AddProduct = () => {
    const classes = useStyles();
   
    return (
        <Grid className={classes.root} >
            <AddProductForm/>
            <Gri className={classes.cart}>cart items</Gri>
        </Grid>
    )
};

export default AddProduct;
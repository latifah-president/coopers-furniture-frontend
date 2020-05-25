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
        marginTop: "6rem"
    },
    title: {
        margin: " auto",
        border: "1px solid red"
    },
    textFieldWide: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "416px",
        justifyContent: "left"
      },
      btn: {
        margin: "2rem auto",
        color: "white",
        width: "10%",
        // backgroundColor: `${purpleColor}`,
        borderRadius: 0,
        // "&:hover": {
        //   backgroundColor: `${purpleColor}`,
    
        // }
    },
}))

const AddProduct = () => {
    const classes = useStyles();
   
    return (
        <Grid className={classes.root} >
            <Typography  className={classes.title} variant="h1" component="h3" gutterBottom>Add A Product</Typography>
            <AddProductForm/>
        </Grid>
    )
};

export default AddProduct;
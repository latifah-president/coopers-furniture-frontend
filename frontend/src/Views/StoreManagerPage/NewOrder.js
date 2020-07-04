import React from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "2px solid green",
        width: "100%",
    },
    cart: {
        // border: "1px solid red"
    },
}))

const AddProduct = () => {
    const classes = useStyles();
    const loading = useSelector(state => state.user.loading)
    return (
        <Grid>
            {loading ? <CircularProgress/> : 
                <Grid>book an order</Grid>
            }
        </Grid>
        
    )
};

export default AddProduct;
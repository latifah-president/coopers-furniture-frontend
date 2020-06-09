import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import ProducstList from "../../Components/Products/ProductsList";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getProducts } from "../../Store/Actions/products";

// Material UI breakpoints
// value         |0px     600px    960px    1280px   1920px
// key           |xs      sm       md       lg       xl
// screen width  |--------|--------|--------|--------|-------->
// range         |   xs   |   sm   |   md   |   lg   |   xl
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      // border: "10px solid purple"
    },
    // display: "flex",

    // justifyContent: "center",
    // height: "auto",
    // flexGrow: 1,
  },
}));
const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())  
    return () => {
        console.log("unsubscribe ");
      };
}, [dispatch]);

    return (
        <Grid className={classes.root}>
          <ProducstList/>
        </Grid>
    )
};

export default Home;
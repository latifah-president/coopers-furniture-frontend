import React from "react";
import ProducstList from "../../Components/Products/ProductsList";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CategoryNav from "./../../Components/Nav/CategoryNav";
// Material UI breakpoints
// value         |0px     600px    960px    1280px   1920px
// key           |xs      sm       md       lg       xl
// screen width  |--------|--------|--------|--------|-------->
// range         |   xs   |   sm   |   md   |   lg   |   xl
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      border: "10px solid purple"
    },
    // display: "flex",

    // justifyContent: "center",
    // height: "auto",
    // flexGrow: 1,
  },
  gridList: {
    alignItems: "center",
    width: "90%",
    // flexWrap: 'wrap',
    // width: 500,
    // [theme.breakpoints.down('md')]: {
    //   width: "100%",
    // }
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  gridListTile: {
    margin: "1rem auto",
    width: "10%",
    justifyContent: "space-between",
    maxWidth: 270,
  },
}));
const Home = () => {
  const classes = useStyles();
    return (
        <Grid className={classes.root}>
          <ProducstList/>
        </Grid>
    )
};

export default Home;
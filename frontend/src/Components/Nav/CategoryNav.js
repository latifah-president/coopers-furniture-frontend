import React from "react";
import {NavLink} from "react-router-dom";
import Aux from "./../../HOC/Aux";
import {useSelector} from "react-redux"
import { Grid } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    root: {
      flexGrow: 1,
    //   border: "3px solid purple",
      display: "flex",
      justifyContent: "space-around",
    },
    category: {
        color: "black",
        fontSize: "1.22rem",
        textTransform: "uppercase",
        textDecoration: "none",
        color: "white",

    },
    catNav: {
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        // border: "1px solid red",
        minHeight: "40px",
        margin: "2rem 0",
        backgroundColor: "#374F71",
    },
    toolBar: {
      display: "flex",
      // border: "1px solid blue",
      justifyContent: "space-between",
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  hide: {
    display: "none",
  }, 
logo: {
    backgroundColor: "orange",
    height: "260px",
    borderRadius: "50%",
    width: "15%",
    textAlign: "center",
    margin: "2rem auto 0 auto",
    border: "1px solid pink",
},
active: {
    borderBottom: "lightgray",
}
  }));
const CategoryNav = () => {
    const categories = useSelector(state => state.product.products);
    const classes = useStyles();

    return (
           
        <Grid container className={classes.root}>
             <Grid className={classes.logo}></Grid>
            {/* <AppBar  > */}
                <Toolbar className={classes.catNav}>
                    {categories.map((category, key) => (
                        console.log(key),
                            <NavLink
                            key={category.id}
                            className={classes.category}
                            to={`/category/:${category.category}`}
                            activeClassName={classes.active}
                          >
                            {category.category}
                          </NavLink>
                    ))}
            
                </Toolbar>
            {/* </AppBar> */}
        </Grid>
    )
};

export default CategoryNav;
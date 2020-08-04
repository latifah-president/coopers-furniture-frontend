import React, {useEffect, useState} from "react";
import { withRouter } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import ProducstList from "../../Components/Products/ProductsList";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getProducts } from "../../Store/Actions/products";
import Pagination from "./../../Containers/Pagnation/Pagnation";

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
const Home = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products)
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10)

  console.log("PROD LENGTH", products)
  // const getCount = () => {
  //   console.log("products.length", products.length)
  
  //   setCount(products.length)
  // };

  const setQuery = () => {
    props.history.push(`/products?page=${page}`)
  };

  useEffect(() => {
    dispatch(getProducts(page));
    setQuery()
  // getCount()
    return () => {
        console.log("unsubscribe ");
      };
}, [dispatch, ]);



const handleChange = (event, value) => {
  setPage(value)
};



console.log("COUNT", count)
    return (
        <Grid className={classes.root}>
          <ProducstList/>
          {/* <Pagination currPage={page} count={10} handleChange={handleChange}/> */}
        </Grid>
    )
};

export default withRouter(Home);
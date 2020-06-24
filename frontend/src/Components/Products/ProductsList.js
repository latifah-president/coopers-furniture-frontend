import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { Grid, GridList, GridListTile, CircularProgress } from "@material-ui/core";
import ProductCard from "./ProductCard";
import { makeStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import {getProducts} from "./../../Store/Actions/products";

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      // height: "auto",
      flexGrow: 1,
      // border: "2px solid blue",

    },
    gridList: {
      alignItems: "center",
      width: "100%",
      // height: "100vh",
      // flexWrap: 'wrap',
      // width: 500,
      // border: "2px solid green",
      [theme.breakpoints.down('sm')]: {
        width: "100%",
      }
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    gridListTile: {
      margin: "1rem auto",
      width: "100%",
      justifyContent: "space-between",
      maxWidth: 270,
      minWidth: 270,
      // border: "2px solid black",
    },
  }));

const ProducstList = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const classes = useStyles();
    const loading = useSelector(state => state.product.loading);
    const error = useSelector(state => state.product.error);

    console.log("products", products)

    useEffect(() => {
      
      dispatch(getProducts())
      
      return () => {
          console.log("unsubscribe ");
        };
  }, [dispatch]);

    const getGridListCols = () => {
        if (isWidthUp("xl", props.width)) {
          return 5;
        }
    
        if (isWidthUp("lg", props.width)) {
          return 4;
        }
    
        if (isWidthUp("md", props.width)) {
          return 3;
        }
        if (isWidthUp("sm", props.width)) {
          return 2;
        }
        return 1;
      };

    return (
        <Grid className={classes.root}>
            <GridList
                cols={getGridListCols()}
                cellHeight={400}
                className={classes.gridList}>
                {loading || error ? <CircularProgress/> : products.map((product) => (
                    <GridListTile className={classes.gridListTile} key={product.id}>
                        <ProductCard
                            product={product}
                        ></ProductCard>
                    </GridListTile>
                ))}
      </GridList>
        </Grid>
    )
};

export default withRouter(withWidth()(ProducstList));
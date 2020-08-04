import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { GridList, GridListTile, CircularProgress, GridListTileBar, } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import {getProducts} from "./../../Store/Actions/products";
import InfoIcon from '@material-ui/icons/InfoRounded';
import Pagination from "./../../Containers/Pagnation/Pagnation";

const useStyles = makeStyles((theme) => ({
    // root: {
    //   display: "flex",
    //   justifyContent: "center",
    //   // height: "auto",
    //   flexGrow: 1,
    //   // border: "2px solid blue",

    // },
    // gridList: {
    //   alignItems: "center",
    //   width: "100%",
    //   // height: "100vh",
    //   // flexWrap: 'wrap',
    //   // width: 500,
    //   // border: "2px solid green",
    //   [theme.breakpoints.down('sm')]: {
    //     width: "100%",
    //   }
    // },
    // icon: {
    //   color: "rgba(255, 255, 255, 0.54)",
    // },
    // gridListTile: {
    //   margin: "1rem auto",
    //   width: "100%",
    //   justifyContent: "space-between",
    //   maxWidth: 270,
    //   minWidth: 270,
    //   // border: "2px solid black",
    // },

    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: "center",
      // overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      //  border: "1px solid green",
      width: "95%",
      margin: "2rem auto",
     
      // [theme.breakpoints.down('lg')]: {
      //   border: "3px solid green"
      // },
      [theme.breakpoints.down('md')]: {
        // border: "3px solid brown",
        width: "100%",
        paddingBottom: "4rem",
      },
      // [theme.breakpoints.down('sm')]: {
      //   border: "3px solid hotpink"
      // },
      // [theme.breakpoints.down('xs')]: {
      //   border: "3px solid limegreen"
      // }
    },
    gridList: {
      width: "100%",
      margin: "0",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      // height: 450,
      // border: "6px solid teal",
      [theme.breakpoints.down('md')]: {
        // border: "3px solid black",
      },
      [theme.breakpoints.down('xs')]: {
        width: "100%",
      }
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    tile: {
      margin: "1rem",
      //  border: "1px solid orange",
       
      // height: 300,
      [theme.breakpoints.down('lg')]: {
        // width: "30.46%",
        maxWidth: "22.46%",
        minWidth: "22.46%",
      },
      [theme.breakpoints.down('md')]: {
        // width: "30.46%",
        maxWidth: "28.46%",
        minWidth: "28.46%",
      },
      [theme.breakpoints.down('sm')]: {
        // width: "30.46%",
        maxWidth: "45.46%",
        minWidth: "45.46%",
      },
      cursor: "pointer",
      [theme.breakpoints.down('xs')]: {
        maxWidth: "96%",
        minWidth: "96%",
      }
    },
    tileBar: {
      textTransform: "uppercase",
    }
  }));

const ProducstList = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const images = useSelector(state => state.product.images);

    const classes = useStyles();
    const loading = useSelector(state => state.product.loading);
    const error = useSelector(state => state.product.error);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(10)
  console.log("products", products)

  const setQuery = () => {
    props.history.push(`/products?page=${page}`)
  };
    useEffect(() => {
      
      dispatch(getProducts(page))
      setQuery()
      return () => {
          console.log("unsubscribe ");
        };
  }, [dispatch,  count, page]);



  const handleChange = (event, value) => {
    setPage(value)
  };

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

    <div className={classes.root}>
      <GridList cols={getGridListCols()} cellHeight={380} className={classes.gridList} >
        {loading ? <CircularProgress/> : products.map((product) => (
          <GridListTile className={classes.tile} key={product.id} onClick={() => props.history.push(`/product/${product.id}`)}>
            <img src={product.images} alt={product.title} />
            {/* {images.map((image) => (
               

            ))} */}
            <GridListTileBar
              title={product.title}
              subtitle={<span>${product.price}</span>}
              className={classes.tileBar}
              style={{ textTransform: "uppercase", fontSize: ".5rem"}}
            />
          </GridListTile>
        ))}
      </GridList>
      <Pagination currPage={page} count={10} handleChange={handleChange}/>

    </div>
  );


    
    
};

export default withRouter(withWidth()(ProducstList));


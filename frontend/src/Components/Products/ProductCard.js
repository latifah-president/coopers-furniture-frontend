import React from "react";
import {withRouter} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";
import {useSelector, useDispatch} from "react-redux";
import {deleteProduct} from "./../../Store/Actions/products";
import {yellowColor, iconColor, categories, greenColor} from "./../../GlobalStyles/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      margin: "0 auto",
      border: "1px solid #808080",
      cursor: "pointer",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      // border: "1px solid green"
    }
    },
    media: {
      width: "100%",
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    btn: {
      margin: "2rem auto",
      color: "white",
      // width: "25%",
      backgroundColor: `${iconColor}`,
      borderRadius: 0,
      "&:hover": {
        backgroundColor: `${greenColor}`,
  
      },
      [theme.breakpoints.down('xs')]: { 
        width: "90%",
      },
  },
    // button: {
    //   background: "none",
    //   margin: "0 auto",
    // //   color: "white",
    // //   fontFamily: "Helvetica",
    //   width: "80%",
    //   "&:hover": {
    //     background: "none",
  
    //   }
    // },
    price: {
      // marginTop: "1rem",
      fontWeight: 550
    },
    card: {
        border: "none",
    },
    title: {
        // border: "1px solid red",
        fontFamily: "Helvetica, Arial, sans-serif",
        // marginTop: "1rem",
    },
    btnWrapper: {
      // border: "1px solid red",
      display: "flex",
      width: "100%"
    }
  }));

const ProductCard = (props) => {
    const classes = useStyles();
    const admin = useSelector(state => state.user.admin);
    const dispatch = useDispatch();
  console.log("props", props)
    return(    
    <Grid variant="outlined" className={classes.root} container direction="column" alignItems="center" onClick={() => props.history.push(`/product/${props.product.id}`)}>
        <img className={classes.media} src={props.product.image_url} alt={props.product.title} />
        <Typography variant="overline"  component="h5" className={classes.title}>
            {props.product.title}
        </Typography>
        <Typography variant="overline"  component="h5" className={classes.title}>
            ${props.product.price}
        </Typography>
       
          {/* {admin ?   <Grid className={classes.btnWrapper}> 
          <Button className={classes.btn} size="small"> <Typography variant="overline" display="block"> Delete</Typography> </Button>
          <Button className={classes.btn} size="small"> <Typography variant="overline" display="block"> Edit</Typography> </Button> </Grid>: null} */}
         
 <Grid className={classes.btnWrapper}>    <Button className={classes.btn} size="small"> <Typography variant="overline" display="block"> add to cart</Typography> </Button> </Grid>

        
        

    </Grid>
)
};

export default withRouter(ProductCard);
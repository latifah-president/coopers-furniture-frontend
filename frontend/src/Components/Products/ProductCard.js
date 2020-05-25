import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";
import {useSelector} from "react-redux";
const useStyles = makeStyles((theme) => ({
    root: {
        // height: "auto",
      margin: "0 auto",
    //   border: "1px solid #808080"
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      border: "1px solid green"
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
    button: {
      background: "none",
      margin: "0 auto",
    //   color: "white",
    //   fontFamily: "Helvetica",
      width: "80%",
      "&:hover": {
        background: "none",
  
      }
    },
    price: {
      marginTop: "1rem",
      fontWeight: 550
    },
    card: {
        border: "none",
    },
    title: {
        border: "1px solid red",
        fontFamily: "Helvetica, Arial, sans-serif",
        marginTop: "1rem",
    },
    btnWrapper: {
      border: "1px solid red",
      display: "flex",
      width: "100%"
    }
  }));

const ProductCard = (props) => {
    const classes = useStyles();
    const admin = useSelector(state => state.user.admin);
    console.log(props, "props")
    return(    
    <Grid variant="outlined" className={classes.root} container direction="column" alignItems="center">
        <img className={classes.media} src={props.product.image_url} alt={props.product.title} />
        <Typography variant="overline"  component="h5" className={classes.title}>
            {props.product.title}
        </Typography>
        <Typography variant="overline"  component="h5" className={classes.title}>
            ${props.product.price}
        </Typography>
        <Grid className={classes.btnWrapper}>
          <Button className={classes.button} size="small"> <Typography variant="overline" display="block"> Delete</Typography> </Button>
          <Button className={classes.button} size="small"> <Typography variant="overline" display="block"> Edit</Typography> </Button>
        </Grid>
        

    </Grid>
)
};

export default ProductCard
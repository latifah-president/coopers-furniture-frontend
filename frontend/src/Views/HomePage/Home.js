import React, {useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "./../../Components/Home/Carousel";
import { getProducts } from "./../../Store/Actions/products";
import {greenColor, fontColor} from "./../../GlobalStyles/styles";

// Material UI breakpoints
// value         |0px     600px    960px    1280px   1920px
// key           |xs      sm       md       lg       xl
// screen width  |--------|--------|--------|--------|-------->
// range         |   xs   |   sm   |   md   |   lg   |   xl
const useStyles = makeStyles((theme) => ({
  root: {
    color: `${fontColor}`,
    marginTop: "2rem",
    // border: "10px solid purple",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  main: {
    // border: "1px solid red",
    // margin: "2rem 0",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: "4rem",
    margin: "2rem",
    color: `${fontColor}`,
    textTransform: "uppercase",
    [theme.breakpoints.down('sm')]: {
      fontSize: "1.6rem",
      fontWeight: 500,
      lineHeight: 1.5
    },
  },
  paragraph: {
    // border: "1px solid green",
    textAlign: "justify",
    width: "70%",
    lineHeight: 2,
    [theme.breakpoints.down('sm')]: {
      width: "90%",
    },
  },
  howItWorks: {
    backgroundColor: "#F2CC7E",
    color: `${greenColor}`,
    width: "100%",
    margin: "2rem 0",
    textTransform: "uppercase",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "2rem",
  },
  span: {
    transform: "rotate(180deg)",
    width: "15%", 
    // border: "1px solid white",
    fontSize: "1rem",
    backgroundColor: `${greenColor}`,
    height: "10px",
  },
  steps: {
    // border: "1px solid orange",
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    margin: "2rem 0",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
  },
  step: {
    // border: "1px solid purple",
    width: "25%",
    // maxWidth: "25%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down('sm')]: {
      width: "100%"
    },
  },
  stepNum: {
    fontSize: "6rem",
    // border: "2px solid red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "65%",
    margin: "0 auto 2rem auto",  
},
num: {
  fontSize: "6rem"
},
stepHeader: {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: `${greenColor}`,
  borderBottom: "3px solid #EA4D1F",
  width: "80%",
  margin: "0 auto",
  minHeight: 60
},
stepText: {
  textTransform: "none",
  margin: "2rem auto",
  textAlign: "justify",
  width: "80%"
},
listItem: {
  width: "100%",
  // border: "1px solid red",
  padding: 0
},
listItemText: {
  width: "100%",
  // border: "1px solid green",
  listStyle: "none"
},
divider: {
  width: "100%", 
  color: "#EA4D1F",
  // marginTop: "1rem", 
},
section: {
  // color: "#366E82",
  width: "100%",
  margin: "2rem 0",
  textTransform: "uppercase",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexDirection: "column",
  paddingTop: "2rem",
  // border: "1px solid red"
},
hotItem: {
  // border: "1px solid purple",
  width: "25%",
  height: "auto",
  // maxWidth: "25%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down('sm')]: {
    width: "100%"
  },
},
image: {
  width: "50%",
  // border: "1px solid yellow",

},
hotItemSection: {
  // border: "1px solid orange",
  display: "flex",
  width: "100%",
  justifyContent: "space-around",
  margin: "2rem 0",
  [theme.breakpoints.down('sm')]: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
},
title: {
  margin: "1rem 0"
},
link: {
  // textDecoration: "none",
  color: `${greenColor}`
},
hotItemTitle: {
  paddingLeft: "1rem",
  [theme.breakpoints.down('sm')]: {
    alignSelf: "center"
  },
},
centerSection: {
  // color: "#366E82",
  width: "100%",
  margin: "2rem 0",
  textTransform: "uppercase",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
  paddingTop: "2rem",
  // border: "1px solid red"
}
}));
const Home = (props) => {
  const classes = useStyles();
  const products = useSelector(state => state.product.products);

  const loading = useSelector(state => state.product.loading);
  const error = useSelector(state => state.product.error);
console.log("products", products)
  // const dispatch = useDispatch();
  // useEffect(() => {
  //  dispatch(getProducts())
   

  //   return () => {
  //     console.log("unsubscribe")
  //   }
  // },[dispatch]);

    return (
        <Grid className={classes.root}>
          <Carousel/>
          <Grid container className={classes.main}>
            <Typography className={classes.heading} component="h1" variant="h1">Welcome to Cooper's Home Furniture</Typography>
            <Typography className={classes.paragraph} component="p" variant="body1">
              We pride ourselves on  providing fast, affordable and reliable furniture across Central Texas.
              We believe that leasing furniture should be a thing of the past. Our financing option are hassle free, and owning your furniture outright is easy with us, <Link className={classes.link} to="https://consumer.snapfinance.com/#/?mid=490237487">sign up here to begin financing option</Link>.  
              Currently we service the following areas, the Greater Austin area, Houston, Kileen, and Waco with plans to expand into more cities in the up coming months. 

              We also offer an exciting freelance opportunity to make some extra money online as a Cooper’s Home Furniture sales agent. 
              These freelance positions can be done from home anywhere in the United States. 
               We welcome any and everyone willing to go the extra mile to provide quality customer service and sales.
              Interested applicants can <Link to="/chfagent" className={classes.link}>find out more information</Link> on the Cooper’s Home Furniture sales agent page.
            </Typography>
            {/* <Typography className={classes.paragraph} component="p" variant="body1">
              We pride ourselves on  providing fast, affordable and reliable furniture across Central Texas.
              We believe that leasing furniture should be a thing of the past. Our financing option are hassle free, and owning your furniture outright is easy with us, <Link className={classes.link} to="https://consumer.snapfinance.com/#/?mid=490237487">sign up here to begin financing option</Link>.  
              Currently we service the following areas, the Greater Austin area, Houston, Kileen, and Waco with plans to expand into more cities in the up coming months. 
            </Typography> */}
            <Grid item className={classes.howItWorks}>
              <Typography component="h2" variant="h2">How We Work</Typography>
              <Grid className={classes.steps}>
                <Grid className={classes.step}>
                  <Grid className={classes.stepNum}>
                <span className={classes.span}></span>
                  <Typography  className={classes.num} component="p" >1</Typography>
                  <span className={classes.span}></span>
                  </Grid>
                  <Typography style={{minHeight: "60px", display: "flex", alignItems: "center", justifyContent: "center"}} className={classes.stepHeader} component="h3" varient="h3">Select Your Furniture</Typography>
                  <Typography className={classes.stepText} component="p" >Browse our selection of stylish furniture. We have many options available to fit every style, budget, and preference.</Typography>                      
                </Grid>
                <Grid className={classes.step}>
                <Grid className={classes.stepNum}>
                <span className={classes.span}></span>
                  <Typography  className={classes.num} component="p" >2</Typography>
                  <span className={classes.span}></span>
                  </Grid>  
                  <Typography className={classes.stepHeader} component="h3" varient="h3">Add your items to your Cart</Typography>  
                  <Typography className={classes.stepText} component="p" variant="body1"> After making a decision on your brand new piece of furniture add your item to your cart and proceed to booking.</Typography>                      
                  </Grid>
                <Grid className={classes.step}>
                <Grid className={classes.stepNum}>
                <span className={classes.span}></span>
                  <Typography  className={classes.num} component="p" varient="body1">3</Typography>
                  <span className={classes.span}></span>
                  </Grid> 
                  <Typography className={classes.stepHeader} component="h3" varient="h3">receive confirmation </Typography>     
                  <Typography className={classes.stepText} component="p" variant="body1">We will provide you with available delivery slots; in most cases we can deliver the very  next day. You pay for your product on delivery with either cash or card. </Typography>          
                </Grid>
              </Grid>
            </Grid>

            <Grid item className={classes.section}>
              <Typography className={classes.hotItemTitle} component="h2" variant="h2">hot deals</Typography>
              <Grid className={classes.hotItemSection}>
                {error || loading ? <CircularProgress/>  : products.slice(0, 3).map((product, key) => (
                    <Grid className={classes.hotItem} key={key}>
                      <img className={classes.image} src={product.images} alt={product.title}/>
                     <Link className={classes.link} to={`/product/${product.id}`}> <Typography variant="button" display="block" className={classes.title}>{product.title}</Typography>  </Link> 
                    </Grid>
               
                ))}
                
              </Grid>
            </Grid>
            {/* <Grid item className={classes.centerSection}>
              <Typography  component="h2" variant="h2" onClick={() => props.history.push("/chfagent")}>Become An Agent</Typography>
              <Typography className={classes.paragraph} style={{textTransform: "none"}} component="p" variant="body1">
                Anyone can sign up to be a Coopers Home Furniture sales agent. We welcome any and everyone willing to go the extra mile to provide quality customer service and sales. To learn more visit our <Link className={classes.link} to="/chfagent">CHF sales agent page.</Link>
            </Typography>
            </Grid> */}
          </Grid>
        </Grid>
    )
};

export default withRouter(Home);
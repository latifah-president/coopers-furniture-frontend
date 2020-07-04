import React, {useEffect, useState} from "react";
import {withRouter, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import  queryString from "query-string";
import {getProductsBy} from "../../Store/Actions/products";
import {addToCart} from "../../Store/Actions/users";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography, IconButton, Button, Tooltip } from "@material-ui/core";
import {fontColor, greenColor, whiteColor, yellowColor, offWhiteColor} from "../../GlobalStyles/styles";
import Select from "./../../Containers/Select/QuantitySelect";
import { Edit, Delete, LocalShippingOutlined} from  '@material-ui/icons';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      display: "flex",
        color: `${fontColor}`,
      justifyContent: "center",
      alignItems: "center",
    // border: "5px solid green",
      // margin: "0rem auto 10rem auto",
      // width: "100%",
      flexDirection: "column",
      padding: "2rem",
      backgroundColor: `${offWhiteColor}`,
      // minHeight: "100%",
      paddingBottom: "4rem",
      [theme.breakpoints.down('xs')]: {
        flexDirection: "column",
        padding: 0,
        // minHeight: "100vh",
      }
    },
    wrapper: {
      // border: "1px solid red",
      backgroundColor: `${whiteColor}`,
      display: "flex",
      width: "100%",
      flexDirection: "column",
      boxShadow: "0 2px 5px rgba(0,0,0,.2)",
      [theme.breakpoints.down('xs')]: {
        flexDirection: "column",
        // height: "100vh",
        margin: "0rem auto 4rem auto",
      }
    },
    container: {
        width: "98%",
        // border: "1px solid red",
        display: "flex",
        flexDirection:"column",
        justifyContent: "space-between",
        alignItems:"center",
        padding: "1rem",
        margin: "0 auto",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            padding: 0,
            // border: "1px solid green"

          }
    },
    img: {
      maxWidth: 1100,
      maxHeight: 550,
      paddingTop: "1rem",
      width: 1100,
      height: 550,
        // border: "3px solid green",
        // height: 300,
        // width: "30%",
        margin: "1 auto",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            height: 365,
            padding: 0,
        }
    },
    content: {
        //  border: "1px solid blue",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%",
        alignItems: "center",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            // marginTop: "4rem",
            alignItems: "center",
            justifyContent: "center"
          }
    },
    adminBtn: {
        // border: "1px solid indigo",
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        // marginTop: "4rem",
    },
    btn: {
        // border: `1.5px solid ${goldColor}`,
        borderRadius: 0,
        color: `${whiteColor}`,
        backgroundColor: `${greenColor}`,
        "&:hover": {
            color: `${whiteColor}`,
        backgroundColor: `${greenColor}`
        },
        width: "100%",
        marginTop: "2rem",
       
    },
    title: {
        fontSize: "1rem",
        fontWeight: 600,
        margin: "1rem 0",
        [theme.breakpoints.down('xs')]: {
          fontSize: "1.3rem",
          width: "95%",
          // border: `1.5px solid yellow`,
          fontWeight: 700,
          
        }
    },
    mobileTitle: {
        margin: "2rem",
        fontSize: "2rem",
    },
    price: {
        fontSize: "1.5rem",
        color: `${greenColor}`,
        fontWeight: 700,
        // border: `1.5px solid ${goldColor}`,
        // marginTop: "1rem"
        [theme.breakpoints.down('xs')]: {
          fontSize: "1.7rem",
      }
    },
    description: {
        fontSize: "1rem",
        marginTop: "2rem",
        padding: "0 1rem",
    },
    hr: {
        width: "100%", 
        // border: `1px solid ${yellowColor}`,
        [theme.breakpoints.down("xs")]: {
          display: "none",
        }
    },
    bottom: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        // flexDirection: "column",
        // border: "1px solid blue",
marginTop: "2rem",
        [theme.breakpoints.down('xs')]: {
            flexDirection: "row",
            // border: "1px solid blue",
            width: "60%",
            justifyContent: "space-between",

            alignItems: "center"
        }
    },
    contentTop: {
      // border: "1px solid red",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      margin: "2rem 0",
      [theme.breakpoints.down('xs')]: { 
        flexDirection: "column",
      },
    },
    sectionHeader: {
      fontSize: "1.5rem",
      color: `${greenColor}`,
      fontWeight: 300,
      textTransform: "uppercase",
      lineHeight: 1,
      [theme.breakpoints.down('xs')]: { 
        fontSize: "1.3rem",
        marginLeft: ".5rem",
      },
    },
    paragraph: {
      fontSize: ".899rem",
      margin: ".7rem 0",
      lineHeight: 2,
      padding: ".5rem",
    },
    colors: {
      // border: "1px solid red",
      display: "flex",
      justifyContent: "flex-start",
      [theme.breakpoints.down('xs')]: { 
        width: "auto"
      },
    },
    color: {
      height: 30,
      width: 30,
      border: "1px solid black",
      borderRadius: 0,
      minWidth: 0,
    },

  
    colorsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      // paddingLeft: "2rem",
    //  border: "1px solid green",
     height: 63,
     width: 59,
    },
    imageContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderBottom: "1px solid #dedede",
      // justifyContent:
    },
    delivery: {
      display: "flex",
      width: "18%",
      justifyContent: "space-between",
      alignItems: "center",
      // border: "1px solid green",
      [theme.breakpoints.down('xs')]: { 
        width: "90%",
        margin: "0 auto",
      },
    },
    deliveryIcon: {
      fontSize: "2rem",
      paddding: 9,
      // marginTop: "1rem",
    },
    deliveryText: {
      fontSize: ".7rem",
      fontWeight: 600,
      maxWidth: 250, 
      textAlign: "left",
      marginLeft: "1rem",
      // width: "45%",
    },
    availableColors: {
      fontSize: "1rem",
      display: "flex",
      flexDirection: "column",
      // border: "1px solid green",
      
      [theme.breakpoints.down('xs')]: { 
        alignItems: "center"
      },
      // marginTop: "2rem"
    },
    colorText: {
      fontWeight: 600,
      fontSize: "1rem",
      textAlign: "uppercase",
      textAlign: "center",
    },
    span: {
      fontSize: ".5rem",
      fontWeight: 700,
    },
    priceTop: {
      display: "flex",
      width: "35%",
      justifyContent: "space-around",
      alignItems: "center",
      // border: "1px solid green",
      [theme.breakpoints.down('xs')]: { 
        width: "100%",
      }
    },
    priceText: {
      display: "flex",
      flexDirection: "column",
      // border: "1px solid orange",
      [theme.breakpoints.down('xs')]: { 
        padding: "0 .5rem"
      }
    },
    financing: {
      // border: "1px solid black",
      color: "#eb141f",
      fontWeight: 400,
      textDecoration: "none"
    },
    cartGrid: {
      // border: "1px solid purple",
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down('xs')]: { 
        width: "40%",
      }
    },
    bottomWrapper: {
      // backgroundColor: `${whiteColor}`,
      // display: "flex",
      // width: "100%",
      // flexDirection: "column",
      // padding: "0 1rem",
      // boxShadow: "0 2px 5px rgba(0,0,0,.2)",
      // [theme.breakpoints.down('xs')]: {
      //   flexDirection: "column",
      //   margin: "0rem auto 2rem auto",
      // }
      backgroundColor: `${whiteColor}`,
      display: "flex",
      width: "100%",
      flexDirection: "column",
      boxShadow: "0 2px 5px rgba(0,0,0,.2)",
      [theme.breakpoints.down('xs')]: {
        flexDirection: "column",
        // height: "100vh",
        margin: "0rem auto 6rem auto",
      }
    }
  }));

const ProductDetail = (props) => {
    const dispatch = useDispatch();
    const firebase_id = useSelector(state => state.user.firebase_id);
    const product = useSelector(state => state.product.products);
    const colors = useSelector(state => state.product.colors);

    const admin = useSelector(state => state.user.admin);
    const loggedIn = useSelector(state => state.user.loggedIn);
    const col = "id"
    const id = props.match.params.id;
    const [quantity, setQty] = useState(1);
    const classes = useStyles();
    const loading = useSelector(state => state.product.loading);
    const error = useSelector(state => state.product.error);
    const [color, setColor] = useState("");
    useEffect(() => {
       
        const filter = id
            dispatch(getProductsBy(col, filter))
      
        return () => {
            console.log("unsubscribe ");
          };
    }, [dispatch]);


    // const addToCart = () => {
        
    //     setSelected(true)
    //     props.history.push(`/profile/${firebase_id}/cart`)

    // };

    // const addToCart = (id, quantity, firebase_id) => {
    //     const products_id = id
    //     dispatch(addToCart( products_id, quantity, firebase_id))

    //   };
    const handleChange = (event) => {
        setQty(event.target.value);
      };
    // const products = product.slice(0, 1)
    // const products = product.find( item  => { return id === `${item.id}`})
    // console.log("product title", products)



    return (
      <Grid className={classes.root}>
         {loading || error ? <CircularProgress/> : 
         <div>
          <div className={classes.wrapper}>
                
              <Grid className={classes.imageContainer}> 
       
        {/* <Typography className={classes.mobileTitle}>{product.title}</Typography> */}
        
            <img className={classes.img} src={product.images} alt={product.title}/>
            <Typography className={classes.title} component="h3">{product.title}</Typography>

            {/* { admin && loggedIn ?

          <Grid className={classes.adminBtn}>
            <IconButton aria-label="delete" > <Delete /> </IconButton>    
            <IconButton aria-label="edit"> <Edit /> </IconButton>              
          
          </Grid> 
        
          : null } */}
          </Grid>
          <Grid className={classes.container}>
              <Grid className={classes.content}>
                  {/*TODO: UNCOMMENT ID SO THAT ADMIN CAN SEE */}
                  {/* <Typography>{product.id}</Typography> */}
                  <Grid className={classes.contentTop}>
                    <Grid className={classes.delivery}>
                      <LocalShippingOutlined className={classes.deliveryIcon}/>
                      <Typography className={classes.deliveryText} >Professional delivery to Austin, Waco, Kileen, Houston</Typography>
                    </Grid>
                    <Grid className={classes.availableColors}>
                    <Typography className={classes.colorText} component="h2">Color</Typography>

                    {colors.map((color) => (
                      <div key={color.colors} className={classes.colorsContainer}>
                        {/* <Tooltip title={`${color.colors}`} style={{border: "1px solid red"}} className={classes.color}>
  <Button aria-label={color.colors} >
  </Button>
</Tooltip> */}
  {/* <Tooltip className={classes.color} style={{ border: "1px solid black"}}  title={color.colors} placement="top-start"> */}
            <Button className={classes.color} aria-label={color.colors} style={{backgroundColor: `${color.colors}`, border: "1px solid black"}} className={classes.color} onClick={() => setColor(`${color.colors}`)}></Button>
          {/* </Tooltip> */}
<span className={classes.span}>{color.colors}</span>
                        {/* <div className={classes.color} aria-label={color.colors} style={{backgroundColor: `${color.colors}`}}></div> */}
                      </div>))} 
                    </Grid>
                    <Grid className={classes.priceTop}>
                      <Grid className={classes.priceText}>
                          <Typography Typography className={classes.price}>${product.price}</Typography>
                          <Link to="https://consumer.snapfinance.com/#/?mid=490237487" className={classes.financing}>Financing options available.</Link>
                      </Grid>
                      <Grid className={classes.cartGrid}>
                        <Button aria-label="add to cart" className={classes.btn} onClick={() => {dispatch(addToCart(id,  firebase_id, product.price, color)); props.history.push(`/cart/{firebase_id}`)}}>Add to cart</Button>

                      </Grid>

                    </Grid>
                    {/* <Typography className={classes.title} component="h3">{product.title}</Typography> */}
                  </Grid>
                  {/* <Grid className={classes.description}>
                  <Typography className={classes.sectionHeader} component="h2">Product Description</Typography>

                      <Typography className={classes.paragraph} component="p">{product.description}</Typography>
                  </Grid> */}
                  {/* <Grid className={classes.availableColors}>
                  <Typography className={classes.sectionHeader} component="h2">Available Colors</Typography>
                                  
                  </Grid> */}

                  {/* <Grid className={classes.bottom}>
                  <Typography className={classes.sectionHeader} component="h2">Select Quantity</Typography>

                    <Select qty={quantity} handleChange={handleChange}/>
                  </Grid> */}
              </Grid> 
          </Grid> 
         
          {/* <Grid>
              <Button aria-label="add to cart" className={classes.btn} onClick={() => {dispatch(addToCart(id,  firebase_id, product.price, color)); props.history.push(`/cart/{firebase_id}`)}}>Add to cart</Button>
    
        
          </Grid> */}
          
            

          </div>
          <div className={classes.bottomWrapper} style={{marginTop: "2rem"}}>
            <Grid className={classes.description}>
                  <Typography className={classes.sectionHeader} component="h2">Product Description</Typography>

                      <Typography className={classes.paragraph} component="p">{product.description}</Typography>
                  </Grid>
          </div>
          </div>
   }
  
      </Grid>
  


)
   
    
};

export default withRouter(ProductDetail);







// import React, {useEffect, useState} from "react";
// import {withRouter} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import  queryString from "query-string";
// import {getProductsBy} from "./../../Store/Actions/products";
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from '@material-ui/core/Grid';

// const useStyles = makeStyles(theme => ({
//     root: {
//       flexGrow: 1,
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       border: "5px solid green",
//       marginTop: "2rem",
//       [theme.breakpoints.down('sm')]: {
//         height: "70%",
//       }
//     },
  
//   }));
// const ProductDetail = (props) => {
//     console.log("props:", props)
//     const dispatch = useDispatch();
//     const product = useSelector(state => state.product.products)
//     const parsed = queryString.parse(props.location.search)
//     const col = "id"
//     const filter = props.match.params.id;
//     const classes = useStyles();
   
//     console.log("filter:", filter)

//     useEffect(() => {
//         dispatch(getProductsBy(col, filter))
       
//         return () => {
//             console.log("unsubscribe ");
//           };
//     }, [dispatch]);

//     console.log("product by", product)

//     return (

//         <Grid>
// products 
// name {product.title} 
// desctiption {product.description}
// price: {product.price}


//         </Grid>
//     )
// };

// export default withRouter(ProductDetail);
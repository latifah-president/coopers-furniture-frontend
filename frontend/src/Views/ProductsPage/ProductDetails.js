import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import  queryString from "query-string";
import {getProductsBy} from "../../Store/Actions/products";
import {addToCart} from "../../Store/Actions/users";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography, Button } from "@material-ui/core";
import {fontColor, greenColor, whiteColor, yellowColor} from "../../GlobalStyles/styles";
import Select from "./../../Containers/Select/QuantitySelect";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      display: "flex",
        color: `${fontColor}`,
      justifyContent: "center",
      alignItems: "center",
    // border: "5px solid green",
      margin: "4rem auto 0 auto",
      [theme.breakpoints.down('xs')]: {
        flexDirection: "column",
        height: "100vh",
        margin: " 0 auto",
      }
    },
    wrapper: {
      //  border: "1px solid red",
      display: "flex",
      width: "80%",
      [theme.breakpoints.down('xs')]: {
        flexDirection: "column",
        height: "100vh",
        // margin: " 0 auto",
      }
    },
    container: {
        width: "50%",
        height: 300,
        // border: "1px solid red",
        display: "flex",
        flexDirection:"column",
        justifyContent: "space-around",
        alignItems:"center",
        padding: "1rem",
        margin: "0 auto",
        [theme.breakpoints.down('xs')]: {
            width: "90%",
            // border: "1px solid green"

          }
    },
    img: {
        // border: "3px solid green",
        height: 300,
        width: "60%",
        margin: "0 auto",
        [theme.breakpoints.down('xs')]: {
            width: "95%",
          }
    },
    content: {
        // border: "1px solid blue",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            marginTop: "18rem",
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
        marginTop: "4rem",
    },
    btn: {
        // border: `1.5px solid ${goldColor}`,
        color: `${whiteColor}`,
        backgroundColor: `${greenColor}`,
        "&:hover": {
            color: `${whiteColor}`,
        backgroundColor: `${greenColor}`
        },
        width: "45%",
        marginTop: "2rem",
        [theme.breakpoints.down('xs')]: {
           width: "40%",
        //    height: 100,
          }
    },
    title: {
        fontSize: "1.2rem",
        [theme.breakpoints.down('xs')]: {
            display: "none"
          }
    },
    mobileTitle: {
        margin: "2rem",
        fontSize: "2rem",
    },
    price: {
        fontSize: "1.3rem",
        color: `${greenColor}`,
        // border: `1.5px solid ${goldColor}`,
        width: "45%",
        marginTop: "1rem"

    },
    description: {
        fontSize: "1uryjrem",
        marginTop: "2rem"
    },
    hr: {
        width: "100%", 
        border: `1px solid ${yellowColor}`,
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
            marginTop: "3rem",
            alignItems: "center"
        }
    },
    
  }));

const ProductDetail = (props) => {
    const dispatch = useDispatch();
    const firebase_id = useSelector(state => state.user.firebase_id);
    const product = useSelector(state => state.product.products);
    const admin = useSelector(state => state.user.admin);
    const loggedIn = useSelector(state => state.user.loggedIn);
    const col = "id"
    const id = props.match.params.id;
    const [quantity, setQty] = useState(1);
    const classes = useStyles();
    const loading = useSelector(state => state.product.loading);
    const error = useSelector(state => state.product.error);

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
        {loading || error ? <CircularProgress/> : <div className={classes.wrapper}>
          {/* <Grid className={classes.imageContainer}>         */}
       {/* <Typography className={classes.mobileTitle}>{product.title}</Typography> */}
       
       <img className={classes.img} src={product.image_url} alt={product.title}/>
   {/* </Grid> */}
   <Grid className={classes.container}>
       <Grid className={classes.content}>
           {/*TODO: UNCOMMENT ID SO THAT ADMIN CAN SEE */}
           {/* <Typography>{product.id}</Typography> */}
           <Typography className={classes.title}>{product.title}</Typography>
           <hr className={classes.hr} />
           <Typography className={classes.description}>{product.description}</Typography>
           <Grid className={classes.bottom}>
           <Select qty={quantity} handleChange={handleChange}/>
           <Typography className={classes.price}><span style={{color: `${fontColor}`, fontSize: ".8rem"}}>Price:</span> $ {product.price * quantity}</Typography>
           </Grid>
           {admin && loggedIn ?
       <Grid className={classes.adminBtn}>
           <Button aria-label="delete this product" className={classes.btn}>Delete</Button>
           <Button aria-label="edit this product" className={classes.btn}>Edit</Button>
       </Grid> :     
           <Button aria-label="add to cart" className={classes.btn} onClick={() => {dispatch(addToCart(product.id, quantity, firebase_id, product.price*quantity)); props.history.push(`/profile/${firebase_id}/cart`)}}>Add to cart</Button>
 
       }
 
       </Grid>
 
      
   </Grid> </div>}
       
       
       
          
  </Grid> 
      
  

  // </Grid> 

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
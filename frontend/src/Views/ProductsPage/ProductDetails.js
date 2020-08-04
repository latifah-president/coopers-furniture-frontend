import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProductsBy, deleteProduct, setUpdate} from "../../Store/Actions/products";
import {addToCart} from "../../Store/Actions/users";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography, IconButton, Button, Snackbar } from "@material-ui/core";
import {fontColor, greenColor, whiteColor, offWhiteColor} from "../../GlobalStyles/styles";
import { Edit, Delete, LocalShippingOutlined, CloseOutlined} from  '@material-ui/icons';
import DeleteModal from "./../../Components/Modals/DeleteModal";
import MuiAlert from '@material-ui/lab/Alert';

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
          textAlign: "center",
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
      textTransform: "uppercase",
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
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down('xs')]: { 
        width: "40%",
      }
    },
    bottomWrapper: {
      backgroundColor: `${whiteColor}`,
      display: "flex",
      width: "100%",
      flexDirection: "column",
      boxShadow: "0 2px 5px rgba(0,0,0,.2)",
      [theme.breakpoints.down('xs')]: {
        flexDirection: "column",
        margin: "0rem auto 6rem auto",
      }
    },
    hide: {
      display: "none"
    },
     snackbar: {
    // border: "1px solid red",
    width: '90%',
    position: "absolute",
    top: 130,
    // '& > * + *': {
    //   marginTop: theme.spacing(2),
    // },
  },
  }));

  // function Alert(props) {
  //   return <MuiAlert elevation={6} variant="filled" {...props} />;
  // }
const ProductDetail = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const firebase_id = useSelector(state => state.user.firebase_id);
    const product = useSelector(state => state.product.products);
    const colors = useSelector(state => state.product.colors);
    const admin = useSelector(state => state.user.admin);
    const loggedIn = useSelector(state => state.user.loggedIn);
    const loading = useSelector(state => state.product.loading);
    const error = useSelector(state => state.product.error);
    const errorMsg = useSelector(state => state.product.errorMsg);
    const editSuccess = useSelector(state => state.product.edit);
    const editMsg = useSelector(state => state.product.editMsg);
    const edit = useSelector(state => state.product.edit);
    const deleteMsg = useSelector(state => state.product.deleteMsg);
    const deleteSuccess = useSelector(state => state.product.deleted);

    // eslint-disable-next-line
    const [quantity, setQty] = useState(1);
    const [color_id, setColorId] = useState(0);
    const [image_id, setImageId] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setModalOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    // eslint-disable-next-line
    const [color, setColor] = useState("")

    const col = "id"
    const id = props.match.params.id;

    console.log("color_id", color_id)
    console.log("image_id", image_id)

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const handleModalClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setModalOpen(false);
    };

    useEffect(() => {
       
        const filter = id
            dispatch(getProductsBy(col, filter))
            const deletedProduct = product.map((item) => {
              setColorId(item.color_id)
              setImageId(item.image_id)
            })
      
        return () => {
            console.log("unsubscribe ");
          };
    }, [dispatch, id]);


    const openSnackBar = () => {
      // dispatch(addToCart(id,  firebase_id, product.price, product.color_id, product.image_id))
       setOpen(true)
        // props.history.push(`/profile/${firebase_id}/cart`)

    };

    // const addToCart = (id, quantity, firebase_id) => {
    //     const products_id = id
    //     dispatch(addToCart( products_id, quantity, firebase_id))

    //   };

    const deleteAProduct = () => {
        // eslint-disable-next-line
      const deletedProduct = product.map((item) => {
        setColorId(item.color_id)
        setImageId(item.image_id)
      })
      setModalOpen(true)
    };

    const handleDelete = () => {
      console.log("click")
      dispatch(deleteProduct(id, color_id, image_id));
      // setModalOpen(false);
      props.history.push(`/products`)

      
    };

    const close = () => {
      setSuccess(false)
    };
   
    const updateAProduct = () => {
      dispatch(setUpdate())
    
        props.history.push(`/updateproduct/${id}`)
      
    };

  // const snackBar = () => (
  
  //       <div className={editSuccess ? classes.snackbar : classes.hide}>
       
  // <Alert severity="success" onClose={close} className={classes.alert}>{editSuccess ? `${editMsg}` : `${deleteMsg}`}</Alert>
    
  //       </div>
  //     );

  // const errorSnackBar = () => (
  //   <div className={error ? classes.snackbar : classes.hide}>
    
  //     <Alert severity="error" onClose={close} className={classes.alert}>{errorMsg}</Alert>

  //   </div>
  // );
    // const snackBar = () => (
  
    //   <div>
    //   <Snackbar
    //     anchorOrigin={{
    //       vertical: 'top', 
    //       horizontal: 'center'
    //     }}
    //     open={open}
    //     autoHideDuration={6000}
    //     onClose={handleClose}
    //     message="Product added to cart!"
    //     action={
    //       <React.Fragment>
    //          <Link style={{border: "1px solid white"}} color="secondary" size="small" to="/products">
    //           Continue shopping
    //         </Link>
    //         {/* <Button color="secondary" size="small" onClick={handleClose}>
    //           Continue shopping
    //         </Button> */}
    //         or
    //         <Button color="secondary" size="small" onClick={handleClose}>
    //           Proceed to checkout
    //         </Button>
    //         <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
    //           <CloseOutlined fontSize="small" />
    //         </IconButton>
    //       </React.Fragment>
    //     }
    //   />
    // </div>
    // )


    return (
      <Grid className={classes.root}>
         {loading ? <CircularProgress/> : 
         <div>
          <div className={classes.wrapper}>
            {/* <DeleteModal
              openModal={openModal}
              handleModalClose={handleModalClose}
              handleDelete={handleDelete}
            /> */}
            {/* {snackBar()}
            {errorSnackBar()} */}
          <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top', 
          horizontal: 'center'
        }}
        open={open}
        // autoHideDuration={6000}
        onClose={handleClose}
        message="Product added to cart!"
        action={
          <React.Fragment>
            <Button style={{paddingTop: ".5rem"}} color="secondary" size="small" onClick={() => props.history.push('/products')}>
              Continue shopping
            </Button>
            or
            <Button style={{paddingTop: ".5rem"}} color="secondary" size="small" onClick={() => {loggedIn ? props.history.push(`/profile/${firebase_id}/cart`) : props.history.push(`/signin`)}}>
              Proceed to checkout
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
               {product.map((product) => (
              <Grid key={product.id} className={classes.imageContainer}>         
            <img className={classes.img} src={product.images} alt={product.title}/>
            <Typography className={classes.title} component="h3">{product.title}</Typography>
            { product.out_of_stock ? <Typography className={classes.financing} component="h3">Out of Stock</Typography> : null}

            { admin && loggedIn ?

          <Grid className={classes.adminBtn}>
            <IconButton aria-label="delete" onClick={handleDelete}> <Delete /> </IconButton>    
            <IconButton aria-label="edit" onClick={updateAProduct}> <Edit /> </IconButton>              
          
          </Grid> 
        
          : null }
          </Grid>
            )) } 
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
               
            <Button key={color.id} className={classes.color} aria-label={color.colors} style={{backgroundColor: `${color.colors}`, border: "1px solid black"}} className={classes.color} onClick={() => setColor(`${color.colors}`)}></Button>
            {/*eslint-disable-next-line */}
<span className={classes.span}>{color.colors}</span>
                      </div>))} 
                    </Grid>
                    {product.map((product) => (
                    <Grid key={product.id} className={classes.priceTop}>
                      <Grid className={classes.priceText}>
                          <Typography className={classes.price}>${product.price}</Typography>
                          <a aria-label="Apply Now" target="_blank" rel="noopener noreferrer" href="https://consumer.snapfinance.com/#/?mid=490237487" className={classes.financing}>Financing options available.</a>
                      </Grid>
                      <Grid className={classes.cartGrid}>
                        <Button aria-label="add to cart" className={classes.btn} onClick={() => {
                          dispatch(addToCart(id,  firebase_id, product.price, quantity,  product.color_id, product.image_id)); openSnackBar();
                        }}>Add to cart</Button>

                      </Grid>

                    </Grid> ))}
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
            {product.map((product) => (
            <Grid key={product.id} className={classes.description}>
                  <Typography className={classes.sectionHeader} component="h2">Product Description</Typography>

                      <Typography className={classes.paragraph} component="p">{product.description}</Typography>
                  </Grid>
                  ))}
          </div>
          </div>
   }
  
      </Grid>
  


)
   
    
};

export default withRouter(ProductDetail);
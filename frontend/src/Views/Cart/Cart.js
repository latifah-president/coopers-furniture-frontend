import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { Grid, Typography, Button, CircularProgress } from "@material-ui/core";
import { makeStyles} from "@material-ui/core/styles";
import {getCart, removeFromCart} from "./../../Store/Actions/users";
import {iconColor, whiteColor, fontColor, greenColor} from "./../../GlobalStyles/styles"
// import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';

// const BootstrapInput = withStyles((theme) => ({
//     root: {
//       'label + &': {
//         marginTop: theme.spacing(3),
//       },
//     },
//     input: {
//         color: `${iconColor}`,
//       borderRadius: 4,
//       position: 'relative',
//       backgroundColor: theme.palette.background.paper,
//       border: '1px solid #ced4da',
//       fontSize: 16,
//       padding: '10px 26px 10px 12px',
//       minHeight: 0,
//       transition: theme.transitions.create(['border-color', 'box-shadow']),
//       // Use the system font instead of the default Roboto font.
//       fontFamily: [
//         '-apple-system',
//         'BlinkMacSystemFont',
//         '"Segoe UI"',
//         'Roboto',
//         '"Helvetica Neue"',
//         'Arial',
//         'sans-serif',
//         '"Apple Color Emoji"',
//         '"Segoe UI Emoji"',
//         '"Segoe UI Symbol"',
//       ].join(','),
//       '&:focus': {
//         borderRadius: 4,
//         borderColor: '#80bdff',
//         boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//       },
//     },
//   }))(InputBase);

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
        margin: "5rem auto",
        // border: "1px solid red",
        justifyContent: "space-around",
        width: "100%",
        color: `${fontColor}`,
        [theme.breakpoints.down('lg')]: {
            // border: "1px solid orange",
          
          },
        [theme.breakpoints.down('md')]: {
            // border: "1px solid blue",
          
          },
        [theme.breakpoints.down('sm')]: {
            // border: "1px solid green",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            margin: "2rem auto 4rem auto",
          },
          [theme.breakpoints.down('xs')]: {
            // border: "1px solid yellow",
            width: "98%"
          }
    },
    root: {
        display: "flex",
        // flexDirection: "column",
        justifyContent: "space-around",
        // border: "1px solid red",
        width: "90%",
        [theme.breakpoints.down('lg')]: {
            // border: "1px solid inigo",
          
          },
        [theme.breakpoints.down('md')]: {
            // border: "1px solid violet",
          
          },
        [theme.breakpoints.down('sm')]: {
            // border: "1px solid limegreen",
            width: "80%",
            flexDirection: "column",
            alignItems: "center"
          },
          [theme.breakpoints.down('xs')]: {
            // border: "1px solid brown",
            width: "98%"
          }
        // border: "1px solid orange",

    },
    container: {
        // border: "1px solid purple",
        display: "flex",
        justifyContent: "space-around",
        marginBottom: "2rem",
        [theme.breakpoints.down('xs')]: {
            // border: "1px solid green",
            display: "flex",
            // flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "0",
            marginTop: "1rem",
            // width: "98%"
          }
    },
    cartItem:{
        // border: "2px solid orange",
        // height: 500,
        margin: "2rem",
        [theme.breakpoints.down('sm')]: {
            // border: "2px solid blue",
            width: "100%",
            margin: "0 auto",
            display: "flex",
          },
        [theme.breakpoints.down('xs')]: {
            // border: "2px solid orange",
            margin: "0 auto",
            width: "100%",
            
            // padding: "1rem"

          }
    },
    containerLeft: {
        // border: "3px solid black",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: 300,
        [theme.breakpoints.down('sm')]: {
            // border: "2px solid orange",
            alignItems: "center"
            // width: "80%",
            // height: 200,
            // margin: "0"
          },
        [theme.breakpoints.down('xs')]: {
            // border: "1px solid green",
            height: 150,
            // alignItems: "center",
            width: "80%",
            
            // marginRight: "6rem",
          }
    },
    img: {
        // height: "100%",
        width: "100%",
        [theme.breakpoints.down('sm')]: {
            // border: "2px solid orange",
            width: "80%",
            height: 200,
            // margin: "0"
          },
        [theme.breakpoints.down('xs')]: {
            // border: "1px solid blue",
            height: 120,
            width: "90%",
            // margin: "0 auto"
            // width: "98%"
          }
        // border: "1px solid green"

    },
    containerCenter: {
        // border: "1.5px solid violet",
        width: "100%",
        padding: "2rem",
        textTransform: "uppercase",
        color: `${fontColor}`,
        [theme.breakpoints.down('xs')]: {
            // border: "1px solid orange",
            // alignItems: "center",
            width: "90%",
            display: "flex",
            padding: "0",
            justifyContent: "flex-start",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "4rem"
            // padding: "1rem"
          }
    },

    containerRight: {
        // border: "1px solid green",
        marginLeft: "2rem",
        width: "18%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        [theme.breakpoints.down('sm')]: {
            // border: "1px solid green",
            alignItems: "flex-start",
            marginLeft: "5rem",
            paddingTop: "2rem",
            width: "40%",
            justifyContent: "center"
          },
          [theme.breakpoints.down('xs')]: {
            // border: "1px solid green",
            alignItems: "center",
            display: "flex",
            width: "40%",
            justifyContent: "center",
            flexDirection: "row",
            paddingTop: ".5rem",
            alignSelf: "flex-start",
            // marginRight: "4rem",
            // marginTop: "2rem"
            margin: 0,
          }
    },
    hr: {
        width: "90%",
        margin: "0 auto",
        [theme.breakpoints.down('xs')]: {
           display: "none",
          }
    },
    heading: {
        // border: "1px solid green",
        width: "100%",
        maxWidth: "85%",
        display: "flex",
        flexDirection: "column",
    },
    header: {
        fontSize: "2rem",
        fontWeight: 700,
        color: `${fontColor}`,
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.5rem",
            margin: "o auto",
            textAlign: "center"
            // border: '1px solid red'
        }
    },
    title: {
        fontSize: "1.3rem",
        fontWeight: 900,
        color: `${fontColor}`,
        [theme.breakpoints.down("xs")]: {
            fontSize: ".8rem",
            // border: '1px solid red',
            margin: "0 auto"
        }
        // fontFamily:  "Arial",
        // textTransform: "capitalize"
    },
   
    price: {
        fontSize: ".8rem",
        textAlign: "end",
        width: "98%",
        // fontWeight: 900,
        // border: "1px solid red",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            
        },
        [theme.breakpoints.down("xs")]: {
            display: "none",
        }
    },
    summary: {
        border: "1.3px solid #d3d2d2",
        textTransform: "uppercase",
        // backgroundColor: `#FAFAFA`,
        // color: `${whiteColor}`,
        width: "40%",
        // maxWidth: "60%",
        height: 350,
        maxHeight: 350,
        [theme.breakpoints.down('sm')]: {
            height: 250,
            alignSelf: "flex-end",
            width: "100%",
            margin: "4rem 0rem",
        },
        [theme.breakpoints.down('xs')]: {
            height: 250,
            alignSelf: "center",
            
            marginTop: "2rem",
        }
        // padding: "1rem"
    },
    summaryContainer: {
        backgroundColor: "#d3d2d2",
        // border: "1px solid red"
    },
    summaryTitle: {
        fontSize: "1.5rem",
        fontWeight: 700,
        textAlign: "center",
       
    },
    summaryContent: {
        // border: "1px solid red",
        margin: "2rem 1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        [theme.breakpoints.down("sm")]: {
            margin: "1rem"
        },
        [theme.breakpoints.down("xs")]: {
            margin: ".5rem"
        }
    },
    summaryContentTop: {
        // border: "1px solid red",
        margin: "2rem 1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        [theme.breakpoints.down('md')]: {
            display: "none",
        }
    },
    subTotal: {
        display: "flex",
        justifyContent: "space-between",
        // border: "1px solid orange",
        textTransform: "uppercase",
        

    },
    span: {
        alignSelf: "flex-end",
        color: `${iconColor}`
    },
    subTitle: {
        fontWeight: 700,
        marginBottom: "1rem",
        fontSize: ".9rem"

    },
    total: {
        fontSize: "1.3rem",
        fontWeight: 900,
        // fontFamily:  "Arial",
        // textTransform: "capitalize",
        // textAlign: "end",
        // width: "98%"
    },
    btnContainer: {
        display: "flex",
        justifyContent: "center"
    },
    btn: {
        color: `${whiteColor}`,
        backgroundColor: `${iconColor}`,
        margin: "1rem auto", 
        width: "80%",
        fontWeight: 700,
        // border: "1px solid red",
        "&:hover": {
            backgroundColor: `${iconColor}`,
        }
    },
    margin: {
        marginTop: "2rem",
        [theme.breakpoints.down('xs')]: {
            marginTop: "0"
        }
    },
    delete: {
        // border: "1px solid pink",
        height: 25,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 15,
            minWidth: 4,
            
        },
        // [theme.breakpoints.down('xs')]: {
        //     display: "none"
        // }
    },
    mobileDelete: {
        display: "none",
        
        [theme.breakpoints.down('xs')]: {
            display: "block",
            height: 25,
            // border: "1px solid green",
            width: "30%",
            alignSelf: "flex-start",
           paddingLeft: "1rem"
        }
    },
    mobileItemPrice: {
        display: "none",
        
        [theme.breakpoints.down('xs')]: {
            display: "block",
            fontSize: "1rem",
            fontWeight: 550
        }
    },
    mobileDeleteBtn: {
        // border: "1px solid red",
    },
    itemPrice: {
        fontWeight: 700,
        [theme.breakpoints.down('xs')]: {
            display: "none",
            
        }
    },
    cartList: {
        maxWidth: 887,
    }
}) )
const Cart = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const id = props.match.params.firebase_id;
    const cart = useSelector(state => state.user.cart);
    const firebase_id = useSelector(state => state.user.firebase_id);
    const loading = useSelector(state => state.user.loading);
    const deleted = useSelector(state => state.user.deleted);

    // const [total, setTotal] = useState(0);
    const cartQantity = cart.length;
    // const [qty, setQty] = useState(1);
    const total = useSelector(state => state.user.total);

// const handleChange = (event) => {
//     setQty(event.target.value);
// };
const deleteItem = (item_id) => {
       
    dispatch(removeFromCart(item_id));
};

    useEffect(() => {
        console.log("rendering")
        dispatch(getCart(id))
        return () => {
            console.log("unsubscribe");
          };
    },[dispatch, id, deleted]);

    return (
        <Grid className={classes.wrapper}>
        {loading ? <CircularProgress/> : 
        <Grid className={classes.root}>
      
            <div className={classes.cartList}>
                  <Grid className={classes.heading}>
            
            <Typography className={classes.header} component="h6">Shopping Cart ({cartQantity} Items)</Typography>
            <Typography className={classes.price} component="p" varient="body1">Price</Typography>
            <hr style={{width: "107%"}} className={classes.hr}/>
        </Grid>
                 {loading ? <CircularProgress/> : cart.map((item, key) => (
            <Grid key={key} className={classes.cartItem}>
                <Grid className={classes.container}>
                    <Grid className={classes.containerLeft}>
                        <img className={classes.img} src={item.image_url} alt={item.title}/>
                        {/* <Grid className={classes.mobileDelete}>
                        <Button aria-label="delete product from cart" className={classes.mobileDeleteBtn} type="submit"  onClick={() => {deleteItem(item.id)}}>
                        
                            <CloseIcon />
                   
                        </Button>
                    </Grid> */}
                    </Grid>
                    <Grid className={classes.containerCenter}>
                        <Typography className={classes.title}>{item.title}</Typography>
                        <Typography component="p" varient="body1" className={classes.mobileItemPrice}>$ { item.price }</Typography>

                    </Grid>
                    <Grid className={classes.containerRight}>
                        <Typography component="p" varient="body1" className={classes.itemPrice}>$ { item.price }</Typography>
                        {/* <Button aria-label="delete button from cart" className={classes.delete} type="submit"  onClick={() => {dispatch(removeFromCart(item.id)); deleteItem()}}> */}
                        <Button aria-label="delete button from cart" className={classes.delete} type="submit"  onClick={() => {deleteItem(item.id)}}>

                            <CloseIcon />
                   
                        </Button>
                    </Grid>
                </Grid>
                <hr  className={classes.hr}/>

            </Grid>

        ))}
            </div>
        
    
        <Grid className={classes.summary}>
            <Grid className={classes.summaryContainer}>
            <Typography className={classes.summaryTitle} component="h2">Summary</Typography>      

            </Grid>
            <Grid className={classes.summaryContent}>
                <Grid className={classes.subTotal}>
                    <Typography component="h4" className={classes.subTitle}>Subtotal </Typography>
                    <Typography style={{color: `${iconColor}`}}  className={`${classes.span} ${classes.subTitle}`}>${total}</Typography>
                </Grid>
                <Grid className={classes.subTotal}>
                <Typography className={classes.subTitle}  component="h4">Estimated Shipping</Typography> 
                <Typography style={{color: `${iconColor}`}} className={`${classes.span} ${classes.subTitle}`}>Free</Typography>
                </Grid>
            </Grid>
        
        <hr className={classes.hr}/>
        <Grid className={classes.summaryContent}>
            <Grid className={classes.subTotal}>
                <Typography className={`${classes.subTitle} ${classes.total}`} component="h6">Total </Typography>
                <Typography style={{color: `${greenColor}`}} className={`${classes.span} ${classes.subTitle}`}> $ {total }</Typography>
            </Grid> 
            <Grid className={classes.btnContainer}>
            <Button aria-label="place order" className={classes.btn} type="submit" onClick={() => props.history.push(`/profile/${firebase_id}/bookorder`)}>Place Order</Button>
        </Grid>
        </Grid> 
          
        </Grid>

        </Grid>
        
        }
       
        </Grid>
    
    )
};

export default withRouter(Cart);
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {withRouter} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, CircularProgress,} from '@material-ui/core';
import OrderForm from "./../../Containers/Forms/Orders";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import {getCart, getById, removeFromCart} from "./../../Store/Actions/users";
import {fontColor, greenColor, iconColor, whiteColor} from "./../../GlobalStyles/styles";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { addOrder } from '../../Store/Actions/orders';
import { Email } from '@material-ui/icons';
import OrderModal from "./../../Components/Modals/ConfirmOrderModals";
import {getAgentById} from "./../../Store/Actions/agent";
import OrderConfirmation from "./../Order/OrderConfirmation";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    root: {
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
        // border: "2px solid green",
        // width: "100%",
        // marginTop: "2rem",
        [theme.breakpoints.down('sm')]: {
            // flexDirection: "column",
            // alignItems: "center",
            width: "90%",
            // padding: ".5rem"
           }
    },
    wrapper: {
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,.2)",
        width: "90%",
        padding: "2rem",
        margin: "2rem auto",
        [theme.breakpoints.down('sm')]: {
           flexDirection: "column",
           alignItems: "center",
           width: "90%",
           padding: ".5rem"
          }
    },
    container: {
        //  border: "1px solid purple",
         width: "100%",
         display: "flex",
         [theme.breakpoints.down('sm')]: {
            width: "100%",
            flexDirection: "column",
           
          },
    },
    cartItem:{
         display: "flex",
        // height: 500,
        margin: "2rem",
        [theme.breakpoints.down('sm')]: {
            // border: "2px solid blue",
            width: "100%",
            margin: "1rem",
            border: `1px solid ${greenColor}`,
            // padding: ".5rem"

          },
        [theme.breakpoints.down('xs')]: {
            // border: "2px solid orange",
            alignItems: "center",
            justifyContent: "center",
            margin: "1rem",
            width: "100%",
            
            // padding: "1rem"

          }
    },
    containerLeft: {
        // border: "3px solid black",
        display: "flex",
        justifyContent: "space-between",
        // width: "50%",
        height: 300,
        [theme.breakpoints.down('sm')]: {
            alignItems: "center"
           
          },
        [theme.breakpoints.down('xs')]: {
            // border: "1px solid green",
            height: 200,
            // alignItems: "center",
            width: "100%",
            
            // marginRight: "6rem",
          }
    },
    img: {
        // height: "100%",
        width: "100%",
        maxHeight: 250,
        minHeight: 200,
        [theme.breakpoints.down('sm')]: {
            // border: "2px solid orange",
            width: "80%",
            height: 200,
            // margin: "0"
          },
        [theme.breakpoints.down('xs')]: {
            // border: "1px solid blue",
            // height: 150,
            width: "100%",
            margin: "0 auto"
            // width: "98%"
          }
        // border: "1px solid green"

    },
    containerCenter: {
        // border: "1.5px solid violet",
        // width: "100%",
        padding: "2rem",
        textTransform: "uppercase",
        color: `${fontColor}`,
        [theme.breakpoints.down('xs')]: {
            // border: "1px solid orange",
            // alignItems: "center",
            width: "90%",
            display: "flex",
            padding: "0",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem"
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
        alignItems: "flex-start",
        [theme.breakpoints.down('sm')]: {
            // border: "1px solid green",
            alignItems: "center",
            marginLeft: "5rem",
            width: "20%",
            justifyContent: "center"
          },
          [theme.breakpoints.down('xs')]: {
            // border: "1px solid green",
            alignItems: "center",
            display: "flex",
            width: "40%",
            justifyContent: "center",
            flexDirection: "row",
            marginRight: "4rem",
            marginTop: "2rem"
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
        fontSize: "1rem",
        fontWeight: 700,
        color: `${fontColor}`,
        [theme.breakpoints.down("xs")]: {
            fontSize: ".7rem",
            // border: '1px solid red',
            margin: "0 auto",
            fontWeight: 500,
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
    cart: {
        overflow: "scroll",
        height: 500,
       
        alignSelf: "flex-start",
        width: "40%",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            margin: "0 auto",
        }
    },
    orderForm: {
        margin: "0 auto",
        width: "55%",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        }
    },
    item: {
        display: "flex",
        flexDirection: "column",
        // border: "1px solid red",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            flexDirection: "row",
            overflow: "scroll",
            boxShadow: "0 2px 5px rgba(0,0,0,.2)",
        }
    },
    chevron: {
     display: "none",
        [theme.breakpoints.down("xs")]: {
            alignSelf: "center",
            fontSize: "2.5rem",
        }
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
}))


const BookOrder = (props) => {
    const classes = useStyles();
    const loading = useSelector(state => state.user.loading)
    const dispatch = useDispatch();
    const id = props.match.params.firebase_id;
    const cart = useSelector(state => state.user.cart);
    const firebase_id = useSelector(state => state.user.firebase_id);
    // const loading = useSelector(state => state.user.loading);
    const [success, setSuccess] = useState(false);

    const total = useSelector(state => state.user.total);
    const agent_id = useSelector(state => state.agent.agent_id);
    const agent = useSelector(state => state.user.agent);

    const cartQantity = cart.length;
    const [order_items, setOrder] = useState([]);
console.log("id", id)

//customer info
// const success = useSelector(state => state.order.success)
const [email, setEmail] = useState("");
const [first_name, setFirstName] = useState("");
const [last_name, setLastName] = useState("");
const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [state, setState] = useState("");
const [zip, setZip] = useState("");
const [phone, setPhone] = useState('(  )    -    ')
const [cash_app_name, setCashApp] = useState('')
const [errorMsg, setErrorMsg] = useState("");
const [error, setError] = useState(false);
const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);

  console.log("agent_id", agent_id)
//   console.log("last", last_name)
//   console.log("address", address)

useEffect(() => {
    // const id = firebase_id
    if (agent === true) {
    dispatch(getAgentById(id))}
    
    return () => {
        console.log("unsubscribe");
      };
},[]);
  

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        props.history.push(`${props.match.path}/settings`)
      };


    const bookorder = (e) => {
        e.preventDefault()
       
        console.log("book order cart", cart)
        // order_items.concat(element)
        // let orders = cart.map(element => {
           
        //     console.log("element", element)
        //    return  order_items.concat(element)
        // })
        setOrder(cart)
        setOpen(true)
        // const orderObj = {
        //     order_total:  total,
        //     customer_email: email,
        //     customer_first_name: first_name,
        //     customer_last_name: last_name,
            
        //     customer_address: address,
        //     customer_city: city,
        //     customer_state: state,
        //     customer_zip: zip,
        //     customer_phone: phone,
        //     product_id: 13,
        //     status: "in progress",
        //     agent_id: id,
        //     notes: notes,
           
        // }
        // 
        // props.history.push(`profile/${firebase_id}/confirmation`)

    }
    console.log("oder function", order_items)

  const orderObj = {
        order_total:  total,
        customer_email: email,
        customer_first_name: first_name,
        customer_last_name: last_name,
        
        customer_address: address,
        customer_city: city,
        customer_state: state,
        customer_zip: zip,
        customer_phone: phone,
        product_id: 12,
        status: "in progress",
        agent_id: agent_id,
        notes: notes,
     

    }

    const bookOrder = () => {
        dispatch(addOrder(orderObj, order_items))
        setOpen(false)
        setSuccess(true)
        props.history.push(`/products`)
    }
    console.log("orderobj", orderObj)
console.log("SUCCESS", success)
  
    return (
        <Grid className={classes.root}>
            {loading ? <CircularProgress/> : 
            <Grid className={classes.wrapper}>
              
                {/* <div className={classes.cart}>
                  <Grid className={classes.heading}>
            
            <Typography className={classes.header} component="h6">Shopping Cart ({cartQantity} Items)</Typography>
            <Typography className={classes.price} component="body2">Price</Typography>
            <hr style={{width: "107%"}} className={classes.hr}/>
        </Grid>
        <Grid className={classes.item}>
        <ChevronLeftIcon className={classes.chevron}/>

                 {loading ? <CircularProgress/> : cart.map((item, key) => (
            <Grid key={key} className={classes.cartItem}>
                <Grid className={classes.container}>
                    <Grid className={classes.containerLeft}>
                        <img className={classes.img} src={item.image_url}/>

                    </Grid>
                    <Grid className={classes.containerCenter}>
                        <Typography className={classes.title}>{item.title}</Typography>
                        <Typography component="p" varient="p" className={classes.itemPrice}>$ { item.price }</Typography>

                    </Grid>
                    <Grid className={classes.containerRight}>
                        <Button aria-label="delete button from cart" className={classes.delete} type="submit"  onClick={() => {dispatch(removeFromCart(item.id)); deleteItem()}}>
                        
                            <CloseIcon />
                   
                        </Button>
                    </Grid>
                </Grid>

            </Grid>

        ))}
        <ChevronRightIcon className={classes.chevron}/>
        </Grid>
            </div> */}
                <div className={classes.orderForm}>
                <OrderForm
                    first_name={first_name}
                    setFirstName={setFirstName}
                    last_name={last_name}
                    setLastName={setLastName}
                    email={email}
                    setEmail={setEmail}
                    // password={password}
                    // setPassword={setPassword}
                    address={address}
                    setAddress={setAddress}
                    city={city}
                    setCity={setCity}
                    state={state}
                    setState={setState}
                    zip={zip}
                    setZip={setZip}
                    phone={phone}
                    setPhone={setPhone}
                    cash_app_name={cash_app_name}
                    setCashApp={setCashApp}
                    notes={notes}
                    setNotes={setNotes}
                />
                <Button className={classes.btn} aria-label="confirm order" type="button" onClick={bookorder}>Confirm Order</Button>
                {/* <button type="button" onClick={e => dispatch(addOrder(orderObj, order_items))}>book order</button> */}

                </div>
              <OrderModal
                open={open}
                handleClose={handleClose}
                handleClickOpen={handleClickOpen}
                first_name={first_name}
                last_name={last_name}
                email={email}
                address={address}
                city={city}
                state={state}
                zip={zip}
                phone={phone}
                order_items={order_items}
                bookOrder={bookOrder}
                success={success}
                setSuccess={setSuccess}
              />
                {/* <Grid> */}
                
                {/* </Grid> */}
            </Grid>
            }
        </Grid>
        
    )
};

export default withRouter(BookOrder);
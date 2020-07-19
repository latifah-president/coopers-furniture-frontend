import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { GridList, Grid, GridListTile, CircularProgress, GridListTileBar, Typography, } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import {getOrders, getOrdersByAgentId} from "./../../Store/Actions/orders";
import InfoIcon from '@material-ui/icons/InfoRounded';
import { green } from "@material-ui/core/colors";
import { greenColor } from "../../GlobalStyles/styles";
import {initAuth} from "./../../Store/Actions/users"
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
    },
    agentInfo: {
      borderTop: `1px solid ${greenColor}`
    }
  }));

const ProducstList = (props) => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.order.order);
    const images = useSelector(state => state.product.images);
    const admin =  useSelector(state => state.user.admin);
    const agent =  useSelector(state => state.user.agent);
    const agent_id = useSelector(state => state.agent.agent_id);
    const classes = useStyles();
    const loading = useSelector(state => state.product.loading);
    const error = useSelector(state => state.product.error);
  console.log("agent_id", agent_id)

    useEffect(() => {
      if (admin === true) {
        dispatch(getOrders())
      } else if (agent === true) {
        dispatch(getOrdersByAgentId(agent_id))
      }
      
      return () => {
          console.log("unsubscribe ");
        };
  }, []);

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
        {loading ? <CircularProgress/> : orders.map((order) => (
          <Grid className={classes.tile} key={order.id}>
              <Typography>Order Number: {order.id}</Typography>

              <Typography>Customer Name: {order.customer_first_name} {order.customer_first_name}</Typography>
              <Typography>Customer Email: {order.customer_email}</Typography>
              <Typography>Customer Address: {order.customer_address} {order.customer_city} {order.customer_state} {order.customer_zip}</Typography>
              <Typography>Order Details: {order.title} {order.price}  </Typography>
              <Typography>Order Total: {order.order_total}</Typography>
<Grid className={classes.agentInfo}>
        <Typography>Agent Name: {order.first_name} {order.first_name}</Typography>
        <Typography>Agent Email: {order.email} </Typography>

        <Typography>Ca$htag: {order.cash_app_name} </Typography>

</Grid>
          </Grid>
        ))}
      </GridList>
    </div>
  );


    
    
};

export default withRouter(withWidth()(ProducstList));


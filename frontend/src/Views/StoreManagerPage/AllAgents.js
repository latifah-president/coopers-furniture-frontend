import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { GridList, GridListTile, CircularProgress, GridListTileBar, } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import {getProducts} from "./../../Store/Actions/products";
import InfoIcon from '@material-ui/icons/InfoRounded';
import { Email } from "@material-ui/icons";
import { getAgents } from "../../Store/Actions/admin";

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
    const agents = useSelector(state => state.admin.agents);

    const classes = useStyles();
    const loading = useSelector(state => state.admin.loading);
    const error = useSelector(state => state.admin.error);

    useEffect(() => {
      
      dispatch(getAgents())
      
      return () => {
          console.log("unsubscribe ");
        };
  }, [dispatch]);

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
        {loading ? <CircularProgress/> : agents.map((agent) => (
          <GridListTile className={classes.tile} key={agent.agent_id}>
           <div>
           Agent ID: {agent.agent_id}
             Agent Name: {agent.first_name} {agent.last_name}
             Agent Email: {agent.email}
             Agent $Cashtag: {agent.cash_app_name}
             Agent Phone: {agent.phone}
             Agent Address: {agent.address}
             Agent City: {agent.city}
             Agent State: {agent.state}
             Agent Zip: {agent.zip}
           </div>
            
          </GridListTile>
        ))}
      </GridList>
    </div>
  );


    
    
};

export default withRouter(withWidth()(ProducstList));


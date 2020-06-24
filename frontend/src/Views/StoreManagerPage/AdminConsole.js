import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Switch, Route, withRouter} from "react-router-dom";
import AddProductPage from "./../AddProductPage/AddProduct";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from "./../../Components/Admin/Drawer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    //  border: "1px solid blue",
    width: "100%",
    
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));


const AdminConsole = (props) => {
    const classes = useStyles()
    console.log("prams", props.match.path)
    return (
        <Drawer>
          <div className={classes.root}>
            {/* <Switch> */}
            <Route path={`${props.match.path}/admin/addproduct`} exact={true} component={AddProductPage} />
            <Route path={`${props.match.path}/bookorder`} exact={true} component={AddProductPage} />

            {/* </Switch> */}

          </div>

        </Drawer>
 
    )
};

export default withRouter(AdminConsole);
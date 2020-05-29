import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {withRouter} from "react-router-dom";
import Aux from "./../../HOC/Aux";
import {useSelector} from "react-redux"
import { Grid } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Portal from '@material-ui/core/Portal';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {getProductsBy} from "./../../Store/Actions/products";

const useStyles = makeStyles((theme) => ({
  dropdown: {
    position: 'fixed',
    width: 200,
    top: "18.7%",
    left: '0%',
    // transform: 'translate(-50%, -50%)',
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  btn: {
    color: "white",
    fontSize: "1.3rem"
  },
  icon: {
    fontSize: "2rem",
    color: "#F2CC7E",
  }
}));

const CategoryNav = (props) => {
    const categories = useSelector(state => state.product.products);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleClick = () => {
      setOpen((prev) => !prev);
    };
  
    const handleClickAway = () => {
      setOpen(false);
    };

    const getByCategory = (col, filter) => {
      dispatch(getProductsBy(col, filter))
    };

    return (
      <ClickAwayListener onClickAway={handleClickAway}>
      <div >
        <Button className={classes.btn} type="button" onClick={handleClick}>
          DEPARTMENTS
          <ArrowDropDownIcon className={classes.icon}/>
        </Button>
        {open ? (
          <Portal>
            <div className={classes.dropdown}>
              <List component="nav" aria-label="Departments Menu">
              {categories.map((category, key) => (
                console.log(key),
                <ListItem button onClick={() => props.history.push(`/products/?col=category&filter=${category.category}`)}>
                  <ListItemText key={category.id} primary={category.category} />
                </ListItem>
              ))} 
              </List>         
            </div>
          </Portal>
        ) : null}
      </div>
    </ClickAwayListener>
    )
};

export default withRouter(CategoryNav);



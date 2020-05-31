import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Portal from '@material-ui/core/Portal';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Divider from '@material-ui/core/Divider';
import { getProducts } from "./../../Store/Actions/products";

const useStyles = makeStyles((theme) => ({
  dropdown: {
    position: 'fixed',
    width: 300,
    top: "18.7%",
    left: '.5%',
    border: '1px solid #0C1D33',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textTransform: "uppercase",
    [theme.breakpoints.down('sm')]: { 
      top: "20.5%",
      left: '2%',
    }
  },
  btn: {
    color: "white",
    fontSize: "1.3rem",
    textDecoration: "none"
  },
  icon: {
    fontSize: "2rem",
    color: "#F2CC7E",
  },
  listItem: {
    width: "100%",
    // border: "1px solid red",
    padding: 0
  },
  listItemText: {
    width: "100%",
    // border: "1px solid green",
    listStyle: "none",
    color: "#374F71",
    cursor: "pointer",
  },
  divider: {
    width: "100%", 
    color: "#EA4D1F",
    // marginTop: "1rem", 
  }
}));

const categories = ["Living Room", "Dining Room", "Bedrooms", "Bunkbeds", "Mattresses"]

const CategoryNav = (props) => {
    const products = useSelector(state => state.product.products);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getProducts())
      return () => {
        console.log("unsubscribe")
      }
    },[dispatch])

    const handleClick = () => {
      setOpen((prev) => !prev);
    };
  
    const handleClickAway = () => {
      setOpen(false);
    };
console.log("products", products)
    return (
      <ClickAwayListener onClickAway={handleClickAway}>
      <div >
        <Button className={classes.btn} type="button" onClick={handleClick}>
          DEPARTMENTS
          <ArrowDropDownIcon className={classes.icon}/>
        </Button>
        <Link className={classes.btn} to="/products">SHOP ALL PRODUCTS</Link>
        {open ? (
          <Portal>
            <div className={classes.dropdown}>
              <nav  aria-label="Departments Menu">
              {categories.map((category, key) => (
                <ul  className={classes.listItem} key={key} button onClick={() => props.history.push(`/product/?col=category&filter=${category}`)}>
                  <li className={classes.listItemText}><Typography >{category}</Typography></li>
                  <Divider  className={classes.divider}/>
                </ul>
              ))} 
              </nav>         
            </div>
          </Portal>
        ) : null}
      </div>
    </ClickAwayListener>
    )
};

export default withRouter(CategoryNav);



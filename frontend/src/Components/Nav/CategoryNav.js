import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Portal from '@material-ui/core/Portal';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Divider from '@material-ui/core/Divider';
import {categories} from "./../../GlobalStyles/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    zIndex: 4000,
    // border: "1px solid orange",
    alignItems: "center",
    width: "33%",
    justifyContent: "space-between",
    [theme.breakpoints.down('md')]: { 
      // border: "1px solid red",
      width: "50%",
    },
    [theme.breakpoints.down('sm')]: { 
      // border: "1px solid blue",
      display: "none"
    },
    
  },
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
    [theme.breakpoints.down('md')]: { 
      // border: "1px solid orange",
      top: "18%",
      left: '50%',
    },
    [theme.breakpoints.down('sm')]: { 
      top: "20.5%",
      left: '2%',
    }
  },
  btn: {
    color: "white",
    fontSize: "1.3rem",
    textDecoration: "none",
    // border: "1px solid black",
    padding: 0,
   
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
  },
}));


const CategoryNav = (props) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    
    const handleClick = () => {
      setOpen((prev) => !prev);
    };
  
    const handleClickAway = () => {
      setOpen(false);
    };
    return (
      <div className={classes.root}>
      <ClickAwayListener onClickAway={handleClickAway}>
      <div >
        <Button aria-label="departments" className={classes.btn} type="button" onClick={handleClick}>
          DEPARTMENTS
          <ArrowDropDownIcon className={classes.icon}/>
        </Button>
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
    <Button aria-label="shop all products" className={classes.btn} onClick={() => props.history.push("/products")}>SHOP ALL PRODUCTS</Button>
    </div>
    )
};

export default withRouter(CategoryNav);



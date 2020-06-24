import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import {greenColor} from "./../../GlobalStyles/styles";

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      display: "flex",
      alignItems: "center",
      color: `${greenColor}`,
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      minHeight: 0,
      height: 10,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
 
  }))(InputBase);

  const useStyles = makeStyles((theme) => ({
    margin: {
      width: "10%",
      textTransform: "uppercase",
      marginTop: theme.spacing(1),
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",

      [theme.breakpoints.down('xs')]: {
        //  border: "1px solid red",
        width: "20%",
      }
    },
  }));

const QuantitySelect = (props) => {
    const classes = useStyles();


   
    
    
    return (
        <FormControl className={classes.margin}>
        <InputLabel id="qantity" style={{color: `${greenColor}`, margin: "0 auto"}}>qty</InputLabel>
        <Select
          labelId="qantity"
          id="qantity"
        //   defaultValue={`${item.quantity}`}
          value={props.qty}
          onChange={props.handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
    )
};

export default QuantitySelect;
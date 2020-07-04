import React, { useRef, createRef } from 'react';
import {withRouter} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import {yellowColor, iconColor, categories, greenColor} from "../../../../../GlobalStyles/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from '@material-ui/icons/Add';
import InputAdornment from '@material-ui/core/InputAdornment';
import { OutlinedInput } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: "none",
       
        [theme.breakpoints.down('md')]: { 
          flexDirection: "column",
          width: "100%",
          // border: "2px solid hotpink",
          display: "flex",
          // flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",

        },
        [theme.breakpoints.down('sm')]: { 
          // flexDirection: "column",
          // width: "100%",
          // border: "2px solid orange"

        },
        [theme.breakpoints.down('xs')]: { 
          // flexDirection: "column",
          // width: "100%",
          // border: "2px solid green"

        },
    },
    textFieldWide: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "90%",
        justifyContent: "left",
        // [theme.breakpoints.down('xs')]: { 
        //   width: "88%",
        //   // margin: "1rem auto"
        // },
      },
      btn: {
        margin: "2rem auto",
        color: "white",
        width: "35%",
        backgroundColor: `${iconColor}`,
        borderRadius: 0,
        "&:hover": {
          backgroundColor: `${iconColor}`,
    
        },
        [theme.breakpoints.down('xs')]: { 
          width: "70%",
        },
    },
    backBtn: {
      margin: "2rem auto",
      color: "white",
      width: "35%",
      backgroundColor: `${greenColor}`,
      borderRadius: 0,
      "&:hover": {
        backgroundColor: `${greenColor}`,
  
      },
      [theme.breakpoints.down('xs')]: { 
        width: "70%",
      },
  },
    fileInput: {
      // border: "1px solid black"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // border: "1px solid purple",
      [theme.breakpoints.down('xs')]: { 
        width: "100%",
      },
    },
    formGroup: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      // border: "2px solid gold",
      [theme.breakpoints.down('sm')]: { 
        flexDirection: "column",
        // width: "100%",
       
        marginTop: "1rem"
      },
      // [theme.breakpoints.down('xs')]: { 
      //   flexDirection: "column",
      //   width: "100%",
      //   border: "2px solid gold",
      //   marginTop: "1rem"
      // },
    },
    imagePreview: {
      width: "30%",
      height: 400,
      // border: "2px solid black",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "column",
      [theme.breakpoints.down('xs')]: { 
       display: "none",
      },
    },
    image: {
      border: `2px dashed ${yellowColor}`,
      width: "50%",
      height: 200,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: `${iconColor}`,
      [theme.breakpoints.down('xs')]: { 
        width: "100%",
      },
    },
    img: {
      width: "100%",
      height: "100%",
    },
    textarea: {
      width: "98%",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    formGrid: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      // border: "2px solid limegreen ",
      [theme.breakpoints.down('xs')]: { 
        width: "100%",
        height: "auto"
      },
    },
    category: {
      margin: theme.spacing(1),
      width: "90%",
      justifyContent: "left",
    },
    margin: {
      margin: theme.spacing(1),
    },
    btnGrid: {
      // border: "1px solid green",
      display: "flex",
      width: "70%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      }
    },
    color: {
      display: "flex",
      // border: "1px solid black",
      width: "100%"
    },
    pickerFields: {
      // border: "1px solid red",
      width: "40%",
    },
    pickerGroup: {
      // border: "1px solid blue",
      display: "flex",
      justifyContent: "space-around"

    }
}))
const AddProduct = props => {
    const classes = useStyles();
    const inputLabel =useRef(null);
    const CHAR_LIMIT = 800;

    
    const add = props.color

    const addColor = () => {
      props.addNewColor(add)
    }
const handleChange = ()  => {
  props.setColor()
}
    return (
        <Grid className={classes.root}>
          <Grid className={classes.formGrid}>
            <form className={classes.form}>
              {/* <div className={classes.color}>
                
                 <TextField
                      fullWidth
                      className={classes.textFieldWide}
                      id="color"
                      type="text"
                      label="Color"
                      margin="dense"
                      variant="outlined"
                      value={props.color}
                      onChange={e => props.setColor(e.target.value)}
                      helperText={props.newColor.map((item) => (item + ""))}
                    />
                  <IconButton type="button" onClick={addColor}>
                    <AddIcon/>
                  </IconButton>
                 
                 
                  </div> */}

                  <div className={classes.pickerGroup}>

{/* <FormControl className={classes.pickerFields} variant="outlined" >
          <OutlinedInput
            id="price"
            value={props.price}
            type="number"
            onChange={e => props.setPrice(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            
            label="Price"
            style={{height: 41}}
          />
        </FormControl> */}
<TextField
className={classes.pickerFields}
   id="price"
   value={props.price}
   type="number"
   onChange={e => props.setPrice(e.target.value)}
   startAdornment={<InputAdornment position="start">$</InputAdornment>}
   margin="dense"
   variant="outlined"
   label="Price"
   style={{height: 41}}
/>
           <TextField
                    // textFieldWide
                    className={classes.pickerFields}
                    id="quantity"
                    type="text"
                    label="Quantity"
                    margin="dense"
                    variant="outlined"
                    value={props.quantity}
                    onChange={e => props.setQuantity(e.target.value)}
                />
                </div>
                
                  <FormControl variant="outlined"  required className={classes.category}>
                        <InputLabel className={classes.stateInp} ref={inputLabel} htmlFor="Category" >Category</InputLabel>
                        <Select
                        //  fullWidth
                          id="category"
                          type="text"
                          label="Category"
                          margin="dense"
                          variant="outlined"
                          value={props.category}
                          onChange={e => props.setCategory(e.target.value)}
                        >
                            {categories.map((cat, key) => (
                            <MenuItem key={key} value={cat}>{cat}</MenuItem>
                            ))}
                        </Select> 
                  </FormControl> 

                  
                <TextField
                // fullWidth
                    className={classes.textFieldWide}
                    id="description"
                    type="text"
                    label="Description"
                    margin="dense"
                    variant="outlined"
                    value={props.description}
                    rows={4}
                    multiline
                    onChange={e => props.setDescription(e.target.value)}
                    inputProps={{
                      maxLength: CHAR_LIMIT
                    }}
                    helperText={`${props.description.length}/${CHAR_LIMIT}`}
                />    
            </form>
          
            </Grid>

         
        </Grid>
    )
};

export default withRouter(AddProduct);
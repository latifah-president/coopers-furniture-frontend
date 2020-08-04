import React from 'react';
import {withRouter} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { iconColor, greenColor} from "./../../../../../GlobalStyles/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from '@material-ui/core/InputAdornment';
import { OutlinedInput, FormControlLabel, Checkbox } from '@material-ui/core';

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
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),
        width: "100%",
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
    //   border: "1px solid black"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // border: "1px solid purple",
      [theme.breakpoints.down('xs')]: { 
        width: "90%",
      },
    },
    formGroup: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    //   border: "2px solid gold",
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
    //   border: "2px solid black",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "column",
      [theme.breakpoints.down('xs')]: { 
       display: "none",
      },
    },
    image: {
    //   border: `2px dashed ${yellowColor}`,
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
    //   border: "2px solid limegreen ",
      [theme.breakpoints.down('xs')]: { 
        width: "100%",
        height: "auto"
      },
    },
    category: {
      margin: theme.spacing(1),

      // marginLeft: theme.spacing(1),
      //   marginRight: theme.spacing(1),
        width: "100%",
        justifyContent: "left",
        // [theme.breakpoints.down('md')]: { 
        //   width: "95%",
        //   margin: "1rem auto"
        // },
        // [theme.breakpoints.down('xs')]: { 
        //   width: "88%",
        //   margin: "1rem  0 1rem .5rem",
        // },

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
    //   border: "1px solid black",
      width: "100%"
    },
    hide: {
      display: "none"
    },
}));


const AddProduct = (props) => {
    const classes = useStyles();
  console.log("props from price". props)
console.log("PROPS", props)
    return (
        <Grid className={classes.root}>
          <Grid className={classes.formGrid}>
            <form className={classes.form}>
           

                  <div className={classes.formGroup}>
                    
                  <FormControlLabel
        control={<Checkbox checked={props.checked} onChange={props.handleChange} name="out_of_stock" />}
        label="out of stock"
      />

{props.checked ? 
                  <TextField
        id="Date Back In Stock"
        label="Date Back In Stock"
        type="date"
        value={props.back_in_stock}
        // defaultValue={props.today}
        onChange={(event) => props.handleDateChange(event)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      /> : null }

                </div>

                <div className={classes.formGroup}>

                  <TextField
                    className={classes.textFieldWide}
                    id="supplier"
                    type="text"
                    label="Supplier"
                    margin="dense"
                    variant="outlined"
                    value={props.supplier}
                    onChange={e => props.setSupplier(e.target.value)}
                />  
               
               
                </div>
                <FormControl className={classes.textFieldWide} variant="outlined" style={{margin: "8px"}}>
          <InputLabel htmlFor="supplier-price">Supplier Price</InputLabel>
          <OutlinedInput
            id="supplier-price"
            value={props.item_price}
            type="number"
            onChange={e => props.setItemPrice(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
            label="Supplier Price"
            style={{height: 41}}
          />
        </FormControl>
                 <div className={classes.formGroup}>
                 <TextField
                
                    className={classes.textFieldWide}
                    id="itemNumber"
                    type="text"
                    label="Item Number"
                    margin="dense"
                    variant="outlined"
                    value={props.item_number}
                    onChange={e => props.setItemNumber(e.target.value)}
                /> 
                   <TextField
                    className={classes.textFieldWide}
                    id="itemName"
                    type="text"
                    label="Item Name"
                    margin="dense"
                    variant="outlined"
                    value={props.item_name}
                    onChange={e => props.setItemName(e.target.value)}
                />
                </div> 
            </form>
            {/* <Grid className={classes.btnGrid}>
              <Button aria-label="back" className={classes.backBtn} type="submit" variant="contained" onClick={prev}>Back</Button>
              <Button aria-label="add product" className={classes.btn} type="submit" variant="contained" onClick={uploadImage}>Add Product</Button>

            </Grid> */}
            </Grid>

         
        </Grid>
    )
};

export default withRouter(AddProduct);
import React, { useState, useRef, createRef, useEffect } from 'react';
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {storage} from "./../../../firebaseConfig";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {addProduct, getProductsBy, updateProduct} from "./../../../Store/Actions/products";
import PublishIcon from '@material-ui/icons/Publish';
import { iconColor, categories, greenColor} from "./../../../GlobalStyles/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from '@material-ui/core/InputAdornment';
import { OutlinedInput } from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Colors from "./../../../Containers/Admin/AddColor";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        // flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        // border: "2px solid orange",
        // marginTop: "2rem",
        // paddingTop: "2rem",
        // [theme.breakpoints.down('md')]: { 
        //   border: "4px solid purple",

        // },
        [theme.breakpoints.down('md')]: { 
          flexDirection: "column",
          width: "100%",

        },
    },
    textFieldWide: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "416px",
        justifyContent: "left",
        [theme.breakpoints.down('xs')]: { 
          width: "98%",
          margin: "1rem auto"
        },
      },
      btn: {
        margin: "2rem auto",
        color: "white",
        width: "25%",
        backgroundColor: `${iconColor}`,
        borderRadius: 0,
        "&:hover": {
          backgroundColor: `${greenColor}`,
    
        },
        [theme.breakpoints.down('xs')]: { 
          width: "90%",
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
      [theme.breakpoints.down('xs')]: { 
        flexDirection: "column",
        width: "100%",
        // border: "2px solid gold",
        marginTop: "1rem"
      },
    },
    // imagePreview: {
    //   width: "30%",
    //   height: 400,
    //   border: "2px solid black",
    //   display: "flex",
    //   justifyContent: "space-around",
    //   alignItems: "center",
    //   flexDirection: "column",
    //   [theme.breakpoints.down('xs')]: { 
    //    display: "none",
    //   },
    // },
    // image: {
    //   border: `2px dashed ${yellowColor}`,
    //   width: "50%",
    //   height: 200,
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   color: `${iconColor}`,
    //   [theme.breakpoints.down('xs')]: { 
    //     width: "100%",
    //   },
    // },
    // img: {
    //   width: "100%",
    //   height: "100%",
    // },
    imagePreview: {
  
    
     width: "100%",
     padding: "2rem",
    // height: 400,
    border: `2px solid ${iconColor}`,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
   alignSelf: "flex-start"
  },
  image: {
  //  border: `2px dashed ${yellowColor}`,
    width: "50%",
  //   height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: `${iconColor}`,
    [theme.breakpoints.down('xs')]: { 
      width: "100%",
      height: "auto",
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
      marginLeft: "2rem",
      [theme.breakpoints.down('sm')]: { 
        width: "50%",
        height: "auto"
      },
      [theme.breakpoints.down('xs')]: { 
        width: "100%",
        height: "auto"
      },
    },
    category: {
      margin: theme.spacing(1),

      // marginLeft: theme.spacing(1),
      //   marginRight: theme.spacing(1),
        width: "416px",
        justifyContent: "left",
        [theme.breakpoints.down('xs')]: { 
          width: "98%",
          margin: "1rem auto"
        },

    },
    margin: {
      margin: theme.spacing(1),
    },
    text: {
      // border: "1px solid red",
      textTransform: "capitalize",
      fontSize: "1rem",
      width: "100%",
      padding: ".5rem"
  },
  icon: {
      color: `${iconColor}`,
      fontSize: "2rem",
      marginBottom: "1rem"
  },
  label: {
      // border: "1px solid green",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // width: "100%",
      flexDirection: "column",
  },
  uploadBtn: {
    border: `1px solid ${iconColor}`
  },
  description: {
    // border: "1px solid orange",
    width: "100%",
  },
  textFieldDesc: {
    width: "100%",
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  pickerFields: {
    // border: "1px solid red"
  },
  hide: {
    display: "none",
  },
colorGrid: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  border: "2px solid limegreen ",
  marginLeft: "2rem",
  marginTop: "6rem",
  [theme.breakpoints.down('sm')]: { 
    width: "50%",
    height: "auto"
  },
  [theme.breakpoints.down('xs')]: { 
    width: "100%",
    height: "auto"
  },
}
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}
const AddProduct = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(null);
    // eslint-disable-next-line
    const [image_url, setImageUrl] = useState([]);
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [item_number, setItemNumber] = useState("");
    const [item_name, setItemName] = useState("");
    const [item_price, setItemPrice] = useState(null);
    const [supplier, setSupplier] = useState("");
    const [out_of_stock, setOutOfStock] = useState(false);
    const [back_in_stock, setBackInStock] = useState("");
    const [color, setColor] = useState("");
    const [file, setFile] = useState(null);
    const [previewImg, setPreviewImg] = useState("");
    const [color_id, setColorId] = useState(0);
    const [image_id, setImageId] = useState(0);
    const photoInp = createRef();
    const inputLabel =useRef(null);
    const [newColor, setNewColor] = useState();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = useState([]);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    const [open, setOpen] = React.useState(false);

    const colors = useSelector(state => state.product.colors);
    const edit = useSelector(state => state.product.edit);
    const editSuccess = useSelector(state => state.product.editSuccess)
    const product = useSelector(state => state.product.products);



   

    const id = props.match.params.id;
    const col = "id"

  console.log("description", description)
  console.log("titile", title)

  

  console.log("right list", right)



    const CHAR_LIMIT = 800;
   console.log("image url", image_url)
   console.log("files from state", file)
   console.log("new color from state", newColor)



//    const getColors = () => {
//     let dbColors = colors.map(element => {
//         console.log("mapped element ", element)
//         return element
//         // return left.concat(element)

//     });
//     setLeft(left.concat(dbColors))
//     console.log("db colors ", dbColors)

// }

useEffect(() => {
       
  const filter = id
      dispatch(getProductsBy(col, filter))

      if (edit) {
     const prodDesc = product.map((item) => {
       
         setTitle(item.title)
         setPrice(item.price)
         setDescription(item.description)
         setCategory(item.category)
        setQuantity(item.quantity)
        setItemNumber(item.item_number)
        setItemName(item.item_name)
        setItemPrice(item.item_price)
        setSupplier(item.supplier)
        setImageId(item.image_id)
        setColorId(item.color_id)
        setOutOfStock(item.out_of_stock)
        setBackInStock(item.back_in_stock)
       setColor(item.colors)
      //  setState({
      //    title: item.title,
      //    price: item.price,
      //    description: item.description,
      //    category: item.category,
      //   quantity: item.quantity,
      //   item_number:  item.item_number,
      //   item_name:  item.item_name,
      //   item_price: item.item_price,
      //   supplier: item.supplier,
      //   image_id: item.image_id,
      //   color_id: item.color_id,
      //   out_of_stock: item.out_of_stock,
      //   back_in_stock: item.back_in_stock
      //  })
     })
    }
// console.log("DESCRIPTION", prodDesc)
  return () => {
      console.log("unsubscribe ");
    };
}, [dispatch, id, edit]);

const handleToggle = (value) => () => {
  const currentIndex = checked.indexOf(value);
  const newChecked = [...checked];

  if (currentIndex === -1) {
    newChecked.push(value);
  } else {
    newChecked.splice(currentIndex, 1);
  }

  setChecked(newChecked);
};

const handleAllRight = () => {
  setRight(right.concat(left));
  setLeft([]);
};

const handleCheckedRight = () => {
  setRight(right.concat(leftChecked));
  setLeft(not(left, leftChecked));
  setChecked(not(checked, leftChecked));
  let rightColors = right.map((item) => {
      console.log("item map", item)
      return item
  })
  console.log("right colors", rightColors)
  setNewColor(newColor.concat(rightColors))
};

const handleCheckedLeft = () => {
  setLeft(left.concat(rightChecked));
  setRight(not(right, rightChecked));
  setChecked(not(checked, rightChecked));
};

const handleAllLeft = () => {
  setLeft(left.concat(right));
  setRight([]);
};

const addColor = () => {
  setLeft(left.concat(color))
};

const saveColor = () => {
  let rightColors = right.map((item) => {
      return item
  }) 
  // let concat = props.newColor.concat(rightColors)
  setNewColor(right)
}
const customList = (items) => (
  <Paper className={classes.paper}>
    <List dense component="div" role="list">
      {items.map((value) => {
        const labelId = `transfer-list-item-${value}-label`;

        return (
          <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value} />
          </ListItem>
        );
      })}
      <ListItem />
    </List>
  </Paper>
);

const addimage = (url) => {
  setImageUrl(image_url.concat(url))
  console.log("download url from add image", url);
 }
   const handleClickOpen = () => {
     setOpen(true);
   };
   const handleClose = (right) => {
//     let rightColors = right.map((item) => {
//       return item
// }) 
// setNewColor(newColor.concat(rightColors))
     setOpen(false);
   };

    const uploadImage = event => {
  event.preventDefault();
  let currentProductName = "product-image-" + Date.now();
  let metaData = {contentType: "image/jpeg"}
  let uploadImage = storage.ref(`images/${currentProductName}`).put(file, metaData);
  uploadImage.on(
    "state_changed",
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    },
    error => {
      alert(error.message);
    },
    () => {
      storage
        .ref("images")
        .child(currentProductName)
        .getDownloadURL()
        .then(url => {
          const productObj = {
            title: title,
            description: description,
            price: price,
            image_url:[url],
            category: category,
            quantity: quantity,
            item_number: item_number,
            item_name: item_name,
            item_price: item_price,
            supplier: supplier,
            color: newColor,

          };
          dispatch(addProduct(productObj));
          // props.history.push(`/storemanager/${firebase_id}/admin/addproduct`)
        });
    }
  );
};

    const productObj = {
      title: title,
      description: description,
      price: price,
      image_url: image_url,
      category: category,
      quantity: quantity,
      item_number: item_number,
      item_name: item_name,
      supplier: supplier,
      color: color,
      color_id: color_id,
      image_id: image_id,
      out_of_stock: out_of_stock,
      back_in_stock: back_in_stock
    }
   console.log("productObj", productObj)
  
  const fileHandler = e => {
    e.persist();
    if (e.target.files[0]) {
      setFile(() => e.target.files[0]);
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
    }
};

const addToState = (arr) => {
  var arr2 = [];
  arr.forEach(function(element) {
      if (isNaN(element)) {   // only pushes the strings, not numbers or booleans
          arr2.push(element);
      }
      console.log("array 2", arr2);  // output as wished: apple, banana, grape
  })
  setNewColor(arr2)
};

const handleUpdate = () => {
  dispatch(updateProduct(id, productObj));
 
    props.history.push(`/products`)
  
};
   
    return (
        <Grid className={classes.root}>
<Grid className={classes.imagePreview}>
                        <Grid className={edit ? classes.hide : classes.image}>
                        {file === null ? <PublishIcon className={classes.icon}/> : <img className={classes.img} src={previewImg} alt={"image preview" || title}/>}
{/* 
                            <label htmlFor="image-upload" className={classes.label}>
    <Typography variant="p" component="p" className={ previewImg ? `${classes.hide}` :  `${classes.text} ${classes.btn}`}>{previewImg ? null : "Upload your image"}</Typography>
                        </label> */}
                        </Grid>
                        <Input
                        className={edit ? classes.hide : classes.fileInput}
                        id="image-upload"
                        accept="image/*"
                        name="image"
                        type="file"
                        onChange={e => fileHandler(e)}
                        value=""
                        margin="dense"
                        ref={photoInp}
                        label="Image Upload"
                        // multiple
                        //style={{display: "none"}}
                        /> 
                        <Grid className={classes.colorGrid}>
                  <Colors
                      // next={handleNext} 
                      // prev={handleBack}
                      right={right}
                      saveColor={addToState}
                      // item_name={item_name}
                      // setItemName={setItemName}

                      // item_number={item_number}
                      // setItemNumber={setItemNumber}

                      // supplier={supplier}
                      // setSupplier={setSupplier}
                      color={color}
                      setColor={setColor}
                      newColor={newColor}
                  />
                  </Grid>
                   {/* <Button style={{color: "white"}} className={classes.btn} type="button" aria-label="next" onClick={uploadImage}>Upload images</Button> */}

                        {/* <Button style={{color: "white"}} disabled={props.previewImg ? false : true} className={classes.btn} type="button" aria-label="next" onClick={next}>Next</Button> */}
                </Grid>
          {/*BEGIN FORM */}
          <Grid className={classes.formGrid}>
          <form className={classes.form}>
            {edit ? `UPDATING` :  `NOT UPDATING`}
              <div className={classes.formGroup}>
                  <TextField
                    className={classes.textFieldWide}
                    id="title"
                    name="title"
                    type="text"
                    label="Product Title"
                    margin="dense"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                   
                  />  

{/* <FormControl variant="outlined"  required className={classes.category}>
                        <InputLabel className={classes.stateInp} ref={inputLabel} htmlFor="Category" >Colors</InputLabel>
                        <Select
                          // fullWidth
                          id="colors"
                          type="text"
                          label="Colors"
                          margin="dense"
                          variant="outlined"
                          value={color}
                          onChange={e => setColor(e.target.value)}
                        >
                            {colors.map((col, key) => (
                            <MenuItem key={key} value={col}>{col}</MenuItem>
                            ))}
                        </Select> 
                  </FormControl> */}
                    {/* <TextField
                      fullWidth
                      className={classes.textFieldWide}
                      id="color"
                      type="text"
                      label="Color"
                      margin="dense"
                      variant="outlined"
                      value={color}
                      onChange={e => setColor(e.target.value)}
                      helperText={newColor.map((item) => (item + ""))}
                      style={{width: "43%"}}
                    /> */}
                
                  
               
                
                  </div>
                
                  <div className={classes.formGroup}>

<FormControl className={classes.pickerFields} variant="outlined" style={{margin: "8px"}}>
          <InputLabel htmlFor="price">Price</InputLabel>
          <OutlinedInput
            id="price"
            name="price"
            value={price}
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
            label="Price"
            style={{height: 41}}
          />
        </FormControl>
        <FormControl className={classes.pickerFields} variant="outlined" style={{margin: "8px"}}>
          <InputLabel htmlFor="supplier-price">Supplier Price</InputLabel>
          <OutlinedInput
            id="supplier-price"
            name="supplier-price"
            value={item_price}
            type="number"
            onChange={e => setItemPrice(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
            label="Supplier Price"
            style={{height: 41}}
          />
        </FormControl>
           <TextField
                    className={classes.pickerFields}
                    id="quantity"
                    name="quantity"
                    type="number"
                    label="Quantity"
                    margin="dense"
                    variant="outlined"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                />
                </div>

                <div className={classes.formGroup}>
                  <FormControl variant="outlined"  required className={classes.category}>
                        <InputLabel className={classes.stateInp} ref={inputLabel} htmlFor="Category" >Category</InputLabel>
                        <Select
                          // fullWidth
                          id="category"
                          name="category"
                          type="text"
                          label="Category"
                          margin="dense"
                          variant="outlined"
                          value={category}
                          onChange={e => setCategory(e.target.value)}
                        >
                            {categories.map((cat, key) => (
                            <MenuItem key={key} value={cat}>{cat}</MenuItem>
                            ))}
                        </Select> 
                  </FormControl> 

                  <TextField
                    className={classes.textFieldWide}
                    id="supplier"
                    name="supplier"
                    type="text"
                    label="Supplier"
                    margin="dense"
                    variant="outlined"
                    value={supplier}
                    onChange={e => setSupplier( e.target.value)}
                />  
               
               
                </div>
                
                 <div className={classes.formGroup}>
                 <TextField
                    className={classes.textFieldWide}
                    id="itemNumber"
                    name="itemNumber"
                    type="text"
                    label="Item Number"
                    margin="dense"
                    variant="outlined"
                    value={item_number}
                    onChange={e => setItemNumber( e.target.value)}
                /> 
                   <TextField
                    className={classes.textFieldWide}
                    id="itemName"
                    name="itemName"
                    type="text"
                    label="Item Name"
                    margin="dense"
                    variant="outlined"
                    value={item_name}
                    onChange={e => setItemName(e.target.value)}
                />
                </div>  

                
                 <div className={classes.description}>
                 <TextField
                 fullWidth
                    className={classes.textFieldDesc}
                    name="description"
                    id="description"
                    type="text"
                    label="Description"
                    margin="dense"
                    variant="outlined"
                    value={description}
                    rows={10}
                    multiline
                    onChange={(e) => setDescription( e.target.value)}
                    inputProps={{
                      maxLength: CHAR_LIMIT
                    }}
                    // helperText={`${state.description.length}/${CHAR_LIMIT}`}
                />
                </div>   
                 
            </form>
           <div>
{edit ?             <Button aria-label="update product" className={classes.btn} type="submit" variant="contained" onClick={handleUpdate}>Update Product</Button>
 :             <Button aria-label="add product" className={classes.btn} type="submit" variant="contained" onClick={uploadImage}>Add Product</Button>
}
           </div>
            </Grid>

         
        </Grid>
    )
};

export default withRouter(AddProduct);
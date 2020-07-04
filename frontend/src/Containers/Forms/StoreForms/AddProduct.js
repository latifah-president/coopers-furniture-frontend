



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
import {addProduct} from "./../../../Store/Actions/products";
import PublishIcon from '@material-ui/icons/Publish';
import { iconColor, categories, greenColor} from "./../../../GlobalStyles/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from '@material-ui/core/InputAdornment';
import { OutlinedInput } from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
import ColorModal from "./../../../Containers/Admin/Modal";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

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
    height: 400,
    border: `2px solid ${iconColor}`,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
   
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
    border: "1px solid red"
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
    const [file, setFile] = useState(null);
    const [previewImg, setPreviewImg] = useState("");
    const photoInp = createRef();
    const inputLabel =useRef(null);
    const [color, setColor] = useState("");
    const [newColor, setNewColor] = useState();
    const dispatch = useDispatch();
    const colors = useSelector(state => state.product.colors)




    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
  console.log("colors to add", right)
  console.log("left list", left)



    const CHAR_LIMIT = 800;
   console.log("image url", image_url)
   console.log("files from state", file)
   console.log("new color from state", newColor)
   const [open, setOpen] = React.useState(false);



//    const getColors = () => {
//     let dbColors = colors.map(element => {
//         console.log("mapped element ", element)
//         return element
//         // return left.concat(element)

//     });
//     setLeft(left.concat(dbColors))
//     console.log("db colors ", dbColors)

// }

// useEffect(() => {
//       getColors()
    
//     return () => {
//         console.log("unsubscribe ");
//       };
// }, [] );

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

  //  const onUploadSubmission = e => {
  //   e.preventDefault(); // prevent page refreshing
  //   let currentProductName = "product-image-" + Date.now();
  //   let metaData = {contentType: "image/jpeg"}
  //     const promises = [];
  //     file.forEach(file => {
  //       const uploadTask  = firebase.storage.ref().child(currentProductName).put(file, metaData)
  //       promises.push(uploadTask);
  //       uploadTask.on(
  //         firebase.storage.TaskEvent.STATE_CHANGED,
  //         (snapshot) => {
  //           if (snapshot.state === firebase.storage.TaskState.RUNNING) {
  //             let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //           console.log(`Upload is ${progress}% done`);
  //            }
            
  //         },
  //         error => console.log("something went wrong while uploading the image", error.message),
  //         async() => {
  //           const downloadURL  = await uploadTask.snapshot.ref.getDownloadURL();
  //           console.log("download url", downloadURL)
  //           addimage(downloadURL)
  //         }
          
  //       )
  //     })
  //     Promise.all(promises)
  //         .then(() => alert('All files uploaded'))
  //         .catch(err => console.log(err.code));
  //  };

  //  const onUploadSubmission = e => {
  //   e.preventDefault(); // prevent page refreshing
  //     const promises = [];
  //     files.forEach(file => {
  //      const uploadTask = 
  //       firebase.storage().ref().child(`your/file/path/${file.name}`).put(file);
  //         promises.push(uploadTask);
  //         uploadTask.on(
  //            firebase.storage.TaskEvent.STATE_CHANGED,
  //            snapshot => {
  //             const progress = 
  //               (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //                if (snapshot.state === firebase.storage.TaskState.RUNNING) {
  //                 console.log(`Progress: ${progress}%`);
  //                }
  //              },
  //              error => console.log(error.code),
  //              async () => {
  //                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
  //                 // do something with the url
  //               }
  //              );
  //            });
  //        Promise.all(promises)
  //         .then(() => alert('All files uploaded'))
  //         .catch(err => console.log(err.code));
  //  }

  // const onUploadSubmission = e => {
  //   e.preventDefault(); // prevent page refreshing
  //   let currentProductName = "product-image-" + Date.now();
  //   let metaData = {contentType: "image/jpeg"}
  //   const promises = [];
  //   file.forEach(file => {
  //     console.log("file name", file.name)
  //     console.log("file", file)

  //       const uploadTask = 
  //       firebase.storage().ref().child(`${currentProductName}`).put(file, metaData);
    
  //   promises.push(uploadTask);
  //   uploadTask.on(
  //       firebase.storage.TaskEvent.STATE_CHANGED,
  //       snapshot => {
  //           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //           if (snapshot.state === firebase.storage.TaskState.RUNNING) {
  //               console.log(`Progress: ${progress}`);
  //           }
  //       },
  //       error => console.log(`There was a problem uploading your images`, error.message),
  //       async () => {
  //           const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
  //           console.log("download url", downloadURL[0])
  //           // setImageUrl(image_url.concat())
  //       }
  //   )
  // })
  // Promise.all(promises)
  // .then(() => alert('All files uploaded'))
  // .catch(err => console.log(err.code));
  //  }


  
  //  const addProduct = () => {
  //   const productObj = {
  //     title: title,
  //     description: description,
  //     price: price,
  //     image_url: image_url,
  //     category: category,
  //     quantity: quantity,
  //     item_number: item_number,
  //     item_name: item_name,
  //     supplier: supplier,
  //     color: newColor,

  //   };
  //   dispatch(addProduct(productObj));
  //  }
  //   const uploadImage = event => {
  //     event.preventDefault();
  //     let currentProductName = "product-image-" + Date.now();
  //     let metaData = {contentType: "image/jpeg"}
  //     const storageRef = storage;
  //     // let uploadImage = storage.ref(`images/${currentProductName}`).put(file, metaData);
  //     // let uploadImage = file.forEach((file) => {
  //     //   storageRef.ref(`images/${currentProductName}`).put(file, metaData);
  //     // })
  //     file.forEach(file => {
  //     let uploadImage = 
  //       storage.ref(`images/${currentProductName}`).put(file, metaData);
  //     })
  //     console.log("upload image", uploadImage)
  //     uploadImage.on(
  //       "state_changed",
  //       (snapshot) => {
  //         let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log(`Upload is ${progress}% done`);
  //       },
  //       error => {
  //         alert(error.message);
  //       },
  //       () => {
  //         storage
  //           .ref("images")
  //           .child(currentProductName)
  //           .getDownloadURL()
  //           .then(url => {
  //             let imageUrl = url.forEach((file) => {
  //               setImageUrl(image_url.concat(file))
  //             })
  //             console.log("image url from upload", imageUrl)
  //             const productObj = {
  //               title: title,
  //               description: description,
  //               price: price,
  //               image_url: imageUrl,
  //               category: category,
  //               quantity: quantity,
  //               item_number: item_number,
  //               item_name: item_name,
  //               supplier: supplier,
  //               color: newColor,

  //             };
  //             dispatch(addProduct(productObj));
             
  //             props.history.push(`storemanager/${props.match.params.id}`)
  //           });
  //       }
  //     );
  // };

  // const onUploadSubmission = e => {
  //   e.preventDefault(); // prevent page refreshing
  //     const promises = [];
  //     files.forEach(file => {
  //      const uploadTask = 
  //       firebase.storage().ref().child(`your/file/path/${file.name}`).put(file);
  //         promises.push(uploadTask);
  //         uploadTask.on(
  //            firebase.storage.TaskEvent.STATE_CHANGED,
  //            snapshot => {
  //             const progress = 
  //               (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //                if (snapshot.state === firebase.storage.TaskState.RUNNING) {
  //                 console.log(`Progress: ${progress}%`);
  //                }
  //              },
  //              error => console.log(error.code),
  //              async () => {
  //                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
  //                 // do something with the url
  //               }
  //              );
  //            });
  //        Promise.all(promises)
  //         .then(() => alert('All files uploaded'))
  //         .catch(err => console.log(err.code));
  //  }
  const fileHandler = e => {
    e.persist();
    if (e.target.files[0]) {
      setFile(() => e.target.files[0]);
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
    }
};
      // const addColor = () => {
      //   setNewColor(newColor.concat(color))
      // }
    return (
        <Grid className={classes.root}>

<Grid className={classes.imagePreview}>
                        <Grid className={classes.image}>
                        {file === null ? <PublishIcon className={classes.icon}/> : <img className={classes.img} src={previewImg} alt={"image preview" || title}/>}
{/* 
                            <label htmlFor="image-upload" className={classes.label}>
    <Typography variant="p" component="p" className={ previewImg ? `${classes.hide}` :  `${classes.text} ${classes.btn}`}>{previewImg ? null : "Upload your image"}</Typography>
                        </label> */}
                        </Grid>
                        <Input
                        className={classes.fileInput}
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
                   {/* <Button style={{color: "white"}} className={classes.btn} type="button" aria-label="next" onClick={uploadImage}>Upload images</Button> */}

                        {/* <Button style={{color: "white"}} disabled={props.previewImg ? false : true} className={classes.btn} type="button" aria-label="next" onClick={next}>Next</Button> */}
                </Grid>
          {/*BEGIN FORM */}
          <Grid className={classes.formGrid}>
          <form className={classes.form}>
              <div className={classes.formGroup}>
                  <TextField
                    className={classes.textFieldWide}
                    id="title"
                    type="text"
                    label="Product Title"
                    margin="dense"
                    variant="outlined"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                   
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
                  <IconButton type="button" onClick={handleClickOpen}>
                    <AddIcon/>
                  </IconButton>
                 <ColorModal
                  open={open}
                  handleClose={handleClose}
                  newColor={newColor}
                  setNewColor={setNewColor}
                  color={color}
                  setColor={setColor}
                  setOpen={setOpen}
                  right={right}
                 />
                  </div>

                  <div className={classes.formGroup}>

<FormControl className={classes.pickerFields} variant="outlined" style={{margin: "8px"}}>
          <InputLabel htmlFor="price">Price</InputLabel>
          <OutlinedInput
            id="price"
            value={price}
            type="number"
            onChange={e => setPrice(e.target.value)}
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
                    type="text"
                    label="Supplier"
                    margin="dense"
                    variant="outlined"
                    value={supplier}
                    onChange={e => setSupplier(e.target.value)}
                />  
               
               
                </div>
                
                 <div className={classes.formGroup}>
                 <TextField
                    className={classes.textFieldWide}
                    id="itemNumber"
                    type="text"
                    label="Item Number"
                    margin="dense"
                    variant="outlined"
                    value={item_number}
                    onChange={e => setItemNumber(e.target.value)}
                /> 
                   <TextField
                    className={classes.textFieldWide}
                    id="itemName"
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
                    id="description"
                    type="text"
                    label="Description"
                    margin="dense"
                    variant="outlined"
                    value={description}
                    rows={10}
                    multiline
                    onChange={e => setDescription(e.target.value)}
                    inputProps={{
                      maxLength: CHAR_LIMIT
                    }}
                    helperText={`${description.length}/${CHAR_LIMIT}`}
                />
                </div>   
                 
            </form>
            {/* <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
   
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            aria-label="move all left"
          >
          undo
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
      <div>
      <form>
           <TextField
            fullWidth
            className={classes.textFieldWide}
            id="color"
            type="text"
            label="Color"
            margin="dense"
            variant="outlined"
            value={color}
            onChange={e => setColor(e.target.value)}
            helperText="Dont't see your color? Enter a new one here."
            style={{width: "43%"}}
            />
             <IconButton type="button" onClick={addColor}>
                    <AddIcon/>
                  </IconButton>
      </form>
      </div>
    </Grid> */}
            <Button aria-label="add product" className={classes.btn} type="submit" variant="contained" onClick={uploadImage}>Add Product</Button>
            </Grid>

         
        </Grid>
    )
};

export default withRouter(AddProduct);





// import React, { useState, useRef, createRef } from 'react';
// import {withRouter} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux"
// import {storage} from "./../../../firebaseConfig";
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import Input from "@material-ui/core/Input";
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import {addProduct} from "./../../../Store/Actions/products";
// import PublishIcon from '@material-ui/icons/Publish';
// import { iconColor, categories, greenColor} from "./../../../GlobalStyles/styles";
// import Select from "@material-ui/core/Select";
// import InputLabel from "@material-ui/core/InputLabel";
// import FormControl from "@material-ui/core/FormControl";
// import MenuItem from "@material-ui/core/MenuItem";
// import InputAdornment from '@material-ui/core/InputAdornment';
// import { OutlinedInput } from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
// import ColorModal from "./../../../Containers/Admin/Modal";

// const useStyles = makeStyles(theme => ({
//     root: {
//         display: "flex",
//         // flexDirection: "column",
//         justifyContent: "space-between",
//         alignItems: "center",
//         width: "100%",
//         // border: "2px solid orange",
//         // marginTop: "2rem",
//         // paddingTop: "2rem",
//         // [theme.breakpoints.down('md')]: { 
//         //   border: "4px solid purple",

//         // },
//         [theme.breakpoints.down('md')]: { 
//           flexDirection: "column",
//           width: "100%",

//         },
//     },
//     textFieldWide: {
//         marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(1),
//         width: "416px",
//         justifyContent: "left",
//         [theme.breakpoints.down('xs')]: { 
//           width: "98%",
//           margin: "1rem auto"
//         },
//       },
//       btn: {
//         margin: "2rem auto",
//         color: "white",
//         width: "25%",
//         backgroundColor: `${iconColor}`,
//         borderRadius: 0,
//         "&:hover": {
//           backgroundColor: `${greenColor}`,
    
//         },
//         [theme.breakpoints.down('xs')]: { 
//           width: "90%",
//         },
//     },
//     fileInput: {
//       // border: "1px solid black"
//     },
//     form: {
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       // border: "1px solid purple",
//       [theme.breakpoints.down('xs')]: { 
//         width: "100%",
//       },
//     },
//     formGroup: {
//       width: "100%",
//       display: "flex",
//       justifyContent: "center",
//       [theme.breakpoints.down('xs')]: { 
//         flexDirection: "column",
//         width: "100%",
//         // border: "2px solid gold",
//         marginTop: "1rem"
//       },
//     },
//     // imagePreview: {
//     //   width: "30%",
//     //   height: 400,
//     //   border: "2px solid black",
//     //   display: "flex",
//     //   justifyContent: "space-around",
//     //   alignItems: "center",
//     //   flexDirection: "column",
//     //   [theme.breakpoints.down('xs')]: { 
//     //    display: "none",
//     //   },
//     // },
//     // image: {
//     //   border: `2px dashed ${yellowColor}`,
//     //   width: "50%",
//     //   height: 200,
//     //   display: "flex",
//     //   justifyContent: "center",
//     //   alignItems: "center",
//     //   color: `${iconColor}`,
//     //   [theme.breakpoints.down('xs')]: { 
//     //     width: "100%",
//     //   },
//     // },
//     // img: {
//     //   width: "100%",
//     //   height: "100%",
//     // },
//     imagePreview: {
  
    
//      width: "100%",
//     height: 400,
//     border: `2px solid ${iconColor}`,
//     display: "flex",
//     justifyContent: "space-around",
//     alignItems: "center",
//     flexDirection: "column",
   
//   },
//   image: {
//   //  border: `2px dashed ${yellowColor}`,
//     width: "50%",
//   //   height: 200,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//     color: `${iconColor}`,
//     [theme.breakpoints.down('xs')]: { 
//       width: "100%",
//       height: "auto",
//     },
//   },
//   img: {
//     width: "100%",
//     height: "100%",
//   },
//     textarea: {
//       width: "98%",
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//     },
//     formGrid: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "space-between",
//       // border: "2px solid limegreen ",
//       marginLeft: "2rem",
//       [theme.breakpoints.down('sm')]: { 
//         width: "50%",
//         height: "auto"
//       },
//       [theme.breakpoints.down('xs')]: { 
//         width: "100%",
//         height: "auto"
//       },
//     },
//     category: {
//       margin: theme.spacing(1),

//       // marginLeft: theme.spacing(1),
//       //   marginRight: theme.spacing(1),
//         width: "416px",
//         justifyContent: "left",
//         [theme.breakpoints.down('xs')]: { 
//           width: "98%",
//           margin: "1rem auto"
//         },

//     },
//     margin: {
//       margin: theme.spacing(1),
//     },
//     text: {
//       // border: "1px solid red",
//       textTransform: "capitalize",
//       fontSize: "1rem",
//       width: "100%",
//       padding: ".5rem"
//   },
//   icon: {
//       color: `${iconColor}`,
//       fontSize: "2rem",
//       marginBottom: "1rem"
//   },
//   label: {
//       // border: "1px solid green",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       // width: "100%",
//       flexDirection: "column",
//   },
//   uploadBtn: {
//     border: `1px solid ${iconColor}`
//   },
//   description: {
//     // border: "1px solid orange",
//     width: "100%",
//   },
//   textFieldDesc: {
//     width: "100%",
//   }
// }))
// const AddProduct = props => {
//     const classes = useStyles();
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState(null);
//     // eslint-disable-next-line
//     const [image_url, setImageUrl] = useState("");
//     const [category, setCategory] = useState("");
//     const [quantity, setQuantity] = useState(1);
//     const [item_number, setItemNumber] = useState("");
//     const [item_name, setItemName] = useState("");
//     const [supplier, setSupplier] = useState("");
//     const [file, setFile] = useState([]);
//     const [previewImg, setPreviewImg] = useState("");
//     const photoInp = createRef();
//     const inputLabel =useRef(null);
//     const [color, setColor] = useState("");
//     const [newColor, setNewColor] = useState(null);
//     const dispatch = useDispatch();
//     const colors = useSelector(state => state.product.colors)

//     const CHAR_LIMIT = 800;
//    console.log("color from first component", color)
//    console.log("files from state", file)
//    console.log("new color from state", newColor)
//    const [open, setOpen] = React.useState(false);

//    const handleClickOpen = () => {
//      setOpen(true);
//    };
//    const handleClose = (right) => {
//     let rightColors = right.map((item) => {
//       return item
// }) 
// setNewColor(newColor.concat(rightColors))
//      setOpen(false);
//    };
//     const uploadImage = event => {
//       event.preventDefault();
//       let currentProductName = "product-image-" + Date.now();
//       let metaData = {contentType: "image/jpeg"}
//       const storageRef = storage;
//       // let uploadImage = storage.ref(`images/${currentProductName}`).put(file, metaData);
//       let uploadImage = file.forEach((file) => {
//         storageRef.ref(`images/${currentProductName}`).put(file, metaData);
//       })

//       uploadImage.on(
//         "state_changed",
//         (snapshot) => {
//           let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Upload is ${progress}% done`);
//         },
//         error => {
//           alert(error.message);
//         },
//         () => {
// //           const storageRef = fire.storage().ref();
// // this.state.file.forEach((file) => {
// //   storageRef
// //       .child(`images/${file.name}`)
// //       .putFile(file).then((snapshot) => {
// //   })
// // });
//           storage
//             .ref("images")
//             .child(currentProductName)
//             .getDownloadURL()
//             .then(url => {
//               let imageUrl = url.forEach((file) => {
//                 setImageUrl(image_url.concat(file))
//               })
//               const productObj = {
//                 title: title,
//                 description: description,
//                 price: price,
//                 image_url: imageUrl,
//                 category: category,
//                 quantity: quantity,
//                 item_number: item_number,
//                 item_name: item_name,
//                 supplier: supplier,
//                 color: newColor,

//               };
//               dispatch(addProduct(productObj));
             
//               props.history.push(`storemanager/${props.match.params.id}`)
//             });
//         }
//       );
//   };

//     const fileHandler = e => {
//         e.persist();
//         console.log("file from handle", e.target.files)
//         if (e.target.files[0]) {
//           setFile(file.concat(e.target.files[0]));
//           // setFile(() => e.target.files[0]);
//           setPreviewImg(URL.createObjectURL(e.target.files[0]));
//         }
//       };
//       const addColor = () => {
//         setNewColor(newColor.concat(color))
//       }
//     return (
//         <Grid className={classes.root}>
             

// <Grid className={classes.imagePreview}>
//                         <Grid className={classes.image}>
//                         {file === null ? <PublishIcon className={classes.icon}/> : <img className={classes.img} src={previewImg} alt={"image preview" || title}/>}
// {/* 
//                             <label htmlFor="image-upload" className={classes.label}>
//     <Typography variant="p" component="p" className={ previewImg ? `${classes.hide}` :  `${classes.text} ${classes.btn}`}>{previewImg ? null : "Upload your image"}</Typography>
//                         </label> */}
//                         </Grid>
//                         <Input
//                         className={classes.fileInput}
//                         id="image-upload"
//                         accept="image/*"
//                         name="image"
//                         type="file"
//                         onChange={e => fileHandler(e)}
//                         value={image_url}
//                         margin="dense"
//                         ref={photoInp}
//                         label="Image Upload"
//                         multiple
//                         //style={{display: "none"}}
//                         /> 
//                         {/* <Button style={{color: "white"}} disabled={props.previewImg ? false : true} className={classes.btn} type="button" aria-label="next" onClick={next}>Next</Button> */}
//                 </Grid>
//           {/*BEGIN FORM */}
//           <Grid className={classes.formGrid}>
//           <form className={classes.form}>
//               <div className={classes.formGroup}>
//                   <TextField
//                     className={classes.textFieldWide}
//                     id="title"
//                     type="text"
//                     label="Product Title"
//                     margin="dense"
//                     variant="outlined"
//                     value={title}
//                     onChange={e => setTitle(e.target.value)}
                   
//                   />  

// {/* <FormControl variant="outlined"  required className={classes.category}>
//                         <InputLabel className={classes.stateInp} ref={inputLabel} htmlFor="Category" >Colors</InputLabel>
//                         <Select
//                           // fullWidth
//                           id="colors"
//                           type="text"
//                           label="Colors"
//                           margin="dense"
//                           variant="outlined"
//                           value={color}
//                           onChange={e => setColor(e.target.value)}
//                         >
//                             {colors.map((col, key) => (
//                             <MenuItem key={key} value={col}>{col}</MenuItem>
//                             ))}
//                         </Select> 
//                   </FormControl> */}
//                     {/* <TextField
//                       fullWidth
//                       className={classes.textFieldWide}
//                       id="color"
//                       type="text"
//                       label="Color"
//                       margin="dense"
//                       variant="outlined"
//                       value={color}
//                       onChange={e => setColor(e.target.value)}
//                       helperText={newColor.map((item) => (item + ""))}
//                       style={{width: "43%"}}
//                     /> */}
//                   <IconButton type="button" onClick={handleClickOpen}>
//                     <AddIcon/>
//                   </IconButton>
//                  <ColorModal
//                   open={open}
//                   handleClose={handleClose}
//                   newColor={newColor}
//                   setNewColor={setNewColor}
//                   color={color}
//                   setColor={setColor}
//                   setOpen={setOpen}
//                  />
//                   </div>

//                   <div className={classes.formGroup}>

// <FormControl className={classes.textFieldWide} variant="outlined" style={{margin: "8px"}}>
//           <InputLabel htmlFor="price">Price</InputLabel>
//           <OutlinedInput
//             id="price"
//             value={price}
//             type="number"
//             onChange={e => setPrice(e.target.value)}
//             startAdornment={<InputAdornment position="start">$</InputAdornment>}
//             labelWidth={60}
//             label="Price"
//             style={{height: 41}}
//           />
//         </FormControl>

//            <TextField
//                     className={classes.textFieldWide}
//                     id="quantity"
//                     type="number"
//                     label="Quantity"
//                     margin="dense"
//                     variant="outlined"
//                     value={quantity}
//                     onChange={e => setQuantity(e.target.value)}
//                 />
//                 </div>

//                 <div className={classes.formGroup}>
//                   <FormControl variant="outlined"  required className={classes.category}>
//                         <InputLabel className={classes.stateInp} ref={inputLabel} htmlFor="Category" >Category</InputLabel>
//                         <Select
//                           // fullWidth
//                           id="category"
//                           type="text"
//                           label="Category"
//                           margin="dense"
//                           variant="outlined"
//                           value={category}
//                           onChange={e => setCategory(e.target.value)}
//                         >
//                             {categories.map((cat, key) => (
//                             <MenuItem key={key} value={cat}>{cat}</MenuItem>
//                             ))}
//                         </Select> 
//                   </FormControl> 

//                   <TextField
//                     className={classes.textFieldWide}
//                     id="supplier"
//                     type="text"
//                     label="Supplier"
//                     margin="dense"
//                     variant="outlined"
//                     value={supplier}
//                     onChange={e => setSupplier(e.target.value)}
//                 />  
               
               
//                 </div>
                
//                  <div className={classes.formGroup}>
//                  <TextField
//                     className={classes.textFieldWide}
//                     id="itemNumber"
//                     type="text"
//                     label="Item Number"
//                     margin="dense"
//                     variant="outlined"
//                     value={item_number}
//                     onChange={e => setItemNumber(e.target.value)}
//                 /> 
//                    <TextField
//                     className={classes.textFieldWide}
//                     id="itemName"
//                     type="text"
//                     label="Item Name"
//                     margin="dense"
//                     variant="outlined"
//                     value={item_name}
//                     onChange={e => setItemName(e.target.value)}
//                 />
//                 </div>  

                
//                  <div className={classes.description}>
//                  <TextField
//                  fullWidth
//                     className={classes.textFieldDesc}
//                     id="description"
//                     type="text"
//                     label="Description"
//                     margin="dense"
//                     variant="outlined"
//                     value={description}
//                     rows={10}
//                     multiline
//                     onChange={e => setDescription(e.target.value)}
//                     inputProps={{
//                       maxLength: CHAR_LIMIT
//                     }}
//                     helperText={`${description.length}/${CHAR_LIMIT}`}
//                 />
//                 </div>   
                 
//             </form>
//             <Button aria-label="add product" className={classes.btn} type="submit" variant="contained" onClick={uploadImage}>Add Product</Button>
//             </Grid>

         
//         </Grid>
//     )
// };

// export default withRouter(AddProduct);
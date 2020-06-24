import React, {useState, useRef, createRef} from 'react';
import {withRouter} from "react-router-dom";
import AddProductForm from "./../../Containers/Forms/StoreForms/AddProduct";
import MobileImageUpload from "./../../Containers/Forms/StoreForms/MobileForm/AddProduct/ImageUpload";
import MobileAddProductFrom from "./../../Containers/Forms/StoreForms/MobileForm/AddProduct/MobileAddProduct";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from '@material-ui/core';
import {useDispatch} from "react-redux"
import {storage} from "./../../firebaseConfig";
import {addProduct} from "./../../Store/Actions/products";
import Input from "@material-ui/core/Input";
import {yellowColor, iconColor, categories, greenColor} from "./../../GlobalStyles/styles";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "2px solid green",
        width: "100%",
        // [theme.breakpoints.down("xs")]: {
        //     height: 200
        // }
    },
    mobileForm: {
        display: "none",
        [theme.breakpoints.down("md")]: {
            display: "flex",
            width: "90%",
            margin: "0 auto",
        }
    },
    deskTopForm: {
        border: "1px solid red",
        width: "100%",
        // [theme.breakpoints.down("sm")]: {
        //     border: "10px solid orange",
            
        // },
        [theme.breakpoints.down("md")]: {
            // border: "1px solid pink",
            display: "none",
        }
    }
}))

const AddProduct = (props) => {
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(null);
    // eslint-disable-next-line
    const [image_url, setImageUrl] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [item_number, setItemNumber] = useState("");
    const [item_name, setItemName] = useState("");
    const [supplier, setSupplier] = useState("");
    const [file, setFile] = useState(null);
    const [previewImg, setPreviewImg] = useState("");
    const photoInp = createRef();
    const inputLabel =useRef(null);
    const [step, setStep] = useState(1);
    const [imageSuccess, setSuccess] = useState(false);
console.log("step", step)
    const dispatch = useDispatch();
  

    const next = () =>  {
       
        setStep(step + 1)
    };

    const prev = () =>  {
        
        setStep(step - 1)
    };

    const fileHandler = e => {
        e.persist();
        if (e.target.files[0]) {
          setFile(() => e.target.files[0]);
          setSuccess(true);
          setPreviewImg(URL.createObjectURL(e.target.files[0]));
        }
    };
    
    return (
        <Grid className={classes.root} >
           
            <div className={classes.mobileForm}>
            {step === 1 &&
    <MobileImageUpload 
    fileHandler={fileHandler} 
    previewImg={previewImg} 
    image_url={image_url} 
    photoInp={photoInp} 
    title={title} 
    file={file} 
    next={next} 
    step={step}
    imageSuccess={imageSuccess}
    />
|| step === 2 &&
<MobileAddProductFrom 
file={file} 
next={next} 
prev={prev}/>

|| step !== 1 || 2 || undefined  || null && 
<div>error</div>

}
            </div>
           
            <div className={classes.deskTopForm}><AddProductForm/></div>
        </Grid>
    )
};

export default withRouter(AddProduct);
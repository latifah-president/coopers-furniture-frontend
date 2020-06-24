import React, {useState, useRef, createRef} from 'react';
import {withRouter} from "react-router-dom";
import AddProductForm from "./../../Containers/Forms/StoreForms/AddProduct";
import MobileImageUpload from "./../../Containers/Forms/StoreForms/MobileForm/AddProduct/MultiStepForm";
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
        [theme.breakpoints.down("sm")]: {
            display: "flex",
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

    const dispatch = useDispatch();
  

    const next = () =>  {
        // let curStep = step
        setStep(step + 1)
    };

    const prev = () =>  {
        // let curStep = step
        setStep(step - 1)
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
                  image_url: url,
                  category: category,
                  quantity: quantity,
                  item_number: item_number,
                  item_name: item_name,
                  supplier: supplier
                };
                dispatch(addProduct(productObj));
                props.history.push("/")
              });
          }
        );
    };

    // const fileHandler = e => {
    //     e.persist();
    //     if (e.target.files[0]) {
    //       setFile(() => e.target.files[0]);
    //     setSuccess(true)
    //       setPreviewImg(URL.createObjectURL(e.target.files[0]));
    //     }
    // };

    return (
        <Grid className={classes.root} >
            {/* <div className={classes.mobileForm}>

            </div> */}
            <MobileImageUpload/>

            {/* {step === 1 ? <MobileImageUpload fileHandler={fileHandler} previewImg={previewImg} image_url={image_url} photoInp={photoInp} title={title} file={file} next={next} step={step}/> : (step === 2 ? <AddProductForm file={file} next={next} prev={prev}/> : null) } */}
            <div className={classes.deskTopForm}><AddProductForm/></div>
        </Grid>
    )
};

export default withRouter(AddProduct);
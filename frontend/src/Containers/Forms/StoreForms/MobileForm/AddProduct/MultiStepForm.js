import React, {useState, createRef} from "react";
import Details from "./Details";
import MobileImageUpload from "./ImageUpload";
import Price from "./Price";
import Colors from "./../../../../../Containers/Admin/AddColor";
import {withRouter} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux"
import {storage} from "./../../../../../firebaseConfig";
import {addProduct} from "./../../../../../Store/Actions/products";
import { iconColor, greenColor} from "./../../../../../GlobalStyles/styles";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Error from "./../../../../../Components/Error/Error";
const useStyles = makeStyles((theme) => ({

    root: {
      width: '100%',
      display: "flex",
      flexDirection: "column",
    //  border: "1px solid blue"
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    btn: {
        // margin: "2rem auto",
        color: "white",
        width: "25%",
        // border: "1px solid red",
        backgroundColor: `${iconColor}`,
        borderRadius: 0,
        margin: ".3rem 0",
        "&:hover": {
          backgroundColor: `${greenColor}`,
    
        },
        [theme.breakpoints.down('xs')]: { 
          width: "100%",
        },
    },
    hide: {
        display: "none"
    },
    stepper: {
      // marginTop: "2rem"
    },
    btnGrid: {
      width: "90%",
      margin: "0 auto",
      // marginTop: "6.5rem",
      // border: "1px solid red"
    }
  }));

const MultiStepForm = (props) => {

    function getSteps() {
        return ['Photo', 'Details', 'Select Colors', 'Supplier Info', ];
      }
      

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
    const [item_price, setItemPrice] = useState(null);
    const [supplier, setSupplier] = useState("");
    const [file, setFile] = useState(null);
    const [previewImg, setPreviewImg] = useState("");
    const photoInp = createRef();
    const [color, setColor] = useState("");
    const [newColor, setNewColor] = useState([])
    const [imageSuccess, setSuccess] = useState(false);
    const [right, setRight] = useState([]);

    const dispatch = useDispatch();
    const firebase_id = useSelector(state => state.user.firebase_id)
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleReset = () => {
          setTitle("")
          setFile(null)
        setActiveStep(0);
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
      }

      const addColor = (color) => {
        setNewColor(newColor.concat(color))
      }

      function getStepContent(stepIndex) {
        switch (stepIndex) {
          case 0:
            return (
                <MobileImageUpload
                    fileHandler={fileHandler} 
                    previewImg={previewImg} 
                    image_url={image_url} 
                    photoInp={photoInp} 
                    title={title} 
                    file={file} 
                    next={handleNext} 
                    step={activeStep}
                    imageSuccess={imageSuccess}
                    setTitle={setTitle}
                />
            );
          case 1:
            return (
                <Details
                    file={file} 
                    next={handleNext} 
                    prev={handleBack}
                    category={category}
                    setCategory={setCategory}
                    color={color}
                    setColor={setColor}
                    newColor={newColor}
                    description={description}
                    setDescription={setDescription}
                    addNewColor={addColor}
                    price={price}
                    setPrice={setPrice}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    
                />
                
            );
            case 2:
              return (
                  <Colors
                      next={handleNext} 
                      prev={handleBack}
                      right={right}
                      saveColor={addToState}
                      item_name={item_name}
                      setItemName={setItemName}

                      item_number={item_number}
                      setItemNumber={setItemNumber}

                      supplier={supplier}
                      setSupplier={setSupplier}
                      color={color}
                      setColor={setColor}
                      newColor={newColor}
                  />
              );
          case 3:
            return (
                <Price
                    next={handleNext} 
                    prev={handleBack}
                    
                    item_name={item_name}
                    setItemName={setItemName}

                    item_number={item_number}
                    setItemNumber={setItemNumber}

                    item_price={item_price}
                    setItemPrice={setItemPrice}

                    supplier={supplier}
                    setSupplier={setSupplier}
                />
            );
            default:
            return (
                <Error/>
            );
        }
      }

   

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
                  image_url: [url],
                  category: category,
                  quantity: quantity,
                  item_number: item_number,
                  item_name: item_name,
                  supplier: supplier,
                  color: newColor,

                };
                dispatch(addProduct(productObj));
                // props.handleChange(3)
                props.history.push(`/storemanager/${firebase_id}`)
              });
          }
        );
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
       
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button className={classes.btn} onClick={handleReset}>Add Product</Button>
          </div>
        ) : (
          <div>
             
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
            <div className={classes.btnGrid}>
            <Button className={classes.btn}  variant="contained"  onClick={activeStep === steps.length - 1 ? uploadImage : handleNext} >

            {/* <Button className={classes.btn}  variant="contained"  onClick={activeStep === steps.length - 1 ? uploadImage : handleNext} disabled={file && title ? false : true} > */}
                {activeStep === steps.length - 1 ? 'Add Product' : 'Next'}
              </Button>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={activeStep === 0 ? classes.hide : classes.btn}
              >
                Back
              </Button>
              
            </div>
          </div>
        )}
      </div>
      {/* <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}> 
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> */}
     

        
        </Grid>
    )
};

export default withRouter(MultiStepForm);
import React, {useState, createRef, useEffect} from "react";
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
import {addProduct, getProductsBy, updateProduct} from "./../../../../../Store/Actions/products";
import { iconColor, greenColor} from "./../../../../../GlobalStyles/styles";
import Error from "./../../../../../Components/Error/Error";
import Progress from "./../../../../../Components/Progress";
import { StarTwoTone } from "@material-ui/icons";

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
    const [color_id, setColorId] = useState(0);
    const [image_id, setImageId] = useState(0);
    const [out_of_stock, setOutOfStock] = useState(false);
    const [back_in_stock, setBackInStock] = useState("");
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);
    const [upload, setUpload] = useState(0);
    const [progress, setProgress] = useState(0);
    // const [checked, setChecked] = useState(false);
    const [state, setState] = useState({
      out_of_stock: false,
    });
    const steps = getSteps();

    const firebase_id = useSelector(state => state.user.firebase_id);
    const edit = useSelector(state => state.product.edit);
    const product = useSelector(state => state.product.products);

    const id = props.match.params.id;
    const col = "id"
    let today = new Date().toISOString().slice(0, 10);

    useEffect(() => {
      const filter = id
      if (edit) {
        dispatch(getProductsBy(col, filter))
        // eslint-disable-next-line 
        product.map((item) => {
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
          setImageUrl(item.image_url)
          setState({
            out_of_stock: item.out_of_stock
          })
      });
    }
    // console.log("DESCRIPTION", prodDesc)
      return () => {
          console.log("unsubscribe ");
        };
    }, [dispatch, id, edit]);

    
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
        out_of_stock: state.out_of_stock,
        back_in_stock: back_in_stock
      }
     console.log("productObj", productObj)

      const handleUpdate = () => {
        dispatch(updateProduct(id, productObj));
       
          props.history.push(`/products`)
        
      };
      console.log("state.checked", state.out_of_stock)
      
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        setOutOfStock(state.out_of_stock)
      };

      const handleDateChange = (event) => {
        console.log("EVENT", event)

        setBackInStock(event.target.value)
      };

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
                    edit={edit}
                    
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
                    saveColor={addToState}
                    item_name={item_name}
                    setItemName={setItemName}
                    activeStep={activeStep}
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

                    checked={state.out_of_stock}

                    today={today}

                    out_of_stock={out_of_stock}
                    setOutOfStock={setOutOfStock}

                    back_in_stock={back_in_stock}
                    setBackInStock={setBackInStock}

                    handleChange={handleChange}
                    handleDateChange={handleDateChange}
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
        setUpload(true)
        let currentProductName = "product-image-" + Date.now();
        let metaData = {contentType: "image/jpeg"}
        let uploadImage = storage.ref(`images/${currentProductName}`).put(file, metaData);
        uploadImage.on(
          "state_changed",
          (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            setProgress(progress)
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
                  item_price: item_price,
                  supplier: supplier,
                  color: newColor,

                };
                dispatch(addProduct(productObj));
                // handleReset()
                // props.handleChange(3)
                props.history.push(`/profile/${firebase_id}/settings`)
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
       <Progress progress={progress} setUpload={upload}/>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button className={classes.btn} onClick={handleReset}>Add Product</Button>
          </div>
        ) : (
          <div>
             
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
            {edit ? <div className={classes.btnGrid}>
             
             <Button className={classes.btn}  variant="contained"  onClick={activeStep === steps.length - 1 ? handleUpdate : handleNext} >
 
             {/* <Button className={classes.btn}  variant="contained"  onClick={activeStep === steps.length - 1 ? uploadImage : handleNext} disabled={file && title ? false : true} > */}
                 {activeStep === steps.length - 1 ? 'Update Product' : 'Next'}
               </Button>
               <Button
                 disabled={activeStep === 0}
                 onClick={handleBack}
                 className={activeStep === 0 ? classes.hide : classes.btn}
               >
                 Back
               </Button>
 
             </div> : 
            <div className={classes.btnGrid}>
             
            <Button className={classes.btn}  variant="contained"  onClick={activeStep === steps.length - 1 ?  uploadImage: handleNext} >

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
              }
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
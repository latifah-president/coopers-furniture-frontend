import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { iconColor, greenColor} from "./../../../../../GlobalStyles/styles";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
const useStyles = makeStyles(theme => ({
      btn: {
        // margin: "2rem auto",
        color: "white",
        width: "100%",
        // border: "1px solid orange",
        backgroundColor: `${iconColor}`,
        borderRadius: 0,
        "&:hover": {
          backgroundColor: `${greenColor}`,
    
        },
        // [theme.breakpoints.down('xs')]: { 
        //   width: "90%",
        // },
    },
    fileInput: {
      // border: "1px solid black"
    },
    imagePreview: {
        display: "none",
      [theme.breakpoints.down('md')]: { 
      
       width: "80%",
      // height: 400,
      // border: "2px solid red",
      display: "flex",
      // justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "column",
      },
      [theme.breakpoints.down('xs')]: { 
      
        width: "100%",
        height: "auto",

    //    height: 400,
    //    border: "2px solid black",
    //    display: "flex",
    //    justifyContent: "space-around",
    //    alignItems: "center",
    //    flexDirection: "column",
       },
    },
    image: {
      // marginTop: "4rem",
    //  border: `2px dashed yellow`,
      width: "100%",
    // maxHeight: 184,
    // minHeight: 184,
      display: "flex",
      // justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "column",
      color: `${iconColor}`,
      [theme.breakpoints.down('xs')]: { 
        maxHeight: 350,
      },
    },
    img: {
      maxWidth: 294.3,
      maxHeight: 224.4,
    },
   
    hide: {
        display: "none",
    },
    text: {
        textTransform: "capitalize",
        fontSize: "1rem",
        width: "100%",
        padding: ".5rem",
        // border: "1px solid hotpink",
        minWidth: 250,
        backgroundColor: `${greenColor}`,
      
    },
    icon: {
        // border: "1px solid orange",
        fontSize: "1.5rem",
        // marginBottom: "1rem"
    },
    label: {
        // border: "1px solid green",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // width: "100%",
        flexDirection: "column",
    },
    active: {
      // margin: "2rem auto",
      color: "white",
      width: "100%",
      // border: "1px solid black",
      backgroundColor: `${greenColor}`,
      borderRadius: 0,
      "&:hover": {
        backgroundColor: `${greenColor}`,
  
      },
      // [theme.breakpoints.down('xs')]: { 
      //   width: "90%",
      // },
    },
    btnContent: {
      display: "flex",
      justifyContent: "space-around",
      // border: "1px solid black",
      alignItems: "center",
      fontSize: "1rem"
    },
    textFieldWide: {
      // marginLeft: theme.spacing(1),
      // marginRight: theme.spacing(1),
      // width: "416px",
      justifyContent: "left",
      // border: "1px solid teal",
      margin: "2rem",
      width: "90%"
      // [theme.breakpoints.down('xs')]: { 
      //   width: "98%",
      //   margin: "1rem auto"
      // },
    },
    formGrid: {
      // border: "1px solid orange",
      // alignSelf: "flex-end",
      // minHeight: 200,
      // width: "100%"
    },
    form: {
      //  border: "3px solid teal",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      // minHeight: "100%",
    },
    imageGrid: {
      width: "100%",
    }
}));


const MobileImageUpload = (props) => {
    const classes = useStyles();

  
    return (
            <Grid className={classes.imagePreview}>
              <form className={classes.form}>
                        <Grid className={classes.image}>
                        <TextField
                      fullWidth
                      className={classes.textFieldWide}
                      id="title"
                      type="text"
                      label="Product Title"
                      margin="dense"
                      variant="outlined"
                      value={props.title}
                      onChange={e => props.setTitle(e.target.value)}
                    />
                    {props.edit ? null : 
                     <Grid className={classes.imageGrid}>
                    
                     
                            <label htmlFor="image-upload" className={classes.label} id="buttonlabel">
                            {props.file === null ? null : <img className={classes.img} src={props.previewImg} alt={"image preview" || props.title}/>}

    <div role="button" className={ props.previewImg ? `${classes.hide}` :  `${classes.text} ${classes.btn}`}>{props.previewImg ? null : <div className={classes.btnContent}><PhotoLibraryIcon className={classes.icon}/> Select Photo</div> }</div>
                        </label>
                        <Input
                        className={classes.fileInput}
                        id="image-upload"
                        accept="image/*"
                        name="image"
                        type="file"
                        onChange={e => props.fileHandler(e)}
                        value={props.image_url}
                        margin="dense"
                        ref={props.photoInp}
                        label="Image Upload"
                        style={{display: "none"}}
                        /> 
                  
               
                </Grid> 
                 }       
                </Grid>
                     

                    {/* <div className={classes.formGrid}> */}
                   
                    {/* </div> */}

                        </form>

                </Grid>
       
    )
};

export default MobileImageUpload;
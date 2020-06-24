import React, {useState} from "react";
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import {yellowColor, iconColor, greenColor} from "./../../../../../GlobalStyles/styles";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
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
      border: "1px solid black"
    },
    imagePreview: {
        display: "none",
      [theme.breakpoints.down('md')]: { 
      
       width: "80%",
      height: 400,
      border: "2px solid black",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "column",
      },
      [theme.breakpoints.down('xs')]: { 
      
        width: "100%",
    //    height: 400,
    //    border: "2px solid black",
    //    display: "flex",
    //    justifyContent: "space-around",
    //    alignItems: "center",
    //    flexDirection: "column",
       },
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
   
    hide: {
        display: "none",
    },
    text: {
        textTransform: "capitalize",
        fontSize: "1rem",
        width: "100%",
        padding: ".5rem"
    },
    icon: {
        // border: "1px solid orange",
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
    }
}));


const MobileImageUpload = (props) => {
    const classes = useStyles();
    console.log("props", props);
    console.log("title from image", props.title);
    console.log("step from image", props.step);
    console.log("mobile image", props.imageSuccess === true ? "image uploaded" : "image is not here");

    const next = e => {
        e.preventDefault();
        props.next()
    };

    return (
        // <Grid className={classes.root}>
            <Grid className={classes.imagePreview}>
                        <Grid className={classes.image}>
                            <label htmlFor="image-upload" className={classes.label}>
                        {props.file === null ? <PublishIcon className={classes.icon}/> : <img className={classes.img} src={props.previewImg} alt={"image preview" || props.title}/>}
    <Typography variant="p" component="p" className={ props.previewImg ? `${classes.hide}` :  `${classes.text} ${classes.btn}`}>{props.previewImg ? null : "Upload your image"}</Typography>
                        </label>
                        </Grid>
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
                        <Button disabled={props.previewImg ? false : true} className={classes.btn} type="button" aria-label="next" onClick={next}>Next</Button>
                </Grid>
        // </Grid>
       
    )
};

export default MobileImageUpload;
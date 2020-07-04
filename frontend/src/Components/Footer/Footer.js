import React from "react";
import {withRouter} from "react-router-dom";
import {useSelector} from "react-redux";
import Grid  from "@material-ui/core/Grid";
import MobileNav from "./MobileNav";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Mail';
import  Typography  from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
      // flexGrow: 1,
      position: "relative",
      bottom: 0,
      width: "100%",
      // zIndex: 1250,
      // border: "1px solid orange",
      // height: 42,
      backgroundColor: "#366E82",
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "column",
      color: "white",
      [theme.breakpoints.down('sm')]: {
        flexDirection: "column",
        height: "auto",
        alignItems: "center",
        position: "fixed",
      },
      [theme.breakpoints.down('xs')]: {
        backgroundColor: "nonw",

      },
    },
    icons: {
      // border: "1px solid red",    
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    icon: {
      color: "#374F71",
      fontSize: "1.8rem"
    }, 
 
  iconBtn: {
    // border: "1px solid orange",
    display:"flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // padding: 0,
    // margin: 0,
    // width: "90%"
  },
  iconText: {
    fontSize: ".8rem",
    textDecoration: "none",
    color: "#374F71"
  },
  iconWrapper: {
    // border: "1px solid white",
    display: "flex",
    // alignSelf: "center",
    justifyContent: "center",
    width: "75%",
    [theme.breakpoints.down('xs')]: { 
      marginBottom: ".5rem"
    },
  },
  socialMedia: {
    [theme.breakpoints.down('sm')]: { 
      display: "none",
    },
  },
  socialIcon: {
    color: "white",
    fontSize: "2rem",
    alignSelf: "center",
    marginRight: "1rem",
    [theme.breakpoints.down('sm')]: { 
      fontSize: "1.5rem",
      // marginBottom: "1rem",
    },
  },
  anchor: {
    textDecoration: "none",
    color: "white",
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: ".8rem"
    }
    // border: "1px solid gray"
  },
  bottom: {
    borderTop: "1px solid white",
    textAlign: "center",
    width: "70%",
    margin: "1.5rem auto 1rem auto",
    // padding: "1rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: ".1rem",
      margin: "1rem  auto",
      width: "90%",
    }
  },
  top: {
    display: "flex",
    [theme.breakpoints.down('xs')]: { 
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // border: "1px solid white",
      // padding: "1rem"
    },
  },
  copyRight: {
    textTransform: "capitalize",
    marginTop: "1rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: ".8rem"
    }
  },

  desktop: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  }
  }));
  
const Footer = (props) => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
          
          <div className={classes.desktop}>
          <Grid className={classes.top}>
  
      
                      <Grid item className={classes.iconWrapper}>
                          <IconButton aria-label="facebook" className={classes.iconBtn}>
                                <FacebookIcon className={classes.socialIcon}/>
                          </IconButton>
                       
                          <IconButton aria-label="instagram" className={classes.iconBtn}>
                                <InstagramIcon className={classes.socialIcon}/>
                          </IconButton>
                      </Grid>

                      <Grid item className={classes.iconWrapper}>
                                <PhoneIcon className={`${classes.socialIcon}`}/>
                          <a  className={classes.anchor} href="tel:1-737-333-8683"><Typography className={classes.anchorText}>737-333-8683</Typography></a>
                      </Grid>

                      <Grid item className={classes.iconWrapper}>
                                <EmailIcon className={classes.socialIcon}/>
                          <a className={classes.anchor} href="mailto:contact@coppershomefurniture.com"> <Typography className={classes.anchorText}>contact@coppershomefurniture.com</Typography></a>
                      </Grid>
                      </Grid>
                      <Grid className={classes.bottom}>
                        <Typography className={classes.copyRight} component="p" variant="body1">
                          &copy;{new Date().getFullYear()} ARC LIMITED | All rights reserved | Terms Of Service | Privacy
                        </Typography>
                      </Grid>
                      </div>
                      <MobileNav/>
                      
        </div>
    )
};

export default withRouter(Footer);
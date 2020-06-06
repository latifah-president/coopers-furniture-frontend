import React from "react";
import Grid  from "@material-ui/core/Grid";
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
      flexGrow: 1,
      position: "fixed",
      bottom: 0,
      width: "100%",
      zIndex: 1300,
      // border: "1px solid orange",
      height: 42,
      backgroundColor: "#366E82",
      display: "flex",
      justifyContent: "space-around",
      color: "white",
      [theme.breakpoints.down('sm')]: {
        flexDirection: "column-reverse",
        height: "auto",
        alignItems: "center"
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
  },
  socialMedia: {
    [theme.breakpoints.down('sm')]: { 
      display: "none",
    },
  },
  socialIcon: {
    color: "white",
    fontSize: "2rem",
    [theme.breakpoints.down('sm')]: { 
      fontSize: "1.5rem",
    },
  },
  anchor: {
    textDecoration: "none",
    color: "white",
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    // border: "1px solid gray"
  }
  }));
  
const Footer = () => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
                      <Grid item className={classes.iconWrapper}>
                          <IconButton className={classes.iconBtn}>
                                <FacebookIcon className={classes.socialIcon}/>
                          </IconButton>
                          <IconButton className={classes.iconBtn}>
                                <TwitterIcon className={classes.socialIcon}/>
                          </IconButton>
                          <IconButton className={classes.iconBtn}>
                                <InstagramIcon className={classes.socialIcon}/>
                          </IconButton>
                      </Grid>

                      <Grid item className={classes.iconWrapper}>
                          <IconButton className={classes.iconBtn}>
                                <PhoneIcon className={classes.socialIcon}/>
                          </IconButton>
                          <a  className={classes.anchor} href="tel:1-737-333-8683"><Typography>737-333-8683</Typography></a>
                      </Grid>

                      <Grid item className={classes.iconWrapper}>
                          <IconButton className={classes.iconBtn}>
                                <EmailIcon className={classes.socialIcon}/>
                          </IconButton>
                          <a className={classes.anchor} href="mailto:contact@coppershomefurniture.com"> <Typography>contact@coppershomefurniture.com</Typography></a>
                      </Grid>
        </div>
    )
};

export default Footer
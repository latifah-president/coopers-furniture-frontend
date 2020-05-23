import React from 'react';
import { withRouter } from 'react-router-dom';
import ProfileNav from '../../Components/Nav/ProfileNav';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    border: "2px solid red",
    marginTop: "4rem",
    // color: `${fontColor}`
  },
  heading: {
    fontSize: "1.8rem",
    marginLeft: "3rem",
    // borderBottom: `2px solid ${purpleColor}`,
    width: "5%",
    fontWeight: 400,
  }
}));
const Profile = (props) => {
  const classes = useStyles();

    console.log("prams", props)
    return (
      <Grid className={classes.root}>
          <Typography varient="h2" className={classes.heading}>ORDERS</Typography>
        <ProfileNav params={props.match.params}/>
        {/*TODO: CHANGE TITLE BASED ON WHICH URL PARAM IS SHOWING EX: ORDERS, PAYMENT METHODS, ECT */}
      </Grid> 
    )
};

export default withRouter(Profile)
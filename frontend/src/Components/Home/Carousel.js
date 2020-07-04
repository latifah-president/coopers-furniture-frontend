import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { makeStyles } from '@material-ui/core/styles';
import Grid  from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    carousel: {
        margin: 'auto',
        width: '80%',
        //  border: "1px solid green",
               
    },
    slide: {
        // border: "1px solid red",
        width: "100%",
        height: "450px",
        textAlign: "center",
        display: "flex",
  justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            height: "270px",
          },
    },
    image: {

    }
}));
  
const ResponsiveCarousel = () => {
    const classes = useStyles();
    return (
	<Grid className={classes.carousel}>
		<Carousel showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true} >
			<div className={classes.slide}>
				<img style={{width: "100%"}} src={require("./../../Assets/rEVERSIBLE_SECTIONAL.jpeg")} alt="Reversible Gray Sectional" />
			</div>
			<div className={classes.slide}>
				<img  src={require("./../../Assets/sven-brandsma-GZ5cKOgeIB0-unsplash.jpg")} alt="livingroom set"/>
			</div>
			<div className={classes.slide}>
				<img  src={require("./../../Assets/khloe-arledge-QDMmnuvKGGU-unsplash.jpg")} alt="Queen Bedroom Set"/>
			</div>
		</Carousel>
	</Grid>
  );
}

export default ResponsiveCarousel;
import React, {useState} from "react";
import ReactPlayer from 'react-player'
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import agentVideo from "./../../../Assets/videos/salesagent.mp4";

const useStyles = ((theme) => ({
    playerWrapper: {
    position: "relative",
    paddingTop: "56.25%" /* Player ratio: 100 / (1280 / 720) */
    },
    reactPlayer: {
        position: "absolute",
  top: 0,
  left: 0,
    }
}))

const IntroVideo = () => {
    const classes = useStyles();
    const [watchComplete, setWatchComplete] = useState(false);

    const handleWatchComplete = (state) => {
        console.log("watch complete", state)
    };

      return (
        <Grid className={classes.playerWrapper}>
          <ReactPlayer
            className={classes.reactPlayer}
            url={agentVideo}
            width='100%'
            height='100%'
            controls={true}
            onProgress={handleWatchComplete}
          />
        </Grid>
      )
    
  };

  export default IntroVideo;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: "1rem",
  },
  open: {
      display: "block"
  },
  close: {
      display: "none"
  }
});

export default function LinearDeterminate(props) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((oldProgress) => {
//         if (oldProgress === 100) {
//           return 0;
//         }
//         const diff = Math.random() * 10;
//         return Math.min(oldProgress + diff, 100);
//       });
//     }, 500);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

  return (
    <div className={props.upload ? classes.root : classes.close} >
      <LinearProgress variant="determinate" value={props.progress} />
    </div>
  );
}

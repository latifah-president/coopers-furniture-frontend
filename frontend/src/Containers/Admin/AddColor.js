import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {Add, Save, Undo} from '@material-ui/icons/';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import {Button, IconButton, TextField} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {greenColor, iconColor} from "./../../GlobalStyles/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    // border: "4px solid orange",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.down('xs')]: {
      padding: "1rem"
    }
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
    [theme.breakpoints.down('xs')]: {
      border: `1px solid ${iconColor}`,
      width: 160,
    }
  },
  button: {
    margin: theme.spacing(0.5, 0),
    color: "white",
    backgroundColor: `${iconColor}`
  },
  checked: {
    '&$checked': {
        color: `${greenColor}`,
      },
  },
  desktop: {
    [theme.breakpoints.down('xs')]: {
      display: "none"
    }
  },
  mobile: {
    display: "none",
    [theme.breakpoints.down('xs')]: {
      // border: "1px solid red",
      display: "flex",
      width: "100%",
      justifyContent: "space-around",
    }
  },
  mobileList: {
    display: "none",
    [theme.breakpoints.down('xs')]: {
      // border: "1px solid green",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      padding: ".3rem",
    }
  },
  mobilePapaer: {
    width: "40%"
  },
  mobileBtn: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  addColor: {
    display: "flex",
    justifyContent: "space-around",
   
    // border: "1px solid purple",
    [theme.breakpoints.down('xs')]: { 
      fontSize: "1rem",
      padding: ".5rem",
      width: "100%",
    },
  },
  sectionHeader: {
    fontSize: "1rem",
    color: `${greenColor}`,
    [theme.breakpoints.down('xs')]: { 
      fontSize: "1rem",
      padding: ".5rem",
    },
  },
  form: {
    width: "100%",
  },
  textFieldWide: {
    textTransform: "capitalize",
  }
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList(props) {
  const colors = useSelector(state => state.product.colors);

  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [add, setAdd] = React.useState([]);
console.log("colors to add", right)
console.log("left list add color", left)
// console.log("colors from backedn", colors)
console.log("props.color", props.color)
console.log("TRYING", right.map(item => item))

let addedColors = []

const map = () => {
    const cat = []
    const add = right.map(item => {
        return item
    // console.log("map item", item)
       
    })
// setAdd(prev => ({
//     ...prev, add
// }))
    // cat.concat(add)
    console.log("cat", cat)
    console.log("add", add)

}
// console.log("mappedy map", map)


const getColors = () => {
  const dbColors = colors.filter( function( item, index, inputArray ) {
    return inputArray.indexOf(item) == index;
});
    // let dbColors = colors.map(element => {
    //     console.log("mapped element ", element)
    //     return element
    //     // return left.concat(element)

    // });
    setLeft(left.concat(dbColors))
    console.log("db colors ", dbColors)

}

useEffect(() => {
      getColors()
    
    return () => {
        console.log("unsubscribe ");
      };
}, []  );


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log("value of checked item", value)
    // props.setNewColor(props.newColor.concat(value))
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };


  

  console.log("added colors", addedColors)

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked))
    // const map = right.map(item => item)
    // props.setNewColor(right.map(item => item))
//    let color = right.map(element => {
//         return addedColors.concat(element)
//     });
//     console.log("set colors  ", color)

// return color
// props.saveColor(right)
 
  };

  const addToState = () => {
    var arr2 = [];
    right.forEach(function(element) {
        if (isNaN(element)) {   // only pushes the strings, not numbers or booleans
            arr2.push(element);
        }
        console.log("array 2", arr2);  // output as wished: apple, banana, grape
    })
  }

  console.log("let added colors ", addedColors)
  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const addColor = () => {
    setLeft(left.concat(props.color))
  };

  const saveColor = () => {
   props.saveColor(right)
  }

  console.log("new color", props.newColor)

  const customList = (title, items) => (
    console.log("items", items),
    <Paper className={classes.paper}>
      <Typography className={classes.sectionHeader} component="h2">{title}</Typography>
      <List dense component="div" role="list">
        {items.map((value, i) => {
           console.log("value", value.colors);
          const labelId = `transfer-list-item-${value.colors}-label`;
         

          return (
            <ListItem key={i} role="listitem" button onClick={handleToggle(value.colors)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value.colors) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  className={classes.checked}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.colors} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
   
   <Grid className={classes.mobileList}>
        <Grid item >{customList("Colors", left)}</Grid>


        <Grid item  className={classes.mobilePapaer} style={{color: "orange"}}>{customList("Selected Colors", right)}</Grid>
      </Grid>

      <Grid item className={classes.desktop}>{customList("Colors", left)}</Grid>

      <Grid item className={classes.desktop}>
        <Grid container direction="column" alignItems="center">
        
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            // disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            add selected
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            // disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
           remove selected
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={saveColor}
            startIcon={<Save />}
            // disabled={right.length === 0}
            aria-label="save"
          >
          Save Colors
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            startIcon={<Undo/>}
            // disabled={right.length === 0}
            aria-label="undo"
          >
          undo
          </Button>
        </Grid>
      </Grid>




      <Grid item style={{color: "orange"}} className={classes.desktop}>{customList("Selected Colors", right)}</Grid>
      
        <Grid className={classes.addColor}>
      <form className={classes.form}>
           <TextField
            fullWidth
            className={classes.textFieldWide}
            id="color"
            type="text"
            label="Color"
            margin="dense"
            variant="outlined"
            value={props.color}
            onChange={e => props.setColor(e.target.value)}
            helperText="Dont't see your color? Enter a new one."
            style={{width: "80%", textTransform: "capitalize"}}
            />
             <IconButton type="button" onClick={addColor}> <Add/>  </IconButton>
      </form>
      </Grid>



      <Grid item className={classes.mobile}>
        <Grid className={classes.mobileBtn} container direction="row" alignItems="center">
         
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            // disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
           Remove
            {/* &gt; */}
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            // disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            {/* &lt; */}
            Add
          </Button>
        
          <Button
        variant="outlined"
        // color="primary"
        size="small"
        className={classes.button}
        onClick={saveColor}
        // disabled={rightChecked.length === 0}
        aria-label="save"
        startIcon={<Save />}
      >
        Save
      </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            // disabled={right.length === 0}
            aria-label="undo"
            startIcon={<Undo />}
          >
          undo
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

import React, { useState } from 'react';
import { useSelector } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function BasicPagination(props) {
  const classes = useStyles();
  const products = useSelector(state => state.product.products);

  console.log("PAGE", props.currPage)

 

  return (
    <div className={classes.root}>
      <Pagination onChange={props.handleChange} count={props.count} page={props.currPage} />
  
    </div>
  );
}

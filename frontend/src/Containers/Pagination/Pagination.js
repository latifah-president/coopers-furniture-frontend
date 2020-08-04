// import React from 'react';
// import TablePagination from '@material-ui/core/TablePagination';

// export default function Pagination(props) {
//   const [page, setPage] = React.useState(2);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
// console.log("page", page)
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <TablePagination
//       component="div"
//       count={100}
//       page={props.currPage}
//       onChangePage={handleChangePage}
//       rowsPerPage={props.rowsPerPage}
//       onChangeRowsPerPage={handleChangeRowsPerPage}
//     />
//   );
// }




import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
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
  // const products = useSelector(state => state.product.products);
  const count = useSelector(state => state.product.count);

  console.log("COUNT from  pagination", count)

 

  return (
    <div className={classes.root}>
      <Pagination onChange={props.handleChange} count={10} page={props.currPage} />
    </div>
  );
}

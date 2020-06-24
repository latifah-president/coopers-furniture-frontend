import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import  queryString from "query-string";
import {getProductsBy} from "./../../Store/Actions/products";

const ProductBy = (props) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.products)
    const parsed = queryString.parse(props.location.search)
    const col = parsed.col
    const filter = parseInt(parsed.filter)
    const [home, setHome] = useState(null)
    // console.log("col:", col)
    // console.log("filter:", filter)

    useEffect(() => {
        {props.match.path === "/product" ? setHome(false) :  dispatch(getProductsBy(col, filter))}

       
        return () => {
            console.log("unsubscribe ");
          };
    }, [dispatch, home]);

    // console.log("product by", product)

    return (

        <div>
products 
name {product.title} 
desctiption {product.description}
price: {product.price}


        </div>
    )
};

export default withRouter(ProductBy);
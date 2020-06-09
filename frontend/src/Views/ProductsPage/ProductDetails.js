import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import  queryString from "query-string";
import {getProductsBy} from "./../../Store/Actions/products";

const ProductDetail = (props) => {
    console.log("props:", props)
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.products)
    const parsed = queryString.parse(props.location.search)
    const col = "id"
    const filter = props.match.params.id
   
    console.log("filter:", filter)

    useEffect(() => {
        dispatch(getProductsBy(col, filter))
       
        return () => {
            console.log("unsubscribe ");
          };
    }, [dispatch]);

    console.log("product by", product)

    return (

        <div>
products 
name {product.title} 
desctiption {product.description}
price: {product.price}


        </div>
    )
};

export default withRouter(ProductDetail);
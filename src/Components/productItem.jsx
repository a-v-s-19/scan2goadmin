import React from 'react'

const ProductItem = (props) => {
    const { product } = props
    return (
        <>
            <tr>
                <td >{product.Product_Barcode_ID}</td>
                <td >{product.Product_Type}</td>
                <td >{product.Product_Name}</td>
                <td >{product.Product_Price}</td>
                <td >{product.Product_Offer}</td>
                <td >{product.createdAt}</td>
            </tr>
        </>
    )
}

export default ProductItem
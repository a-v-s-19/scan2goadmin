import React, { useContext } from 'react'
import productContext from '../context/Products/ProductContext'
const PersonalproductItem = (props) => {
    const context = useContext(productContext)
    const { DeleteProduct } = context
    const { product ,updateProduct } = props
    return (
        <>
            <tr>
                <td >{product.Product_Barcode_ID}</td>
                <td >{product.Product_Type}</td>
                <td >{product.Product_Name}</td>
                <td >{product.Product_Price}</td>
                <td >{product.Product_Offer}</td>
                <td >{product.createdAt}</td>
                <td><div className="btn btn-primary" onClick={()=>{updateProduct(product)}}>Update</div></td>
                <td><div className="btn btn-warning" onClick={() => { DeleteProduct(product._id) }}>Delete</div></td>
            </tr>
        </>
    )
}

export default PersonalproductItem
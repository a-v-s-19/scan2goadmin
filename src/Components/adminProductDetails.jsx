import React, { useContext, useEffect } from 'react'
import productContext from '../context/Products/ProductContext';
import ProductItem from './productItem';
const AdminProductDetails = () => {
    const context = useContext(productContext);
    const { products, GetAllProducts } = context

    useEffect(() => {
        GetAllProducts()
    }, [GetAllProducts])

    return (
        <>
            <div className='container my-5'>
                <div className='mt-5'>
                    <table className="table table-dark table-striped table-bordered border-light text-center">
                        <thead className='table-light'>
                            <tr>
                                <th scope="col">Barcode ID</th>
                                <th scope="col">Product Type</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Offer</th>
                                <th scope="col">Product Upload Date</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            <div className="container mt-2 fw-semibold fs-2">
                                {products.length === 0 && " No Products is Stored"}
                            </div>
                            {products.map((product) => {
                                return <ProductItem key={product._id} product={product} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminProductDetails
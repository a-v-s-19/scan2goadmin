import React, { useContext, useEffect, useRef, useState } from 'react'
import productContext from '../context/Products/ProductContext';
import PersonalproductItem from './personalproductItem';
import { useNavigate } from 'react-router-dom';
const AdminPersonalProductDetails = () => {
    let navigate = useNavigate();
    const context = useContext(productContext);
    const { products, GetAllAdminPersonalProducts, UpdateProduct } = context
    const [productupdate, setProductUpdate] = useState({ id: "", epprice: "", epoffer: "" })
    useEffect(() => {
        if (localStorage.getItem('token')) {
            GetAllAdminPersonalProducts()
        } else {
            navigate('/')
        }

    }, [GetAllAdminPersonalProducts,navigate])
    const ref = useRef(null)
    const refclose = useRef(null)
    const updateProduct = (previousproduct) => {
        ref.current.click();
        setProductUpdate({ id: previousproduct._id, epprice: previousproduct.Product_Price, epoffer: previousproduct.Product_Offer });
    }

    const onchangevalue = (e) => {
        setProductUpdate({ ...productupdate, [e.target.name]: e.target.value })
    }

    const handleclick = (e) => {
        refclose.current.click();
        UpdateProduct(productupdate.id, productupdate.epprice, productupdate.epoffer);
    }
    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Product Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='mt-4 w-75 m-auto'>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" placeholder='2000' id="eproductprice" value={productupdate.epprice} name='epprice' onChange={onchangevalue} aria-describedby="emailHelp" />
                                    <label htmlFor="eproductprice" className="form-label">Product Price</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" placeholder='20' id="eproductoffer" value={productupdate.epoffer} name='epoffer' onChange={onchangevalue} aria-describedby="emailHelp" />
                                    <label htmlFor="eproductoffer" className="form-label">Product Offer</label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleclick} className="btn btn-primary">Update Product Details</button>
                        </div>
                    </div>
                </div>
            </div>

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
                                <th scope='col' colSpan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            <div className="container mt-2 fs-2">
                                {products.length === 0 && " No Products Available"}
                            </div>
                            {products.map((product) => {
                                return (<>
                                    <PersonalproductItem key={product._id} updateProduct={updateProduct} product={product} />
                                </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminPersonalProductDetails
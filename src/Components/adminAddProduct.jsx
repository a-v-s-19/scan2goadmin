import React, { useContext, useState } from 'react'
import { useBarcode } from 'next-barcode'
import productContext from '../context/Products/ProductContext'



const AdminAddProduct = () => {
    const context = useContext(productContext);

    const { Addproduct, getbarcode } = context;

    const { inputRef } = useBarcode({
        value: getbarcode[0],
        options: {
            background: '#ccffff',
            fontSize: 20,
            margin: 30,
            fontOptions: "bold",
            width: 2,
            height: 80
        }
    });
    let inputnode=null;
    let barcodeDataURL=null;

    const [product, setProduct] = useState({ pid: "", ptype: "", pname: "", pprice: "", poffer: "" })

    const onchangevalue = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const createProduct = async (e) => {
        e.preventDefault();
        await Addproduct(product.pid, product.ptype, product.pname, product.pprice, product.poffer);
        inputnode = inputRef.current;
        barcodeDataURL = inputnode.src
    }
    return (
        <>
            <div className='container my-5'>
                <div className='row'>
                    <div className='col-md-5'>
                        <h4 className='text-center mt-2 text-white'>Enter Product Details</h4>
                        <form className='mt-4 w-75 m-auto text-white'>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control bg-dark text-white" placeholder='AXIN435687' id="productid" name='pid' onChange={onchangevalue} aria-describedby="productidHelp" />
                                <label htmlFor="productid" className="form-label">Enter Product Id</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control bg-dark text-white" placeholder='Gorceries' id="producttype" name='ptype' onChange={onchangevalue} aria-describedby="emailHelp" />
                                <label htmlFor="producttype" className="form-label">Enter Product Type</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control bg-dark text-white" placeholder='Flour' id="productname" name='pname' onChange={onchangevalue} aria-describedby="emailHelp" />
                                <label htmlFor="productname" className="form-label">Enter Product Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control bg-dark text-white" placeholder='2000' id="productprice" name='pprice' onChange={onchangevalue} aria-describedby="emailHelp" />
                                <label htmlFor="productprice" className="form-label">Enter Product Price</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control bg-dark text-white" placeholder='20' id="productoffer" name='poffer' onChange={onchangevalue} aria-describedby="emailHelp" />
                                <label htmlFor="productoffer" className="form-label">Enter Product Offer</label>
                            </div>
                            <div className='text-center'><button type="submit" className="btn btn-primary btn-lg" onClick={createProduct}>Add Product</button></div>
                        </form>
                    </div>
                    <div className='col-md-7 bg-dark text-white rounded-3'>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="mt-3">Product Id</div>
                                <div className="mt-3">Product Type</div>
                                <div className="mt-3">Product Name</div>
                                <div className="mt-3">Product Price</div>
                                <div className="mt-3">Product Offer</div>
                                <div className="mt-3">Upload Date</div>
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="mt-3">  {getbarcode[0]}</div>
                                    <div className="mt-3">  {getbarcode[1]}</div>
                                    <div className="mt-3">  {getbarcode[2]}</div>
                                    <div className="mt-3">  {getbarcode[3]}</div>
                                    <div className="mt-3">  {getbarcode[4]}</div>
                                    <div className="mt-3">  {getbarcode[5]}</div>
                                </div>
                            </div>
                        </div>
                        <div className='border border-2 border-light my-2 py-3'>
                            <div>
                                <h5 className='mt-1 text-center'>Barcode</h5>
                                <div className='mt-2 text-center'>
                                    <div><img ref={inputRef} src={barcodeDataURL} alt='' /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAddProduct
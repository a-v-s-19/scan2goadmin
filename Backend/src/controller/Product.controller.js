const ProductModel = require('../model/Product.model');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = 'An@nd290!';

// Creating A product

exports.CreateProduct = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return await res.status(400).json({ Message: "Error", Error: error.array() });
        } else {
            const product = new ProductModel({
                admin_id: req.admin_data.id,
                Product_Barcode_ID: req.body.pid,
                Product_Type: req.body.ptype,
                Product_Name: req.body.pname,
                Product_Price: req.body.pprice,
                Product_Offer: req.body.poffer
            })
            const saveProduct = await product.save();
            const data = {
                product_data: {
                    id: saveProduct.id
                }
            }
            const product_authentication = jwt.sign(data, JWT_TOKEN);
            return await res.status(200).json({ Message: "Product Created Successfully", Response: saveProduct, Product_Authentication_id: product_authentication })
        }
    } catch (error) {
        return await res.status(500).json({ Message: "Internal Server Error", error });
    }
}

//Getting Data of All Products

exports.getAllProducts = async (req, res) => {
    try {
        const data = await ProductModel.find().select('-admin_id');
        if (!data) {
            return await res.status(404).json({ Message: "Data Not Found" });
        } else {
            return await res.status(200).json({ Message: "All Products Details", data });
        }
    } catch (error) {
        return await res.status(500).json({ Message: "Internal Server Error", Error: error.message });
    }
}

//Getting Product Details of A admin

exports.getIndividualAdminProducts = async (req, res) => {
    try {
        const id = req.admin_data.id
        const data = await ProductModel.find({ admin_id: id })
        if (!data) {
            return await res.status(404).json({ Message: "Data Not Found" });
        } else {
            return await res.status(200).json({ Message: `Product Details of Admin Id :${data.admin_id}`, data });
        }
    } catch (error) {
        return await res.status(500).json({ Message: "Internal Server Error", Error: error.message });
    }
}

//Updating the product details of a admin by passing product id 

exports.updateIndividualAdminProductDetailsByProductId = async (req, res) => {
    const data = {
        pprice: req.body.pprice,
        poffer: req.body.poffer
    };
    //updating a product and inserting a new product with updated details
    const newProduct = {};
    if (data.pprice) {
        newProduct.Product_Price = data.pprice
    }
    if (data.poffer) {
        newProduct.Product_Offer = data.poffer
    }
    //finding a product with productid
    const product = await ProductModel.findById(req.params.pid);
    if (!product) {
        return await res.status(404).json({ Message: "Product Not Found" });
    } else {
        if (product.admin_id.toString() != req.admin_data.id) {
            return await res.status(401).send("Access Denied ( Not Allowed )");
        }
        const newproduct = await ProductModel.findByIdAndUpdate(req.params.pid, { $set: newProduct }, { new: true });
        return await res.status(200).json({ Id: req.params.pid, Message: "Product Details Updated", newproduct });
    }
}

//Deleting a admin product by passing product id
exports.deleteIndividualAdminProductDetailsByProductId = async (req, res) => {

    //finding a product with productid
    const product = await ProductModel.findById(req.params.pid);
    if (!product) {
        return await res.status(404).json({ Message: "Product Not Found" });
    } else {
        if (product.admin_id.toString() != req.admin_data.id) {
            return await res.status(401).send("Access Denied ( Not Allowed )");
        }
        const newproduct = await ProductModel.findByIdAndDelete(req.params.pid);
        return await res.status(200).json({ Id: req.params.pid, Message: "Product Deleted Successfully", newproduct });
    }
}


exports.getProductByBarcodeID = async (req, res) => {
    try {
        const data = await ProductModel.findOne({ Product_Barcode_ID: req.params.barcodeid });
        if (!data) {
            return await res.status(401).json({ Message: "NotFound" });
        }
        return await res.status(200).json({ Message: "Success", data });
    } catch (error) {
        return await res.status(500).json({ Message: "Internal Server Error", error })
    }
}
//Fetching products details by product id
exports.GetProductDetailsByProductId=async(req,res)=>{
    try {
        const data=await ProductModel.find({_id:req.params.pid});
        if(!data){
            return await res.status(404).json({Mesaage:"NotFound"});
        }else{
            return await res.status(200).json({Message:"Success",Response:data});
        }
    } catch (error) {
        return await res.status(500).json({Message:"Internal Server Error",Error:error.message});
    }
}

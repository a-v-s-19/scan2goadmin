const express = require('express');
const router = express.Router();
const ProductController = require('../controller/Product.controller');
const { ProductValidation } = require('../../validation/Validation');
const { AdminLoginAuthentication } = require('../../middleware/adminathentication');
router.post('/createproduct', AdminLoginAuthentication, ProductValidation, ProductController.CreateProduct);
router.get('/fetchallproducts',ProductController.getAllProducts);
router.get('/fetchadminproducts',AdminLoginAuthentication,ProductController.getIndividualAdminProducts);
router.patch('/updateproduct/:pid',AdminLoginAuthentication,ProductController.updateIndividualAdminProductDetailsByProductId);
router.delete('/deleteproduct/:pid',AdminLoginAuthentication,ProductController.deleteIndividualAdminProductDetailsByProductId);
router.get('/getproductbybarcode/:barcodeid',ProductController.getProductByBarcodeID);
router.get('/getproductsbypid/:pid',ProductController.GetProductDetailsByProductId)
module.exports = router
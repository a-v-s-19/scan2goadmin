const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin_Registraion_Detail'
    },
    Product_Barcode_ID: {
        type: String,
        required: true,
        unique:true
    },
    Product_Type: {
        type: String,
        required: true
    },
    Product_Name: {
        type: String,
        required: true
    },
    Product_Price: {
        type: Number,
        required: true
    },
    Product_Offer: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
const ProductModel = new mongoose.model("Product_Details", ProductSchema);
ProductModel.createIndexes();
module.exports = ProductModel
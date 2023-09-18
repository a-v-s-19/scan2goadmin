const mongoose = require('mongoose');
const AdminRegistrationSchema = new mongoose.Schema({
    adminemail: {
        type: String,
        required: true,
        unique: true
    },
    adminname: {
        type: String,
        required: true
    },
    adminmobile: {
        type: Number,
        required: true,
    },
    adminpassword: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const AdminModel = new mongoose.model("Admin_Registraion_Detail", AdminRegistrationSchema);
AdminModel.createIndexes();
module.exports = AdminModel
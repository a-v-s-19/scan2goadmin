const AdminModel = require('../model/Admin.model');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = 'An@nd290!';


const passwordSecurity = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const passhash = await bcrypt.hash(password, salt);
        return passhash;
    } catch (error) {
        return await console.log({ Error: error.message });
    }

}
exports.registerAdmin = async (req, res) => {
    try {
        const error = await validationResult(req);
        if (!error.isEmpty()) {
            return await res.status(400).json({ Message: "ErrorEncountered", error})
        } else {
            let success=false;
            if (req.body.c_password !== req.body.password) {
                success=false;
                return await res.status(400).json({success, Message: "PasswordMisMatch" });
            } else {
                const password = await passwordSecurity(req.body.password);
                const admin = new AdminModel({
                    adminemail: req.body.email,
                    adminname: req.body.name,
                    adminmobile: req.body.mobile,
                    adminpassword: password
                });
                const saveadmin = await admin.save();
                const data = {
                    admin_data: {
                        id: saveadmin.id
                    }
                }
                const admin_registration_athentication = jwt.sign(data, JWT_TOKEN);
                success=true
                return await res.status(200).json({success, Message: "Admin Registered Successfully", Response: saveadmin, Admin_Registration_Authentication_id: admin_registration_athentication });
            }
        }
    } catch (error) {
        return await res.status(500).json({ Message:"Internal Server Error",error});
    }
}

exports.loginadmin = async (req, res) => {
    const { email, password } = req.body
    try {
        const error=await validationResult(req);
        if(!error.isEmpty()){
           return await res.status(400).json({Message:"Invalid Field type Entry",Error:error.array()});
        }else{
        let success=false;
        const admin = await AdminModel.findOne({ adminemail: email });
        if (!admin) {
            success=false;
            return await res.status(400).json({success, Message: "You are Not Registered yet !" });
        } else {
            const passcompare = await bcrypt.compare(password, admin.adminpassword);
            if (!passcompare) {
                success=false
                return await res.status(400).json({success, Message: "Incorrect Password" });
            } else {
                const data = {
                    admin_data: {
                        id: admin.id
                    }
                }
                const admin_login_athentication = jwt.sign(data, JWT_TOKEN);
                success=true
                return await res.status(200).json({success, Message: "Admin Login Successfull", Admin_Login_Authentication_id: admin_login_athentication });
            }
        }
    }
    } catch (error) {
        return await res.status(500).json({ Message: 'Internal Server Error', Error: error.message });
    }
}
exports.getAdminDetails=async(req,res)=>{
    try {
        const id=req.admin_data.id;
        const result=await AdminModel.findById(id).select('-adminpassword');
        return await res.status(200).json({Message:"Logged In Admin Details",Response:result});
    } catch (error) {
        return await res.status(500).json({Message:"Internal Server Error",Error:error.message});
    }
}
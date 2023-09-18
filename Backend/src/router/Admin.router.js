const express = require('express');
const router = express.Router();
const AdminController = require('../controller/Admin.controller');
const { AdminRegistrationValidation, AdminLoginValidation } = require('../../validation/Validation');
const {AdminLoginAuthentication}=require('../../middleware/adminathentication');
router.post('/registeradmin', AdminRegistrationValidation, AdminController.registerAdmin);
router.post('/loginadmin', AdminLoginValidation, AdminController.loginadmin);
router.get('/getadminusingauthtoken',AdminLoginAuthentication,AdminController.getAdminDetails)
module.exports = router
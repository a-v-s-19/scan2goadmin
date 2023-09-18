const jwt =require('jsonwebtoken');
const JWT_TOKEN = 'An@nd290!';

exports.AdminLoginAuthentication=async(req,res,next)=>{
    try {
        const verifyloginToken=req.header('auth-admin-token');
        if(!verifyloginToken){
            return await res.status(401).json({Error:"Access Denied",Message:"Please enter a valid authentication token"})
        }else{
            try {
                const data=jwt.verify(verifyloginToken,JWT_TOKEN);
                req.admin_data=data.admin_data
                next();
            } catch (error) {
                return await res.status(401).json({Error:"Access Denied",Message:"Please enter a valid authentication token"});
            }
        }
    } catch (error) {
        return await res.status(500).json({Message:"Internal Server Error",Error:error.message});
    }
}
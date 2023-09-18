import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminRegister = () => {
    const [credentitals, setCredentitals] = useState({ email: "", name: "", mobile: "", password: "", c_password: "" })
    let navigate = useNavigate()
    const registeradmin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/api/admin/registeradmin', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentitals.email, name: credentitals.name, mobile: credentitals.mobile, password: credentitals.password, c_password: credentitals.c_password })
        });
        const json = await response.json();
        if (json.success) {
            //save the token and redirect
            localStorage.setItem('token', json.Admin_Registration_Authentication_id);
            navigate("/navbar");
            alert(json.Message);
        } else {
            if (json.Message === "ErrorEncountered") {
                alert("Invalid Feild Type Entry");
            }
            else if (json.Message === "PasswordMisMatch") {
                alert("Password Doesn't Match");
            }
            else if (json.Message === "Internal Server Error") {
                if (json.error.keyPattern.adminemail) {
                    alert("Email Id already Registered");
                }
                if (json.error.keyPattern.adminmobile) {
                    alert("Mobile No. already registered");
                }
            }
        }
    }
    const onchangeadmin = (e) => {
        setCredentitals({ ...credentitals, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='container ms-auto my-5 bg-dark py-4 text-white rounded-3' style={{ width: "40%" }}>
                <form onSubmit={registeradmin}>
                    <div className="form-floating mt-3">
                        <input type="email" placeholder='Enter Email' className="form-control bg-dark text-white" value={credentitals.email} name="email" id="adminemail" aria-describedby="emailHelp" onChange={onchangeadmin} required/>
                        <label htmlFor="adminemail" className="form-label">Enter Email</label>
                    </div>
                    <div className="form-floating mt-3">
                        <input type="text" placeholder='Enter Name' className="form-control bg-dark text-white" value={credentitals.name} name="name" id="adminname" aria-describedby="nameHelp" onChange={onchangeadmin} minLength={3} required/>
                        <label htmlFor="adminname" className="form-label">Enter Name</label>
                    </div>
                    <div className="form-floating mt-3">
                        <input type="text" placeholder='Enter Mobile' className="form-control bg-dark text-white" value={credentitals.mobile} name="mobile" id="adminmobile" aria-describedby="mobileHelp" onChange={onchangeadmin} minLength={10} required/>
                        <label htmlFor="adminmobile" className="form-label">Enter Mobile Number</label>
                    </div>
                    <div className="form-floating mt-3">
                        <input type="password" placeholder='Enter Password' className="form-control bg-dark text-white" value={credentitals.password} name="password" id="adminpassword" aria-describedby="passwordHelp" onChange={onchangeadmin} minLength={6} required/>
                        <label htmlFor="adminpassword" className="form-label">Enter Password</label>
                    </div>
                    <div className="form-floating mt-3">
                        <input type="password" placeholder='Confirm Password' className="form-control bg-dark text-white" id="adminc_password" value={credentitals.c_password} name='c_password' onChange={onchangeadmin} required/>
                        <label htmlFor="adminc_password" className="form-label">Confirm Password</label>
                    </div>
                    <div className='text-center mt-3'><button type="submit" className="btn btn-primary">Register</button></div>
                </form>
                <div className='text-center mt-3'><Link to="/">Back To Login</Link></div>
            </div>
        </>
    )
}

export default AdminRegister
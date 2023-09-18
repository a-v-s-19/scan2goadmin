import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const AdminLogin = () => {
    const [credentitals, setCredentitals] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    const loginadmin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/api/admin/loginadmin', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentitals.email, password: credentitals.password })
        });
        const json = await response.json();
        if (json.success) {
            //save the token and redirect
            localStorage.setItem('token', json.Admin_Login_Authentication_id);
            navigate("/navbar");
            alert(json.Message);
        } else {
            alert(json.Message);
        }
    }
    const onchangeadmin = (e) => {
        setCredentitals({ ...credentitals, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container ms-auto my-5 bg-dark py-4 text-white rounded-3' style={{ width: "40%" }}>
                <form onSubmit={loginadmin}>
                    <div className="form-floating mt-3">
                        <input type="email" placeholder='Enter Email' className="form-control bg-dark text-white" value={credentitals.email} name="email" id="adminemail" aria-describedby="emailHelp" onChange={onchangeadmin} />
                        <label htmlFor="adminemail" className="form-label">Enter Email</label>
                    </div>
                    <div className="form-floating mt-3">
                        <input type="password" placeholder='Enter Password' className="form-control bg-dark text-white" id="adminpassword" value={credentitals.password} name='password' onChange={onchangeadmin} />
                        <label htmlFor="adminpassword" className="form-label">Enter Password</label>
                    </div>
                    <div className='text-center mt-3'><button type="submit" className="btn btn-primary">Login</button></div>
                </form>
                <div className='text-center mt-3'><Link>Forget Password</Link><br /><span className='mt-2'>Or</span><br /><Link className="btn btn-primary mt-3" to="/register">Register</Link></div>
            </div>
        </>
    )
}

export default AdminLogin
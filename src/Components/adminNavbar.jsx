import React,{useContext, useEffect} from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import imgage2 from '../../src/Components/imgage2.png'
import productContext from '../context/Products/ProductContext';
const AdminNavbar = () => {
    let navigate=useNavigate();
    const logoutadmin=()=>{
        localStorage.removeItem('token');
        navigate('/')
    }
  const context=useContext(productContext);
  const {adminname,GetAdminLoggedInDetails}=context;
  useEffect(() => { 
        GetAdminLoggedInDetails()
}, [])
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <img className="navbar-brand rounded-circle" height={60} width={80} src={imgage2}/>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item px-2">
                                <Link className="nav-link active rounded-3" style={{backgroundColor:"rgb(84, 84, 84)"}} aria-current="page" to='/navbar/addproduct'>Add Product</Link>
                            </li>
                            <li className="nav-item px-2">
                                <Link className="nav-link active rounded-3" style={{backgroundColor:"rgb(84, 84, 84)"}} aria-current="page" to='/navbar/adminproductdetails'>My Products Detail</Link>
                            </li>
                            <li className="nav-item px-2">
                                <Link className="nav-link active rounded-3" style={{backgroundColor:"rgb(84, 84, 84)"}} to="/navbar/productdetails">Products Detail</Link>
                            </li>
                            <li className="nav-item dropdown px-2">
                                <Link className="nav-link dropdown-toggle active rounded-3"  style={{backgroundColor:"rgb(84, 84, 84)"}} to="/navbar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {adminname.name}
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/navbar">Edit Profile</Link></li>
                                    <li><button className="dropdown-item btn" onClick={logoutadmin}>Logout</button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </>
    )
}

export default AdminNavbar
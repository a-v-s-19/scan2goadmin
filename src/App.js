import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminNavbar from './Components/adminNavbar';
import AdminAddProduct from './Components/adminAddProduct';
import AdminProductDetails from './Components/adminProductDetails';
import ProductState from './context/Products/PorductState';
import AdminPersonalProductDetails from './Components/adminPersonalProductDetails';
import AdminLogin from './Components/adminLogin';
import AdminRegister from './Components/adminRegister';

function App() {
  return (
    <>
      <ProductState>
        <Router>
          <Routes>
            <Route exact path='/' element={<AdminLogin />}></Route>
            <Route exact path='/register' element={<AdminRegister/>}></Route>
            <Route exact path='/navbar' element={<AdminNavbar />}>
                <Route exact path='/navbar/addproduct' element={<AdminAddProduct />}></Route>
                <Route exact path='/navbar/productdetails' element={<AdminProductDetails />}></Route>
                <Route exact path='/navbar/adminproductdetails' element={<AdminPersonalProductDetails />}></Route>
            </Route>
          </Routes>

        </Router>
      </ProductState>
    </>
  );
}

export default App;

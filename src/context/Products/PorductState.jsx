import React, { useState } from "react";
import ProductContext from "./ProductContext";
const localhost = 'http://localhost:4000'
const ProductState = (props) => {
    const productitem = []
    const [products, setProducts] = useState(productitem)
    const [adminname, setAdminName] = useState({ name: "" })
    const detail = []
    const [getbarcode, setGetbarcode] = useState(detail)
    //Fetch All Products 

    const GetAllProducts = async () => {
        const response = await fetch(`${localhost}/api/product/fetchallproducts`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        const data = json.data;
        setProducts(data);
    }

    //Fetch All Admin Personal Product

    const GetAllAdminPersonalProducts = async () => {
        const response = await fetch(`${localhost}/api/product/fetchadminproducts`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-admin-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        const data = json.data;
        setProducts(data);
    }


    //Adding a Product

    const Addproduct = async (pid, ptype, pname, pprice, poffer) => {
        const response = await fetch(`${localhost}/api/product/createproduct`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-admin-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ pid, ptype, pname, pprice, poffer }),
        });
        const data = await response.json()
        if (data.Message === "Error") {
            const err = data.Error.map((e) => { return e.msg });
            console.log(err);
            alert("Product Insertion Unsuccessfull , Check the errors in Console");
        }
        else if (data.Message === "Internal Server Error") {
            alert("Barcode ID Already Registered");
        } else {
            alert(data.Message);
            setGetbarcode([data.Response.Product_Barcode_ID, data.Response.Product_Type, data.Response.Product_Name, data.Response.Product_Price, data.Response.Product_Offer, data.Response.createdAt]);
        }
    }

    //Deleting a Product

    const DeleteProduct = async (id) => {
        const response = await fetch(`${localhost}/api/product/deleteproduct/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-admin-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        alert(json.Message);
    }

    //Updating a Product details

    const UpdateProduct = async (id, pprice, poffer) => {
        const response = await fetch(`${localhost}/api/product/updateproduct/${id}`, {
            method: "PATCH", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-admin-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ pprice, poffer })
        });
        const json = await response.json();
        alert(json.Message);
        let newproduct = JSON.parse(JSON.stringify(products))
        for (let index = 0; index < newproduct.length; index++) {
            const element = newproduct[index];
            if (element._id === id) {
                element.pprice = pprice;
                element.poffer = poffer;
                break;
            }
        }
        console.log(newproduct)
        setProducts(newproduct);
    }
    //getting Admin Login Details
    const GetAdminLoggedInDetails = async () => {
        const response = await fetch(`${localhost}/api/admin/getadminusingauthtoken`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-admin-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setAdminName({ name: json.Response.adminname });

    }
    return (
        <ProductContext.Provider value={{ getbarcode, adminname, products, GetAdminLoggedInDetails, UpdateProduct, Addproduct, DeleteProduct, GetAllProducts, GetAllAdminPersonalProducts }}>
            {props.children}
        </ProductContext.Provider>
    )
}
export default ProductState;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Dashboard from "./Dashboard/Dashboard";
import Order from "./Orders/Order";
import Login from "./PageLogin/Login";
import Products from "./Producs/Products";
import AddProducts from "./Producs/AddProducts";
import EditProducts from "./Producs/EditProducts";
import Other from "./Other/Other";
import Categories from "./Other/Categories";
import Brands from "./Other/Brands";
import Subcategory from "./Other/Subcategory";
import NotFoundPage from "./Layout/Page404";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="order" element={<Order />} />
          <Route path="products" element={<Products/>}  />
          <Route path="addproducts" element={<AddProducts/>}  />
          <Route path="editproducts/:id" element={<EditProducts />} />
          <Route path="categories" element={<Other />} />
          <Route path="categories/" element={<Categories />} />
          <Route path="brands/" element={<Brands />} />
          <Route path="subcategory/" element={<Subcategory />} />
          <Route path="*" element={<NotFoundPage/> } />
        </Route>
          <Route path="login" element={<Login/>} />
      </Routes>
    </>
  );
};

export default App;

import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingLazy from "./LoadingLazy";

// Lazy import барои ҳамаи компонентҳо
const Layout = lazy(() => import("./Layout/Layout"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const Order = lazy(() => import("./Orders/Order"));
const Login = lazy(() => import("./PageLogin/Login"));
const Products = lazy(() => import("./Producs/Products"));
const AddProducts = lazy(() => import("./Producs/AddProducts"));
const EditProducts = lazy(() => import("./Producs/EditProducts"));
const Other = lazy(() => import("./Other/Other"));
const Categories = lazy(() => import("./Other/Categories"));
const Brands = lazy(() => import("./Other/Brands"));
const Subcategory = lazy(() => import("./Other/Subcategory"));
const NotFoundPage = lazy(() => import("./Layout/Page404"));

const App = () => {
  return (
    <Suspense fallback={<LoadingLazy/>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="order" element={<Order />} />
          <Route path="products" element={<Products />} />
          <Route path="addproducts" element={<AddProducts />} />
          <Route path="editproducts/:id" element={<EditProducts />} />
          <Route path="categories" element={<Other />} />
          <Route path="categories/" element={<Categories />} />
          <Route path="brands/" element={<Brands />} />
          <Route path="subcategory/" element={<Subcategory />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProducts, GetProducts } from "../config/dataSlice";
import LoaderDash from "../config/Loader";
import { Button, Checkbox } from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { FiSearch } from "react-icons/fi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import EmptyProducts from "./Products404";

const Products = () => {
  const { data, loading } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const products = data?.products || [];
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(GetProducts());
  }, [dispatch]);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div className="pb-[50px]">
      <div className="flex justify-between border-none p-[0px_30px] items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => (window.location = "/addproducts")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add order
        </button>
      </div>

      <div className="flex items-center justify-between  rounded-lg p-3">
        <div className="flex items-center w-1/3 border rounded-lg px-3 py-2">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full outline-none"
          />
        </div>

        <select className="border transition-all duration-700 ease-in-out dark:bg-[#1C2536] bg-[white] dark:text-white text-black rounded-lg px-3 py-2 ml-4">
          <option>Newest</option>
          <option>Oldest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>

        <div className="flex items-center gap-2 ml-4">
          <button className="p-2 rounded-lg hover:bg-gray-200">
            <BorderColorOutlinedIcon className="text-blue-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-200">
            <DeleteOutlineOutlinedIcon className="text-red-600" />
          </button>
        </div>
      </div>

      <table className="w-[95%] m-auto">
        <thead className="!w-[100%]">
          <tr className="border-b text-center text-gray-600 pb-[20px] h-[36px] dark:text-white border-b-gray-500 rounded-2xl ">
            <th className="text-start ">
              {" "}
              <Checkbox {...label} defaultChecked /> Products Name
            </th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">
                <LoaderDash />
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan="5">
                <EmptyProducts />
              </td>
            </tr>
          ) : (
            products.map((el) => (
              <tr
                key={el.id}
                className="p-2 text-center h-[70px] rounded-[5px] w-[100%]"
              >
                <td className="flex gap-4 justify-start items-center">
                  <Checkbox {...label} checked={el.hasDiscount} />
                  <img
                    className="w-[52px] h-[54px] rounded-xl"
                    src={`http://37.27.29.18:8002/images/${el.image}`}
                    alt="not found"
                  />
                  <h2 className="dark:text-gray-300 font-semibold text-gray-800 truncate">
                    {el.productName}
                  </h2>
                </td>

                <td>
                  <h1>$ {el.price}</h1>
                </td>

                <td>{el.categoryName}</td>

                <td>
                  <h2>{el.quantity}</h2>
                </td>

                <td>
                  <NavLink to={`/editproducts/${el.id}`}>
                    <Button>
                      <BorderColorOutlinedIcon />
                    </Button>
                  </NavLink>
                  <Button
                    onClick={() => dispatch(DeleteProducts(el.id))}
                    sx={{ color: "red" }}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;

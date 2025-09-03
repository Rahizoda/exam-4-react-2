import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import img1 from '../assets/Group 1116606595 (1).png';
import { jwtDecode } from "jwt-decode";
import { HomeOutlined } from "@mui/icons-material";

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Switch from "../config/Swicher";
import ButtonLogout from "../config/Button";

const Layout = () => {
  const token = localStorage.getItem("accessToken");
  let decoded = null;

  const [open , setOpen] = useState(false)
  try {
    if (token) {
      decoded = jwtDecode(token);
    }
  } catch (error) {
    console.error("Invalid token:", error);
  } 


  return (
    <div className="flex">
      <div className="w-[250px] header bg-[linear-gradient(45deg,#000000_20%,#2563EB_100%)] bg-cover bg-no-repeat bg-fixed bg-[#1C2536] text-white border-r border-r-[#8d8d8d]  h-[100vh] fixed top-0 left-0 flex flex-col gap-4 p-5 pt-[70px]">
        <NavLink to="/" end className={({ isActive }) => isActive ? "bg-white text-black rounded-lg" : ""}>
          <Button fullWidth startIcon={<HomeOutlined />} className="!justify-start !text-inherit">
            Dashboard
          </Button>
        </NavLink>

        <NavLink to="/order" className={({ isActive }) => isActive ? "bg-white text-black rounded-lg" : ""}>
          <Button fullWidth startIcon={<ListIcon />} className="!justify-start !text-inherit">
            Users
          </Button>
        </NavLink>

        <NavLink to="/products" className={({ isActive }) => isActive ? "bg-white text-black rounded-lg" : ""}>
          <Button fullWidth startIcon={<SellOutlinedIcon />} className="!justify-start !text-inherit">
            Products
          </Button>
        </NavLink>

        <NavLink to="/categories" className={({ isActive }) => isActive ? "bg-white text-black rounded-lg" : ""}>
          <Button fullWidth startIcon={<NoteOutlinedIcon />} className="!justify-start !text-inherit">
            Other
          </Button>
        </NavLink>
      </div>

      <div className="flex-1  ">
        <nav className="h-[50px] aside bg-[linear-gradient(45deg,#000000_20%,#2563EB_100%)] bg-cover bg-no-repeat bg-fixed flex justify-between p-[0px_20px] items-center   bg-[#1C2536] text-white   fixed w-[100%] z-30">
          <img src={img1} alt="Logo" className="h-[50px] " />
          <div className="flex items-center gap-2 border-b border-gray-600 p-1 rounded w-[500px]">
            <SearchIcon sx={{ color: "white" }} />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none focus:outline-none text-white w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch/>
            <NotificationsOutlinedIcon sx={{ color: "white" }} />
            <h1 className="w-[40px] h-[40px] bg-[#1FD286] text-white flex justify-center items-center rounded-[55%]">{decoded.name.slice(0, 1).toUpperCase()}</h1>
            <h1>{decoded.name.slice(0,1).toUpperCase() + decoded.name.slice(1)}</h1>
            <Button onClick={()=>setOpen(!open)}><KeyboardArrowDownOutlinedIcon sx={{ color: "white" }} /></Button>
            {
              (open && <div className="bg-[#000000a4]
               duration-700 ease-in-out
                rounded-xl shadow-lg 
                transform scale-90 
                 transition-all  text-white absolute z-40 top-[70px] left-[1200px] p-[10px] w-[150px] ">
                <button onClick={() => {
                  localStorage.removeItem("accessToken")
                  setOpen(!open)
                  window.location = '/login'
                }}>
                  
                 <ButtonLogout  />
                 </button>
              </div>
)            }
          </div>
        </nav>

        <div className="pt-[70px] pl-[270px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

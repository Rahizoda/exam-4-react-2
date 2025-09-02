import React, { useState } from "react";
import img1 from "../assets/Group 1116606595 (1).png";
import { Button, TextField } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

import { API } from "../config/configAxios";
import Loader from "../config/Loading";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  
  async function loginFunc(userName, password) {
    setLoading(true);
    try {
      const res = await API.post("Account/login", { userName, password });
      if (res.data.data) {
        localStorage.setItem("accessToken", res.data.data);
        window.location = '/'
      }
      return res.data;
    } finally {
      setLoading(false);
    }
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    let userName = e.target["userName"].value;
    let password = e.target["password"].value;
    loginFunc(userName, password);
  };

  if (loading) {
    return <Loader />
}
   return (
    <>
      <div className="flex justify-around items-center w-[100%] h-[100vh]">
        <div className="w-[50%] h-[100%] bg-[#080831] text-white flex flex-col justify-center pl-[140px] items-start">
          <h2 className="text-[25px]">Welcome to admin panel</h2>
          <img className="w-[360px]" src={img1} alt="" />
        </div>

        <div className="w-[50%] h-[100%] flex flex-col justify-center items-start">
          <form onSubmit={handlesubmit} action="" className="w-[70%] m-auto">
            <h1 className="text-3xl font-bold">Log in</h1> <br />
            <TextField name="userName" label='Email' variant="outlined" fullWidth /> <br /><br />

            <TextField name="password" type={showPassword ? "text" : "password"} label='Password' variant="outlined" fullWidth /> <br /><br />
              <span
            className="absolute z-20 right-[120px] top-[290px] cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
           >
            <VisibilityIcon/>
           </span>
            <Button onClick={() => window.location = '#'} sx={{ width: "100%", height: "50px", border: "1px solid gray" }}>Fotgot Password</Button> <br /><br />
            <Button type="submit" sx={{width:"100%", bgcolor:"blue", color:"white", height:"50px"}}>Log in</Button> <br /><br />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

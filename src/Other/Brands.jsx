import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddBrands, DeleteBrands, EditBrands, GetBrands } from "../config/dataSlice";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LoaderDash from "../config/Loader";
import { Modal } from "antd";

const Brands = () => {
  const { brands, loading } = useSelector((state) => state.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetBrands());
  }, [dispatch]);

  function handleAddBrands(e) {
    e.preventDefault();
    dispatch(AddBrands(e.target["brand"].value));
    e.target.reset();
  }
  function handleEditBrands(e) {
    e.preventDefault();
    dispatch(EditBrands({'id':idx ,'BrandName':e.target["brand"].value }));
    e.target.reset();
    handleCancel()
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idx , setIdx ] = useState(null)
  const [brand , setBrand ] = useState('')

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between p-[10px_20px]">
        <div>
          <Button onClick={() => (window.location = "/categories")}>
            Categories
          </Button>
          <Button onClick={() => (window.location = "/brands")}>Brands</Button>
          <Button onClick={() => (window.location = "/subcategory")}>
            subcategory
          </Button>
        </div>
      </div>

      <div className="flex justify-between pr-[100px]  items-start ">
        <table className="w-[350px] text-start">
          <thead>
            <tr className="h-[50px] border-b text-[#5A607F] border-b-[#8a8ea1]">
              <th className="text-start">Brands</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center ">
            {brands?.map((el) => {
              if (loading) return <LoaderDash />;
              return (
                <tr className="border-b border-b-gray-400 h-[56px] p-[10px] rounded-2xl ">
                  <td>
                    <h1 className="text-start font-bold">{el.brandName}</h1>
                    
                  </td>
                  <td>
                    <Button onClick={()=>{
                        setIdx(el.id)
                        setBrand(el.brandName)
                        showModal()}}>
                      <BorderColorOutlinedIcon />
                    </Button>
                    <Modal
                      title=""
                      closable={{ "aria-label": "Custom Close Button" }}
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      footer=''
                    >
                      <div className="">
                        <h2 className="text-2xl">Add new brand</h2> <br />
                        <form action="" onSubmit={handleEditBrands}>
                          <TextField
                            
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Brand name"
                            name="brand"
                            defaultValue={brand}
                            id=""
                          />{" "}
                          <br />
                          <br />
                          <button
                            type="submit"
                            className="bg-blue-600 relative left-[365px] hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                          >
                            + Add order
                          </button>
                        </form>
                      </div>
                    </Modal>
                    <Button
                      onClick={() => dispatch(DeleteBrands(el.id))}
                      sx={{ color: "red" }}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="w-[350px]">
          <h2 className="text-2xl">Add new brand</h2> <br />
          <form action="" onSubmit={handleAddBrands}>
            <TextField
             
              fullWidth
              variant="outlined"
              type="text"
              label="Brand name"
              name="brand"
              id=""
            />{" "}
            <br />
            <br />
            <button
              type="submit"
              className="bg-blue-600 relative left-[240px] hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
            >
              + Add order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Brands;

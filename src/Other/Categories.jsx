import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCategory,
  DeleteCategory,
  EditCategory,
  GetCategory,
} from "../config/dataSlice";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Modal } from "antd";
import LoaderDash from "../config/Loader";

const Categories = () => {
  const { category, loading } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCategory());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  const showModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const handleOkEdit = () => {
    setIsModalOpenEdit(false);
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  function handleSubmitAddCategory(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("CategoryImage", e.target["img"].files[0]);
    formData.append("CategoryName", e.target["cate"].value);
    dispatch(AddCategory(formData));
    handleCancel();
    e.target.reset();
  }

  const [edit, setEdit] = useState({});
  function handleSubmitEditCategory(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("CategoryImage", e.target["img"].files[0]);
    formData.append("CategoryName", e.target["cate"].value);
    formData.append("Id", edit.id);
    dispatch(EditCategory(formData));
    handleCancelEdit();
  }

  return (
    <div>
      <div className="flex justify-between p-[10px_20px] pr-[55px]">
        <div>
          <Button onClick={() => (window.location = "/categories")}>
            Categories
          </Button>
          <Button onClick={() => (window.location = "/brands")}>Brands</Button>
          <Button onClick={() => (window.location = "/subcategory")}>
            Subcategory
          </Button>
        </div>
        <button
          onClick={showModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add order
        </button>
        <Modal
          title="Add Categories Modal"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer=""
        >
          <form onSubmit={handleSubmitAddCategory} action="" className="w-full">
            <TextField
              fullWidth
              variant="outlined"
              label="CategoryName"
              name="cate"
            />{" "}
            <br />
            <br />
            <TextField fullWidth type="file" name="img" /> <br />
            <br />
            <Button type="submit" variant="contained">
              submit
            </Button>
          </form>
        </Modal>
      </div>{" "}
      <br />
      <br />
      <div className="flex flex-wrap m-auto w-[95%] items-start gap-[20px] ">
        {category?.map((el) => {
          if (loading) {
            return <LoaderDash />;
          }
          return (
            <div
              className="w-[182px] h-[144px] border border-gray-400 rounded-[10px]  
  p-[20px] flex items-start justify-between
  transition-transform duration-500 hover:scale-105 hover:shadow-lg"
            >
              <div>
                <img
                  className="w-[56px] h-[56px] "
                  src={`http://37.27.29.18:8002/images/${el.categoryImage}`}
                  alt=""
                />
                <h2 className="text-[16px]">{el.categoryName}</h2>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setEdit(el);
                    showModalEdit();
                  }}
                >
                  <BorderColorOutlinedIcon />{" "}
                </Button>{" "}
                <br />
                <br />
                <Modal
                  title="Edit Categories Modal"
                  closable={{ "aria-label": "Custom Close Button" }}
                  open={isModalOpenEdit}
                  onOk={handleOkEdit}
                  onCancel={handleCancelEdit}
                  footer=""
                >
                  <form
                    onSubmit={handleSubmitEditCategory}
                    action=""
                    className="w-full"
                  >
                    <TextField
                      defaultValue={edit.categoryName}
                      fullWidth
                      variant="outlined"
                      label="CategoryName"
                      name="cate"
                    />{" "}
                    <br />
                    <br />
                    <TextField fullWidth type="file" name="img" /> <br />
                    <br />
                    <Button type="submit" variant="contained">
                      submit
                    </Button>
                  </form>
                </Modal>
                <Button
                  onClick={() => dispatch(DeleteCategory(el.id))}
                  sx={{ color: "red" }}
                >
                  <DeleteOutlineOutlinedIcon />{" "}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;

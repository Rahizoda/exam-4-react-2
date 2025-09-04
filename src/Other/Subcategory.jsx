import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddSub,
  DeleteSub,
  EditSub,
  GetCategory,
  GetSubCategory,
} from "../config/dataSlice";
import { Modal, Pagination } from "antd";
import LoaderDash from "../config/Loader";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Subcategory = () => {
  const { loading, category } = useSelector((state) => state.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idx, setIdx] = useState(null);
  const [idxx, setIdxx] = useState(null);
  const [brand, setBrand] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(GetSubCategory())
    dispatch(GetCategory());
  }, [dispatch]);

  function handleAddBrands(e) {
    e.preventDefault();
    dispatch(AddSub({ SubCategoryName: e.target["brands"].value , CategoryId:e.target['selId'].value}));
    e.target.reset();
  }
  function handleEditBrands(e) {
    e.preventDefault();
    dispatch(
      EditSub({
        id: idx,
        SubCategoryName: e.target["brands"].value,
        CategoryId: idxx,
      })
    );
    e.target.reset();
    handleCancel();
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // чандто item дар як саҳифа

  // Ҳамаи subCategories-ҳоро ба як массив ҷамъ мекунем
  const allSubCategories = category?.flatMap((e) =>
    e.subCategories?.map((el) => ({ ...el, parentId: e.id }))
  ) || [];

  // Slice барои pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = allSubCategories.slice(startIndex, endIndex);

  return (
    <div>
      <div className="flex justify-between p-[10px_20px]">
        <div>
          <Button onClick={() => (window.location = "/categories")}>
            Categories
          </Button>
          <Button onClick={() => (window.location = "/brands")}>Brands</Button>
          <Button onClick={() => (window.location = "/subcategory")}>
            Subcategory
          </Button>
        </div>
        
      </div>

      <div className="flex justify-between pr-[100px]  items-start ">
        <table className="w-[500px] table-fixed border-collapse text-start">
          <thead className="">
            <tr className="h-[50px] border-b w-full text-[#5A607F] border-b-[#8a8ea1]">
              <th className="text-start">SubCategories</th>
              <th className="text-center pl-[40px]">Actions</th>
            </tr>
          </thead>
             <tbody className="block overflow-y-auto h-[450px] w-[500px] p-[10px]">
        {loading ? (
          <LoaderDash />
        ) : (
          paginatedData.map((el) => (
            <tr
              key={el.id}
              className="border-b border-b-gray-400 flex justify-between items-center min-h-[56px] p-[10px]"
            >
              <td>
                <h1 className="text-start font-bold">{el.subCategoryName}</h1>
              </td>
              <td className="flex">
                <Button
                  onClick={() => {
                    setIdx(el.id);
                    setBrand(el.subCategoryName);
                    setIdxx(el.parentId);
                    showModal();
                  }}
                >
                  <BorderColorOutlinedIcon />
                </Button>

                <Modal
                  title=""
                  closable={{ "aria-label": "Custom Close Button" }}
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer=""
                >
                  <div>
                    <h2 className="text-2xl">Edit SubCategory</h2>
                    <br />
                    <form action="" onSubmit={handleEditBrands}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        label="SubCategory name"
                        name="brands"
                        defaultValue={brand}
                      />
                      <br />
                      <br />
                      <button
                        type="submit"
                        className="bg-blue-600 relative left-[365px] hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </Modal>

                <Button
                  onClick={() => dispatch(DeleteSub(el.id))}
                  sx={{ color: "red" }}
                >
                  <DeleteOutlineOutlinedIcon />
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>

      {/* Pagination */}
      <div className=" flex ml-[250px] justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={allSubCategories.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
        </table>

        <div className="w-[380px]">
          <h2 className="text-2xl">Add new Subcategories</h2> <br />
          <form action="" onSubmit={handleAddBrands}>
            <TextField
              sx={{
                input: { color: "black",  },
                label: { color: "black",  },
              }}
              className="!dark:text-white  !text-black"
              fullWidth
              variant="outlined"
              type="text"
              label="Subcategories name"
              name="brands"
              id=""
            />{" "}
            <br />
            <br />
            <div className="flex justify-between">

            <select  className="border rounded-xl transition-all duration-700 ease-in-out dark:bg-[#1C2536] bg-[white] dark:text-white text-black p-[10px]" name="selId" id="">
              {
                category?.map((el) => {
                  return (
                    <option value={el.id}>{ el.categoryName}</option>
                  )
                })
              }
            </select> 
            <button
              type="submit"
              className="bg-blue-600 relative left-[0px] hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
            >
              + Add order
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subcategory;

import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  AddColor,
  AddProductsFunc,
  GetBrands,
  GetCategory,
  GetColor,
  GetProducts,
  GetSubCategory,
} from "../config/dataSlice";
import { message, Modal } from "antd";
import { Button, TextField } from "@mui/material";

export default function AddProducts() {
  // const [options, setOptions] = useState([{ name: "", value: "" }]);
  const [brand, setBrands] = useState(null);

  const [idColor, setIdColor] = useState(null);
  const [stx, setStx] = useState("false");
  const [size, setSize] = useState("");
  const [width, setWidth] = useState("");
  const [sub, setSubId] = useState(null);

  const { category, brands, subcategory, colors } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const sizes = ["S", "M", "L", "XL"];
  const weights = ['10', '20', '30', '40']; 

  // messages
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const openMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Loaded!",
        duration: 2,
      });
    }, 1000);
  };

  // load data
  useEffect(() => {
    dispatch(GetCategory());
    dispatch(GetProducts());
    dispatch(GetColor());
    dispatch(GetSubCategory());
    dispatch(GetBrands())
  }, [dispatch]);

 async  function handleSubmitAddProducts(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("Images", e.target["img"].files[0]||new Blob());
    formData.append("ProductName", e.target["productsName"].value||'productEror');
    formData.append("BrandId", brand||401);
    formData.append("ColorId", idColor||132);
    formData.append("Description", e.target["desc"].value||"descerro");
    formData.append("Quantity", e.target["quantity"].value);
    formData.append("Code", e.target["code"].value+Date.now());
    formData.append("HasDiscount", stx||false);
    formData.append("Price", e.target["price"].value||1);
    formData.append("DiscountPrice", e.target["discountPrice"].value||2);
    formData.append("SubCategoryId", sub||893);
    formData.append("Width", width||'10');
    formData.append("Size", size||"xs");

    try {
    await dispatch(AddProductsFunc(formData))
    e.target.reset();
    openMessage();
    window.location = "/products";
  } catch (err) {
    console.error("Ошибка при добавлении продукта:", err);
  };
  }

 

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
  const [color, setColor] = useState()
  function handleSubmitColor() {
    // e.preventDefault()
    dispatch(AddColor(color))
    handleCancel()
  }

  

  return (
    <form
      onSubmit={handleSubmitAddProducts}
      className="p-6 w-full max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Products / Add new</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => (window.location = "/products")}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>
          {contextHolder}
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left side */}
        <div className="col-span-2 space-y-6">
          {/* Information */}
          <div className="border rounded-lg p-4 space-y-4">
            <h2 className="font-semibold">Information</h2>
            <div className="flex gap-4">
              <input
                name="productsName"
                placeholder="Product name"
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                name="code"
                placeholder="Code"
                className="w-1/3 border rounded-lg px-3 py-2"
              />
            </div>
            <textarea
              name="desc"
              placeholder="Description"
              className="w-full border rounded-lg px-3 py-2 h-24"
            ></textarea>
          </div>

          {/* Categories */}
          <div className="flex gap-4">
            <select className="w-1/2 transition-all duration-700 ease-in-out dark:bg-[#1C2536] bg-[white] dark:text-white text-black border rounded-lg px-3 py-2">
              {category?.slice(0, 5).map((el) => (
                <option key={el.id} value={el.categoryName}>
                  {el.categoryName}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => {
                console.log(e.id);
                setBrands(e.target.value);
              }}
              className="w-1/2 transition-all duration-700 ease-in-out dark:bg-[#1C2536] bg-[white] dark:text-white text-black border rounded-lg px-3 py-2"
            >
              {brands?.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.brandName}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => setStx(e.target.value)}
              className="w-1/2 transition-all duration-700 ease-in-out dark:bg-[#1C2536] bg-[white] dark:text-white text-black border rounded-lg px-3 py-2"
            >
              <option value="">HesDiscount</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>

          {/* Price */}
          <div className="border rounded-lg p-4 space-y-3">
            <h2 className="font-semibold">Price</h2>
            <div className="flex gap-4">
              <input
                name="price"
                placeholder="Product price"
                className="w-1/3 border rounded-lg px-3 py-2"
              />
              <input
                placeholder="DiscountPrice"
                name="discountPrice"
                className="w-1/3 border rounded-lg px-3 py-2"
              />
              <input
                name="quantity"
                placeholder="Quantity"
                className="w-1/3 border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Size & Weight */}
          <div className="flex gap-8 items-start">
            <div>
              <label className="font-semibold">Size</label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {sizes.map((s) => (
                  <span
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1 rounded cursor-pointer ${
                      size === s
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold">Weight</label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {weights.map((w) => (
                  <span
                    key={w}
                    onClick={() => setWidth(w)}
                    className={`px-3 py-1 rounded cursor-pointer ${
                      width === w
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SubCategory */}
          <div className="border rounded-lg p-4 space-y-4">
            <h2 className="font-semibold">SubCategory</h2>
            <select
              onChange={(e) => setSubId(e.target.value)}
              className="w-1/2 transition-all duration-700 ease-in-out dark:bg-[#1C2536] bg-[white] dark:text-white text-black border rounded-lg px-3 py-2"
            >
              {subcategory?.slice(0, 8).map((el) => (
                <option key={el.id} value={el.id}>
                  {el.subCategoryName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-6">
          {/* Colour */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between ">
              <h2 className="font-semibold mb-2">Colour</h2>
              <Button onClick={() => {
                showModal()
              }} variant="contained">add color</Button> 
              <Modal
                title="Add color Modal"
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer=''
              >
              <form  action="">

               <TextField value={color} onChange={(e)=>setColor(e.target.value)} name="color" fullWidth variant="outlined" label='Color name' type="text" /> <br /><br />
               <div className="flex items-center gap-3">
                    <TextField sx={{ width: "100px" }} onChange={(e) => {
                      
                      setColor(e.target.value)
                    }} type="color" /> 
               <Button onClick={handleSubmitColor} variant="contained" sx={{height:"50px"}}>submit</Button>
               </div>
                </form>
              </Modal>
            </div> <br />

            <div className="flex gap-2 flex-wrap">
              {colors?.slice(0 ).map((c) => (
                <div
                  key={c.id}
                  onClick={() => setIdColor(c.id)}
                  style={{ backgroundColor: c.colorName }}
                  className={`w-6 h-6 rounded-full cursor-pointer border ${
                    idColor === c.id ? "ring-2 ring-blue-600" : ""
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-2">Tags</h2>
            <input
              placeholder="Tags name"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Images */}
          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-2">Images</h2>
            <input
              name="img"
              type="file"
               multiple 
              className="border-2 w-[275px] rounded-lg p-4 text-center text-gray-500"
            />
            <div className="mt-4 space-y-2">
              {[1, 2, 3].map((img, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border rounded-lg px-3 py-2"
                >
                  <span>Healthcare_Enbiology.png</span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <FiTrash2 className="text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

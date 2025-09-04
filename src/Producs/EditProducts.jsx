import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  AddImgProductsFunc,
  DelImgProductsFunc,
  EditProductsFunc,
  GetBrands,
  GetByIdProducts,
  GetCategory,
  GetColor,
  GetProducts,
  GetSubCategory,
} from "../config/dataSlice";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { Button } from "@mui/material";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import "./syle.css";
import 'swiper/css';
import 'swiper/css/scrollbar';

// import required modules
import { Pagination , Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

export default function EditProducts() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const idOrig = localStorage.getItem('productId')

  const { category, brands, colors, subcategory, byidproducts } = useSelector(
    (state) => state.data
  );
  // local states
  const [brand, setBrands] = useState(null);

  const [idColor, setIdColor] = useState(null);
  const [stx, setStx] = useState(null);
  const [size, setSize] = useState("");
  const [width, setWidth] = useState("");
  const [sub, setSubId] = useState(null);

  const sizes = ["S", "M", "L", "XL"];
  const weights = ["10", "20", "30", "40"];

  // update states when byidproducts loaded
  useEffect(() => {
    if (byidproducts) {
      setStx(byidproducts.hasDiscount);
      setSize(byidproducts.size);
      setWidth(byidproducts.width);
      setBrands(byidproducts.brandId);
      setIdColor(byidproducts.colorId);
      setSubId(byidproducts.subCategoryId);
    }
  }, [byidproducts]);

  // load data
  useEffect(() => {
    dispatch(GetCategory());
    dispatch(GetProducts());
    dispatch(GetColor());
    dispatch(GetSubCategory());
    dispatch(GetByIdProducts(idOrig));
    dispatch(GetBrands());
  }, [dispatch, idOrig]);

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

async  function handleSubmitAddProducts(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("Id", idOrig);
    formData.append(
      "ProductName",
      e.target["productsName"].value || "productEror"
    );
    formData.append("BrandId", brand || 423);
    formData.append("ColorId", idColor || 132);
    formData.append("Description", e.target["desc"].value || "descerro");
    formData.append("Quantity", e.target["quantity"].value);
    formData.append("Code", e.target["code"].value + Date.now());
    formData.append("HasDiscount", stx || false);
    formData.append("Price", e.target["price"].value || 1);
    formData.append("DiscountPrice", e.target["discountPrice"].value || 2);
    formData.append("SubCategoryId", sub || 900);
    formData.append("Width", width || "10");
    formData.append("Size", size || "xs");
    try {
        await dispatch(EditProductsFunc(formData))
        e.target.reset();
        openMessage();
        window.location = "/products";
      } catch (err) {
        console.error("Ошибка при добавлении продукта:", err);
      };
  }

  const [images, setImages] = useState();
  function handleAddImg() {
    const formd = new FormData();
    formd.append("ProductId", id);
    formd.append("Files", images);
    dispatch(AddImgProductsFunc(formd));
    openMessage();
  }


  // const handleChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setImages(files);
  // };

 


  return (
    <form
      onSubmit={handleSubmitAddProducts}
      className="p-6 w-full max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Products / Edit</h1>
        <div className="flex gap-2">
          <button
            onClick={() => (window.location = "/products")}
            type="button"
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
                defaultValue={byidproducts?.productName}
                placeholder="Product name"
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                name="code"
                defaultValue={byidproducts?.code}
                placeholder="Code"
                className="w-1/3 border rounded-lg px-3 py-2"
              />
            </div>
            <textarea
              name="desc"
              defaultValue={byidproducts?.description}
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
              onChange={(e) => setBrands(e.target.value)}
              className="w-1/2 transition-all duration-700 ease-in-out dark:bg-[#1C2536] bg-[white] dark:text-white text-black border rounded-lg px-3 py-2"
            >
              {brands?.map((e) => (
                <option value={e.id}>{e.brandName}</option>
              ))}
            </select>

            <select
              value={stx}
              onChange={(e) => setStx(e.target.value === "true")}
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
                defaultValue={byidproducts?.price}
                placeholder="Product price"
                className="w-1/3 border rounded-lg px-3 py-2"
              />
              <input
                name="discountPrice"
                defaultValue={byidproducts?.discountPrice}
                placeholder="Discount Price"
                className="w-1/3 border rounded-lg px-3 py-2"
              />
              <input
                name="quantity"
                defaultValue={byidproducts?.quantity}
                placeholder="Quantity"
                className="w-1/3 border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Sizes & Weights */}
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div>
                <label className="font-semibold">Size</label>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {sizes.map((s) => (
                    <span
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-2 py-1 rounded cursor-pointer ${
                        size === s
                          ? "bg-blue-400 text-white"
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
                <div className="flex gap-2 mt-1 flex-wrap">
                  {weights.map((w) => (
                    <span
                      key={w}
                      onClick={() => setWidth(w)}
                      className={`px-2 py-1 rounded cursor-pointer ${
                        width === w
                          ? "bg-blue-400 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SubCategory */}
          <div className="border rounded-lg p-4 space-y-4">
            <h2 className="font-semibold">SubCategory</h2>
            <select
              value={sub}
              onChange={(e) => setSubId(e.target.value)}
              className="w-1/2 transition-all duration-700 ease-in-out dark:bg-[#1C2536] bg-[white] dark:text-white text-black  border rounded-lg px-3 py-2"
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
            <h2 className="font-semibold mb-2">Colour</h2>
            <div className="flex flex-wrap gap-2">
              {colors?.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setIdColor(c.id)}
                  style={{ backgroundColor: c.colorName }}
                  className={`w-6 h-6 rounded-full cursor-pointer border ${
                    idColor === c.id ? "ring-2 ring-blue-500" : ""
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
            <form action="">
              <div className="flex justify-between items-center p-[20px_0px]">
                <h2 className="font-semibold mb-2">Images</h2>
                <Button onClick={() => handleAddImg()} variant="contained">
                  add img
                </Button>
              </div>
              <input
                name="addimg"
                 multiple
                onChange={(e)=>setImages(e.target.files[0])}
                type="file"
                className="border-2 w-[275px] rounded-lg p-4 text-center text-gray-500"
              />
            </form>
            <div className="mt-4 w-full   space-y-2">
              <Swiper
                spaceBetween={30}
           centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
              >
                {byidproducts?.images?.map((img, idx) => {
                 return  <SwiperSlide>

                    <div
                      key={idx}
                      className="flex justify-between w-[300px] items-center border rounded-lg px-3 py-2"
                    >
                      <img src={`http://37.27.29.18:8002/images/${img.images}`} alt="" />
                     <button onClick={() => dispatch(DelImgProductsFunc(img.id))} className="p-2 hover:bg-gray-100 rounded-lg">
                        <FiTrash2 className="text-red-600" />
                      </button>
                    </div>
                  </SwiperSlide>  
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

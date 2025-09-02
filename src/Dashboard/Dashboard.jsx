import React, { useEffect  } from "react";
import DashboardChart from "../config/DashboardChart";
import { useDispatch, useSelector } from "react-redux";
import { GetProducts } from "../config/dataSlice";
import LoaderDash from "../config/Loader";
import { Button } from "@mui/material";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import img1 from '..//assets/div.MuiBox-root (2).png'


const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, } = useSelector((state) => state.data);
  const products = data?.products || [];

  useEffect(() => {
    dispatch(GetProducts());
  }, [dispatch]);

  

  const listUser = [
    {
      id: 1,
      name: "Jagarnath S.",
      date: "24.05.2023",
      amount: "$124.97",
      status: true,
    },
    {
      id: 2,
      name: "Anand G.",
      date: "23.05.2023",
      amount: "$55.42 ",
      status: false,
    },
    {
      id: 3,
      name: "Kartik S.",
      date: "23.05.2023",
      amount: "$89.90",
      status: true,
    },
    {
      id: 4,
      name: "Rakesh S.",
      date: "22.05.2023",
      amount: "$144.94",
      status: false,
    },
    {
      id: 5,
      name: "Anup S.",
      date: "22.05.2023",
      amount: "$70.52",
      status: true,
    },
    {
      id: 6,
      name: "Jimmy P.",
      date: "22.05.2023",
      amount: "$70.52",
      status: true,
    },
  ];

  const list = [
    {
      id: 1, 
      productName: 'Healthcare Erbology',
      categoryName: 'in Accessories',
      image:img1,
      price: '13 153', 
      quantity:'in sales'
    },
    {
      id: 2, 
      productName: 'Healthcare Erbology',
      categoryName: 'in Accessories',
      image:img1,
      price: '13 153', 
      quantity:'in sales'
    },
    {
      id: 3, 
      productName: 'Healthcare Erbology',
      categoryName: 'in Accessories',
      image:img1,
      price: '13 153', 
      quantity:'in sales'
    },
    { 
      id: 4, 
      productName: 'Healthcare Erbology',
      categoryName: 'in Accessories',
      image:img1,
      price: '13 153', 
      quantity:'in sales'
    },
  ]

  const handelEditStx = (id) => {
    console.log(id);
    
      listUser.map((el) => {
    if (el.id == id) {
      el.status = !el.status
    }
  
    return el
  })
    
  }

  
    


  return (
    <>
      <div className="flex justify-between h-[100vh] items-start">
        <DashboardChart />
        <div className="transition-all w-[30%] duration-1800 ease-in-out dark:bg-[linear-gradient(45deg,#000000_20%,#2563EB_100%)] dark:bg-cover dark:bg-no-repeat dark:bg-fixed bg-[white] dark:text-white text-black   h-[72vh] rounded-xl flex flex-col gap-5   ">
          <div className="flex items-center h-[50px] justify-between w-[95%] m-auto transition-all duration-1000 ease-in-out dark:bg-[linear-gradient(45deg,#000000_20%,#2563EB_100%)] dark:bg-cover dark:bg-no-repeat dark:bg-fixed bg-[white] dark:text-white text-black">
            <h2 className="text-[16px] font-bold justify-between">
              Top selling products
            </h2>
            <button onClick={()=>window.location = 'products'} className="cursor-pointer ">
              See All <EastOutlinedIcon />{" "}
            </button>
          </div>
          {list.map((el) => {
            if (loading) return <LoaderDash />;
            return (
              <div
                key={el.id}
                className="flex  border shadow-[2px_2px_2px_gray] border-gray-500 p-2 rounded-[5px]  w-[95%] m-auto  gap-3 "
              >
                <img
                  className="w-[52px] h-[54px] rounded-xl"
                  src={el.image}
                  alt="img"
                />
                <div>
                  <h2 className="text- dark:text-gray-300 font-semibold text-gray-800 truncate">
                    {el.productName}
                  </h2>
                  <h2 className="text-[13px]  dark:text-gray-300 font-semibold text-gray-600 truncate">
                    {el.categoryName}
                  </h2>
                </div>

                <div className="w-[100px]">
                  <p className="text-[13px] text-end dark:text-white text-green-600 font-bold  mt-2">
                     {el.price}
                  </p>
                  <p className="text-[13px] text-end dark:text-white font-bold text-gray-500 mt-2">
                     {el.quantity}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-[100%] flex items-start pb-[50px] justify-around">
        <table className="w-[440px]">
          <thead className="!w-[100%]" >
          <h1 className="font-bold text-xl pb-[30px]">Recent Transactions</h1>
            <tr className="border-b text-center text-gray-600 pb-[20px] h-[36px]  border-b-gray-500 rounded-2xl ">
              <th className="text-start pl-[30px]" >Name</th>
              <th >Date</th>
              <th >Amount</th>
              <th >Status</th> 
            </tr> 
          </thead> 
          <tbody className="w-[100%]">
            {listUser?.map((el) => {
              return (
                <>
                  <br />
                <tr
                  key={el.id}
                  className=" p-2 text-center rounded-[5px]  w-[100%] "
                >
                  <td className="flex gap-4 items-center">
                  <img
                    className="w-[52px] h-[54px] rounded-xl"
                    src={
                      el.image
                        ? `http://37.27.29.18:8002/images/${el.image}`
                        : "https://www.truckeradvisor.com/media/uploads/profilePics/notFound.jpg"
                    }
                    alt="https://www.truckeradvisor.com/media/uploads/profilePics/notFound.jpg"
                  />
                    <h2 className="text- dark:text-gray-300 font-semibold text-gray-800 truncate">
                      {el.name}
                    </h2>

                  </td>

                  <td>
                    <h1>{el.date }</h1>
                  </td>

                  <td>
                    <h1>{el.amount }</h1>
                  </td>

                  <td>
                      <Button onClick={() => {
                        handelEditStx(el.id)
                      }} sx={{ bgcolor: '#C4F8E2', width: "70px", height: "30px", color: el.status ? 'green' : 'red' }}>{el.status ? 'paid' : 'pending'}</Button>
                  </td>
                  
                </tr>
                </>
              );
            })}
          </tbody>
        </table>

        <table className="w-[440px]">
          <thead className="!w-[100%]" >
          <h1 className="font-bold text-xl pb-[30px]">Top Products by Units Sold</h1>
            <tr className="border-b text-center text-gray-600 pb-[20px] h-[36px]  border-b-gray-500 rounded-2xl ">
              <th className="text-start pl-[30px]" >Name</th>
              <th >Price</th>
              <th >Units</th> 
            </tr> 
          </thead> 
          <tbody className="w-[100%]">
            {products.slice(0, 6).map((el) => {
              if (loading) return <LoaderDash />;
              return (
                <>
                  <br />
                <tr
                  key={el.id}
                  className=" p-2 text-center rounded-[5px]  w-[100%] "
                >
                  <td className="flex gap-4 items-center">
                  <img
                    className="w-[52px] h-[54px] rounded-xl"
                    src={`http://37.27.29.18:8002/images/${el.image}`}
                    alt="not found"
                  />
                    <h2 className="text- dark:text-gray-300 font-semibold text-gray-800 truncate">
                      {el.productName}
                    </h2>

                  </td>

                  

                  <td>
                    <h1>{el.price }</h1>
                  </td>
                    <td>
                      <h2>{ el.quantity}</h2>
                    </td>
                </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;

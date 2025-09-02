import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddUserRole,
  DeleteUser,
  DeleteUserRole,
  GetProfileUser,
  GetRole,
} from "../config/dataSlice";
import { Button } from "@mui/material";
import LoaderDash from "../config/Loader";
import { message, Pagination } from "antd";

const Order = () => {
  const { user, loading, role } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProfileUser());
    dispatch(GetRole());
  }, [dispatch]);

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

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // чанд нафар user дар як саҳифа

  // Агар user?.data вуҷуд дошта бошад, мегирем
  const allUsers = user?.data || [];

  // slice барои pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedUsers = allUsers.slice(startIndex, endIndex);

  return (
    <div className="pb-[50px]">
      <table className="w-[90%] m-auto pb-[50px]">
        <thead className="!w-[100%]">
          <h1 className="font-bold text-xl pb-[30px]">Recent Users</h1>
          <tr className="border-b text-center text-gray-600 pb-[20px] h-[36px] dark:text-white transition-all decoration-sky-600 border-b-gray-500 rounded-2xl ">
            <th className="text-start pl-[30px]">Name</th>
            <th>Date</th>
            <th>DeleteRole</th>
            <th>User Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="w-full pb-12">
          { 
            
           (
              paginatedUsers.map((el) =>
               
              {
                if (loading) {
                  return <LoaderDash />
                }
                return (
                 <tr
                key={el.id}
                className="p-2 text-center h-[70px] rounded-lg w-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                <td className="flex gap-4 items-center px-4">
                  <img
                    className="w-14 h-14 rounded-xl object-cover"
                    src={
                      el.image
                        ? `http://37.27.29.18:8002/images/${el.image}`
                        : "https://www.truckeradvisor.com/media/uploads/profilePics/notFound.jpg"
                    }
                    alt="user"
                  />
                  <h2 className="dark:text-gray-300 font-semibold text-gray-800 truncate">
                    {el.userName}
                  </h2>
                </td>

                <td className="px-4">
                  <h1 className="text-gray-700  dark:text-gray-300">
                    {el.dob}
                  </h1>
                </td>
                <td className="flex justify-center mt-[-20px]  items-center ">
                  {el.userRoles.slice(0, 1).map((elem) => {
                    return (
                      <Button
                        onClick={() =>
                          dispatch(
                            DeleteUserRole({
                              UserId: el.userId,
                              RoleId: elem.id,
                            })
                          )
                        }
                        variant="outlined"
                        color={elem.name === "Admin" ? "error" : "primary"} // style вобаста ба role
                        sx={{
                          color:
                            elem.name === "Admin" ? "green" : "blue",
                          backgroundColor:"white",
                          
                        }}
                      >
                        delete role {elem.name}
                      </Button>
                    );
                  })}
                </td>
                <td className="px-4">
                  <select
                    onChange={(e) => {
                      const newRoleId = e.target.value;
                      const userId = el.userId;

                      // Агар user role дорад, delete мекунем
                      if (el.userRoles.length > 0) {
                        const oldRoleId = el.userRoles[0].id; // ё кадоме ки лозим
                        dispatch(
                          DeleteUserRole({
                            UserId: userId,
                            RoleId: oldRoleId,
                          })
                        ).then(() => {
                          // Пас аз delete → role-и навро add мекунем
                          dispatch(
                            AddUserRole({
                              UserId: userId,
                              RoleId: newRoleId,
                            })
                          );
                        });
                      } else {
                        // Агар role надорад → role-и навро мустақим add мекунем
                        dispatch(
                          AddUserRole({
                            UserId: userId,
                            RoleId: newRoleId,
                          })
                        );
                      }
                    }}
                    className="px-2 py-1 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200"
                  >
                    <option value="">Role</option>
                    {role?.map((ele) => (
                      <option key={ele.id} value={ele.id}>
                        {ele.name}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-4">
                  {contextHolder}
                  <Button
                    onClick={() => {
                      dispatch(DeleteUser(el.userId));
                      openMessage();
                    }}
                    sx={{
                      bgcolor: "#C4F8E2",
                      width: "80px",
                      height: "35px",
                      color: "red",
                      "&:hover": { bgcolor: "#A6F1D0" },
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
               )
              }
            )
          )}
        </tbody>

        {/* Pagination */}
        <div className="mt-[50px]  flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={allUsers.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </table>
    </div>
  );
};

export default Order;

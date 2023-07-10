import React, { useEffect } from "react";
import { getAllEmployees } from "../../Context/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const WorkersTab = () => {
  console.log("Workers Tab");
  const { isLoading, allUsers } = useSelector((state) => state.user);

  return isLoading ? (
    <h1>Loading Data...</h1>
  ) : (
    <div className="mx-auto flex flex-wrap w-[50%] justify-center py-20 sm: w-[75%] h-screen ">
      <h1 className="text-center p-5 text-[48px] sm: text-[24px] text-glow">
        All Workers List
      </h1>
      <table className="table-auto border-2 border-black w-full shadow-2xl ">
        <thead className="border-2 border-black w-full">
          <tr className="text-center w-full">
            <th className="border-2 border-black bg-gray-400 bg-opacity-30 text-white  sm: p-3">
              Employee Name
            </th>
            <th className="border-2 border-black bg-gray-400 bg-opacity-30 text-white sm: p-3">
              Department
            </th>
            <th className="border-2 border-black bg-gray-400 bg-opacity-30 text-white  sm: p-3">
              Manager
            </th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((employee, index) => {
            return (
              <tr key={index} className="border-2 border-black w-full">
                <td className="border-2 border-black text-center bg-gray-400 bg-opacity-30 text-white lg:w-fit sm:w-full sm: p-3">
                  <a
                    href={`/user/${employee._id}`}
                    className="hover:text-blue-300"
                  >
                    {employee.firstName + " " + employee.lastName}
                  </a>
                </td>
                <td className="border-2 border-black text-center bg-gray-400 bg-opacity-30 text-white lg:w-fit sm:w-full p-4">
                  {employee.department.name}
                </td>
                <td className="border-2 border-black text-center bg-gray-400 bg-opacity-30 text-white lg:w-fit sm:w-full p-4">
                  {employee.firstName !==
                    employee.department.manager.firstName &&
                  employee.lastName !== employee.department.manager.lastName ? (
                    <a
                      href={`/user/${employee.department.manager._id}`}
                      className="hover:text-blue-300"
                    >
                      {employee.department.manager.firstName +
                        " " +
                        employee.department.manager.lastName}
                    </a>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WorkersTab;

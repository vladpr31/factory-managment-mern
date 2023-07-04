import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Shifts from "./Shifts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  deleteShift,
  endLoadingData,
  startLoadingData,
} from "../../Context/actions/userAction";
const ShiftsTab = ({ props }) => {
  const { auth } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.setItem("viewingTab", JSON.stringify("Shifts"));
  }, [isLoading]);

  const deleteShiftHandler = async (shiftID) => {
    dispatch(startLoadingData());
    await dispatch(deleteShift(shiftID, navigate));
    dispatch(endLoadingData());
  };
  if (isLoading) {
    return <h1>Loading Shifts...</h1>;
  }

  if (props?.shifts?.length > 0) {
    return (
      <div className="flex flex-wrap justify-center w-[50%] mx-auto">
        <h1 className="text-center p-5 text-glow sm:text-[19px] md:text-[42px] lg:text-[48px] xl:text-[48px]">
          Current Shifts
        </h1>
        <table className="table-auto w-full shadow-2xl">
          <thead className="w-full">
            <tr className="text-center w-full">
              <th className="border-2 border-black bg-gray-400 bg-opacity-30 text-white text-glow">
                Shift Date
              </th>
              <th className="border-2 border-black bg-gray-400 bg-opacity-30 text-white text-glow">
                Shift Time
              </th>
              <th className="border-2 border-black bg-gray-400 bg-opacity-30 text-white text-glow">
                Shift Workers
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props?.shifts?.map((shift, index) => (
              <tr key={index}>
                <td className="border-2 border-black text-center bg-gray-400 bg-opacity-30 text-white text-glow">
                  {new Date(shift.date).toLocaleDateString()}
                </td>
                <td className="border-2 border-black text-center bg-gray-400 bg-opacity-30 text-white text-glow">
                  {new Date(shift?.startingHour).toLocaleTimeString()} -{" "}
                  {new Date(shift?.endingHour).toLocaleTimeString()}
                </td>
                <td className="border-2 border-black text-center bg-gray-400 bg-opacity-30 text-white text-glow">
                  {shift?.shiftWorkers?.map((worker, index) => (
                    <a
                      key={index}
                      className="p-2 flex flex-col hover:text-blue-400"
                      href={`/user/${worker._id}`}
                    >
                      {worker?.firstName + " " + worker?.lastName}
                    </a>
                  ))}
                </td>
                <td className="text-center">
                  {props?.firstName === props?.department?.manager?.firstName &&
                  props?.lastName === props?.department?.manager?.lastName &&
                  props?.department?.manager?._id === auth?.id ? (
                    <button
                      className="ml-2 hover:after:content-['Delete_Shift'] after:absolute after:ml-2 after:text-white "
                      onClick={() => deleteShiftHandler(shift._id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#e71823", transform: "scale(1.2)" }}
                      />
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {props?.firstName === props?.department?.manager?.firstName &&
        props?.lastName === props?.department?.manager?.lastName &&
        props?.department?.manager?._id === auth?.id ? (
          <Shifts />
        ) : null}
      </div>
    );
  } else {
    return (
      <div className="text-center flex flex-col justify-center w-fit flex-wrap mx-auto p-6 text-glow">
        <h1 className="text-[48px]">No Shifts Available Yet</h1>
        {props?.firstName === props?.department?.manager?.firstName &&
        props?.lastName === props?.department?.manager?.lastName &&
        props?.department?.manager?._id === auth?.id ? (
          <Shifts />
        ) : null}
      </div>
    );
  }
};

export default ShiftsTab;

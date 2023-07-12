import React, { useState } from "react";
import { useSelector } from "react-redux";
import Shifts from "./Shifts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteShift } from "../../../Context/actions/shiftsAction";
import {
  endLoadingData,
  startLoadingData,
} from "../../../Context/actions/userAction";

const ShiftsTab = ({ props }) => {
  const { auth } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.user);
  const { shifts } = useSelector((state) => state.shifts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allowEditShift, setAllowEditShift] = useState(false);

  const [currShiftEdited, setCurrShiftEdited] = useState(null);
  const deleteShiftHandler = async (shiftID) => {
    dispatch(startLoadingData());
    await dispatch(deleteShift(shiftID, navigate));
    dispatch(endLoadingData());
  };

  const allowEditShiftHandler = async (shiftID) => {
    setCurrShiftEdited(() => shifts?.filter((shift) => shift._id === shiftID));
    setAllowEditShift(!allowEditShift);
  };

  if (isLoading) {
    return <h1>Loading Shifts...</h1>;
  }

  if (props?.shifts?.length > 0) {
    return (
      <div className="mx-auto flex flex-wrap w-[50%] justify-center sm: w-[75%] h-screen ">
        <h1 className="text-center py-5 text-glow sm:text-[19px] md:text-[42px] lg:text-[48px] xl:text-[48px]">
          Current Shifts
        </h1>
        <table className="table-auto w-full shadow-2xl h-fit">
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
                  {shift.shiftCreator == auth.id &&
                  props?.department?.manager?._id === auth?.id ? (
                    <button
                      className="ml-2"
                      onClick={() => deleteShiftHandler(shift._id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#e71823", transform: "scale(1.2)" }}
                      />
                    </button>
                  ) : null}
                </td>
                <td className="text-center">
                  {shift.shiftCreator == auth.id &&
                  props?.department?.manager?._id === auth?.id ? (
                    <button
                      className="ml-2 "
                      onClick={() => allowEditShiftHandler(shift._id)}
                    >
                      <FontAwesomeIcon
                        icon={faPen}
                        style={{ color: "#12a150" }}
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
          <Shifts props={{ allowEditShift, currShiftEdited }} />
        ) : null}
      </div>
    );
  } else {
    return (
      <div className="text-center flex justify-center text-glow h-full">
        <h1 className="text-[48px]">No Shifts Available Yet</h1>
        {props?.firstName === props?.department?.manager?.firstName &&
        props?.lastName === props?.department?.manager?.lastName &&
        props?.department?.manager?._id === auth?.id ? (
          <Shifts props={{ allowEditShift, currShiftEdited }} />
        ) : null}
      </div>
    );
  }
};

export default ShiftsTab;

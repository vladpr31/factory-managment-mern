import React, { useState, useEffect } from "react";
import Input from "../UI/Input";
import Select from "react-select";
import {
  createNewShift,
  updateShift,
} from "../../Context/actions/shiftsAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  endLoadingData,
  startLoadingData,
} from "../../Context/actions/userAction";

const Shifts = ({ props }) => {
  const [showForm, setShowForm] = useState(false);
  const { allUsers } = useSelector((state) => state.user);
  const [selectOptions, setSelectOptions] = useState([]);
  const navigate = useNavigate();
  const [shift, setShift] = useState({
    date: props.currShiftEdited ? props.currShiftEdited[0].date : "",
    startingHour: props.currShiftEdited
      ? props.currShiftEdited[0].startingHour
      : "",
    endingHour: props.currShiftEdited
      ? props.currShiftEdited[0].endingHour
      : "",
    shiftWorkers: props.currShiftEdited
      ? props.currShiftEdited[0].shiftWorkers
      : [{}],
  });
  const dispatch = useDispatch();

  const showFormHandler = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  useEffect(() => {
    if (allUsers) {
      const selectOptions = allUsers.map((user) => ({
        value: user,
        label: `${user.firstName} ${user.lastName}`,
      }));
      setSelectOptions(selectOptions);
    }
  }, [allUsers, props.currShiftEdited]);

  const newShiftHandler = (e) => {
    if (e.target) {
      const { id, value } = e.target;
      if (id === "shiftDate") {
        setShift((prevState) => ({
          ...prevState,
          date: new Date(value),
        }));
      }
      if (id === "startTime") {
        setShift((prevState) => ({
          ...prevState,
          startingHour: new Date(prevState.date.toDateString() + " " + value),
        }));
      }
      if (id === "endTime") {
        setShift((prevState) => ({
          ...prevState,
          endingHour: new Date(prevState.date.toDateString() + " " + value),
        }));
      }
    } else {
      const selected = e.map((selectOption) => selectOption.value);
      setShift((prevState) => ({
        ...prevState,
        shiftWorkers: selected,
      }));
    }
  };
  const createNewShiftHandler = async () => {
    dispatch(startLoadingData());
    await dispatch(createNewShift(shift, navigate));
    dispatch(endLoadingData());
  };
  const updateShiftHandler = async () => {
    dispatch(startLoadingData());
    await dispatch(updateShift(props.currShiftEdited[0]._id, shift, navigate));
    dispatch(endLoadingData());
  };
  return (
    <div className="relative mx-auto w-full  p-4">
      <button
        className="text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
        type="button"
        onClick={showFormHandler}
      >
        Create New Shift
      </button>
      {showForm && (
        <>
          <div className="flex flex-row justify-between mt-6 bg-gray-300 p-4 bg-opacity-20 rounded-xl mb-2">
            <form
              className=""
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Input
                props={{
                  name: "Shift Date",
                  type: "date",
                  placeholder: "DD/MM/YY",
                  required: true,
                  id: "shiftDate",
                  onChangeHandler: newShiftHandler,
                  inputValue: props?.currShiftEdited
                    ? new Date(props.currShiftEdited[0].date)
                        .toISOString()
                        .split("T")[0]
                    : shift.date,
                }}
              />
              <Input
                props={{
                  name: "Shift Starting Hour",
                  type: "time",
                  placeholder: "HH:MM",
                  required: true,
                  id: "startTime",
                  onChangeHandler: newShiftHandler,
                  inputValue: props?.currShiftEdited
                    ? new Date(props.currShiftEdited[0].startingHour)
                        .toTimeString()
                        .split(" ")[0]
                    : shift.startingHour,
                }}
              />
              <Input
                props={{
                  name: "Shift Ending Hour",
                  type: "time",
                  placeholder: "HH:MM",
                  required: true,
                  id: "endTime",
                  onChangeHandler: newShiftHandler,
                  inputValue: props?.currShiftEdited
                    ? new Date(props.currShiftEdited[0].endingHour)
                        .toTimeString()
                        .split(" ")[0]
                    : shift.endingHour,
                }}
              />
            </form>
            <div className="w-[50%]">
              <label className="text-glow">Shift Workers</label>
              <Select
                className="text-black"
                isMulti
                options={selectOptions}
                onChange={newShiftHandler}
                defaultValue={
                  props.currShiftEdited
                    ? selectOptions.filter(
                        (option, index) =>
                          option.value ===
                          props?.currShiftEdited[0]?.shiftWorkers[index]?._id
                      )
                    : "Select.."
                }
              />
            </div>
          </div>
          <div className="text-center">
            <button
              className="bg-blue-600 rounded-md text-glow h-fit w-fit p-3"
              onClick={
                props?.allowEditShift
                  ? updateShiftHandler
                  : createNewShiftHandler
              }
            >
              {props?.allowEditShift ? "Update Shift" : "Create Shift"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Shifts);

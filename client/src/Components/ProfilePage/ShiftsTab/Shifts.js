import React, { useState, useEffect } from "react";

import Select from "react-select";
import {
  createNewShift,
  updateShift,
} from "../../../Context/actions/shiftsAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  endLoadingData,
  startLoadingData,
} from "../../../Context/actions/userAction";
import DatePickerComp from "../../UI/DatePicker";
import { TEInput, TERipple } from "tw-elements-react";

const Shifts = ({ props }) => {
  const [showForm, setShowForm] = useState(false);
  const { allUsers, user } = useSelector((state) => state.user);
  const [selectOptions, setSelectOptions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state of shift, if it create then all input values are emty string, if it's edit loads the data from props.
  const [shift, setShift] = useState({
    date: props.currShiftEdited ? props?.currShiftEdited[0]?.date : "",
    startingHour: props.currShiftEdited
      ? props?.currShiftEdited[0]?.startingHour
      : "",
    endingHour: props.currShiftEdited
      ? props?.currShiftEdited[0]?.endingHour
      : "",
    shiftWorkers: props.currShiftEdited
      ? props?.currShiftEdited[0]?.shiftWorkers
      : [{}],
  });
  //removes employees from selectOptions which already have a shift on that day.
  const checkEmployeeAvailability = () => {
    user.shifts.map((currShift) => {
      if (currShift.date.split("T")[0] === shift.date) {
        const Options = selectOptions.filter(
          (worker, index) =>
            worker.value._id !== currShift.shiftWorkers[index]?._id
        );
        setSelectOptions(Options);
      }
    });
  };
  //show the shift for on "Edit" or "Create".
  const showFormHandler = () => {
    setShowForm(!showForm);
    if (props.currShiftEdited) {
      props.currShiftEdited = null;
    }
  };
  //on component mount creates the select option for the select component.
  useEffect(() => {
    const selectOptions = allUsers.map((user) => ({
      value: user,
      label: `${user.firstName} ${user.lastName}`,
    }));
    setSelectOptions(selectOptions);
    checkEmployeeAvailability();
  }, [shift.date]);
  //handles the shift form input
  const newShiftHandler = (e) => {
    if (e.target) {
      const { id, value } = e.target;

      if (id === "shiftDate") {
        setShift((prevState) => ({
          ...prevState,
          date: value,
        }));
      }
      if (id === "startTime") {
        setShift((prevState) => ({
          ...prevState,
          startingHour: new Date(
            shift.date.toLocaleDateString("fr-CA") + "T" + value
          ),
        }));
      }
      if (id === "endTime") {
        setShift((prevState) => ({
          ...prevState,
          endingHour: new Date(
            shift.date.toLocaleDateString("fr-CA") + "T" + value
          ),
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

  //dispatches the new shit creation.
  const createNewShiftHandler = async () => {
    dispatch(startLoadingData());
    shift.shiftCreator = user._id;
    await dispatch(createNewShift(shift, navigate));
    dispatch(endLoadingData());
  };

  //dispatches the shit update.
  const updateShiftHandler = async () => {
    dispatch(startLoadingData());
    shift.shiftCreator = user._id;
    await dispatch(updateShift(props.currShiftEdited[0]._id, shift, navigate));
    dispatch(endLoadingData());
  };
  console.log(props.allowEditShift);
  return (
    <div className="relative mx-auto w-full p-2">
      <button
        className="text-white bg-blue-700 rounded-md p-4"
        type="button"
        onClick={showFormHandler}
      >
        Create New Shift
      </button>
      {(showForm && !props.allowEditShift) ||
      (!showForm && props.allowEditShift) ? (
        <>
          <div className="flex flex-col justify-between mt-6 bg-gray-300 p-4 bg-opacity-20 rounded-xl mb-2">
            <form>
              <div className="grid grid-rows-3 grid-flow-col gap-4">
                <div className="row-span-3">
                  <DatePickerComp props={{ newShiftHandler }} />
                  {shift.date ? (
                    <>
                      <label className="text-glow">Shift Start Time:</label>
                      <TEInput
                        type="time"
                        className="mb-6 text-glow"
                        onChange={newShiftHandler}
                        id="startTime"
                      />
                    </>
                  ) : null}

                  {shift.startingHour ? (
                    <>
                      <label className="text-glow">Shift End Time:</label>
                      <TEInput
                        type="time"
                        className="mb-6 text-glow"
                        onChange={newShiftHandler}
                        id="endTime"
                      />
                    </>
                  ) : null}
                </div>
                <div className="col-span-2">
                  <TERipple
                    rippleUnbound
                    rippleRadius={30}
                    className="w-full h-fit mb-6"
                  >
                    <label className="text-glow">Shift Workers</label>
                    <Select
                      className="text-black "
                      isMulti
                      options={selectOptions}
                      onChange={newShiftHandler}
                      defaultValue={
                        props.currShiftEdited
                          ? selectOptions.filter(
                              (option, index) =>
                                option.value ===
                                props?.currShiftEdited[0]?.shiftWorkers[index]
                                  ?._id
                            )
                          : "Select.."
                      }
                      styles={{
                        multiValue: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: state.isSelected ? "gray" : "red",
                        }),
                      }}
                    />
                  </TERipple>
                </div>
              </div>
              <TERipple rippleColor="light" className="w-full">
                <button
                  className="block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
                  type="button"
                  onClick={
                    props?.allowEditShift
                      ? updateShiftHandler
                      : createNewShiftHandler
                  }
                >
                  {props?.allowEditShift ? "Update Shift" : "Create Shift"}
                </button>
              </TERipple>
            </form>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default React.memo(Shifts);

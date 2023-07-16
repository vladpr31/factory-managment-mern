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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
const Shifts = ({ props }) => {
  const [showForm, setShowForm] = useState(false);
  const { allUsers, user } = useSelector((state) => state.user);
  const [selectOptions, setSelectOptions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state of shift, if it create then all input values are emty string, if it's edit loads the data from props.
  const [shift, setShift] = useState({
    date: "",
    startingHour: "",
    endingHour: "",
    shiftWorkers: [{}],
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

  //on component mount creates the select option for the select component.
  useEffect(() => {
    const selectOptions = allUsers.map((user) => ({
      value: user,
      label: `${user.firstName} ${user.lastName}`,
    }));

    setSelectOptions(selectOptions);
    checkEmployeeAvailability();
  }, [shift?.date]);
  //handles the shift form input
  const shiftFormHandler = (e) => {
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

  //dispatches the new shift creation.
  const createNewShiftHandler = async () => {
    dispatch(startLoadingData());
    shift.shiftCreator = user._id;
    await dispatch(createNewShift(shift, navigate));
    dispatch(endLoadingData());
  };
  //dispatches the shift update.
  const updateShiftHandler = () => {
    dispatch(startLoadingData());
    shift.shiftCreator = user._id;
    dispatch(updateShift(props.currShiftEdited[0]._id, shift, navigate));
    dispatch(endLoadingData());
  };
  console.log(shift.date);
  return (
    <div className="py-2">
      <button
        className="bg-gradient-to-r from-[#08b6f0] to-[#ce0ce8] bg-opacity-30 border-[1.5px] border-white text-glow px-6 py-3 rounded  mx-auto w-fit"
        type="button"
        onClick={() => setShowForm(true)}
      >
        Create New Shift
      </button>
      {(showForm && !props.allowEditShift) ||
      (!showForm && props.allowEditShift) ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-70 fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-500 bg-opacity-70 outline-none focus:outline-none">
                <div className="flex items-start justify-end p-5 border-b border-solid border-blue-300 rounded-t ">
                  <button
                    className="bg-transparent float-right"
                    onClick={() => setShowForm(!showForm)}
                  >
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      size="xl"
                      style={{
                        color: "#08b6f0",
                        backgroundColor: "white",
                      }}
                      className="rounded-full border-[2px] border-[#08b6f0]"
                    />
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-700 bg-opacity-70 shadow-md rounded px-12 pt-6 pb-8 w-full">
                    <DatePickerComp
                      props={{
                        shiftFormHandler,
                      }}
                    />
                    {shift.date ? (
                      <>
                        <label className="text-glow">Shift Start Time:</label>
                        <TEInput
                          type="time"
                          className="mb-6 text-glow text-center"
                          onChange={shiftFormHandler}
                          id="startTime"
                          value={
                            props.currShiftEdited
                              ? new Date(
                                  shift.date.split("T")[0] +
                                    props.currShiftEdited[0].startingHour
                                )
                              : ""
                          }
                        />
                      </>
                    ) : null}
                    {shift.startingHour ? (
                      <>
                        <label className="text-glow">Shift End Time:</label>
                        <TEInput
                          type="time"
                          className="mb-6 text-glow text-center"
                          onChange={shiftFormHandler}
                          id="endTime"
                          value={
                            props.currShiftEdited
                              ? props.currShiftEdited[0].endingHour
                              : ""
                          }
                        />
                      </>
                    ) : null}
                    {shift.endingHour ? (
                      <TERipple
                        rippleUnbound
                        rippleRadius={30}
                        className="h-fit mb-4 w-full"
                      >
                        <label className="text-glow">Shift Workers</label>
                        <Select
                          className="text-black"
                          isMulti
                          options={selectOptions}
                          onChange={shiftFormHandler}
                          defaultValue={
                            props.currShiftEdited
                              ? selectOptions.filter(
                                  (option, index) =>
                                    option.value ===
                                    props?.currShiftEdited[0]?.shiftWorkers[
                                      index
                                    ]?._id
                                )
                              : "Select.."
                          }
                          styles={{
                            multiValue: (baseStyles, state) => ({
                              ...baseStyles,
                              backgroundColor: state.isSelected
                                ? "gray"
                                : "red",
                            }),
                          }}
                        />
                      </TERipple>
                    ) : null}
                  </form>
                </div>
                <div className="flex items-center justify-center p-6 border-t border-solid border-blue rounded-b">
                  <button
                    className="block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white "
                    type="button"
                    onClick={
                      props?.allowEditShift
                        ? updateShiftHandler
                        : createNewShiftHandler
                    }
                  >
                    {props?.allowEditShift ? "Update Shift" : "Create Shift"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default React.memo(Shifts);

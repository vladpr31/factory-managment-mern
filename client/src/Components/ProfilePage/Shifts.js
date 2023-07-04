import React, { useState, useEffect } from "react";
import Input from "../UI/Input";
import Select from "react-select";
import { createNewShift } from "../../Context/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  endLoadingData,
  startLoadingData,
} from "../../Context/actions/userAction";

const Shifts = () => {
  const [showForm, setShowForm] = useState(false);
  const { isLoading, allUsers, user } = useSelector((state) => state.user);
  const [selectOptions, setSelectOptions] = useState([]);
  const navigate = useNavigate();
  const [shift, setShift] = useState({
    date: null,
    startingHour: null,
    endingHour: null,
    shiftWorkers: [{}],
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
  }, [allUsers]);

  const newShiftHandler = (e) => {
    if (e.target) {
      const { id, value } = e.target;
      setShift((prevState) => ({
        ...prevState,
        [id]: id === "shiftDate" ? new Date(value) : value,
      }));
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
    await dispatch(createNewShift(user.id, shift, navigate));
    dispatch(endLoadingData());
  };

  return (
    <div className="relative h-fit mx-auto w-full mt-6 p-4">
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
                id="workerSelect"
              />
            </div>
          </div>
          <div className="text-center">
            <button
              className="bg-blue-600 rounded-md text-glow h-fit w-fit p-3"
              onClick={createNewShiftHandler}
            >
              Create Shift
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Shifts);

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../Context/actions/userAction";
import { useNavigate, useParams } from "react-router";
import {
  endLoadingData,
  startLoadingData,
} from "../../Context/actions/userAction";

const ProfileTab = ({ props }) => {
  const navigate = useNavigate();
  const [editedForm, setEditedForm] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
  });
  const { auth } = useSelector((state) => state.auth);
  const { id } = useParams();
  const prevForm = useRef({
    firstName: props.firstName,
    lastName: props.lastName,
    submitted: false,
  });
  const [allowEdit, setAllowEdit] = useState(true);
  const dispatch = useDispatch();

  const editFormChangeHandler = (e) => {
    const { id, value } = e.target;
    setEditedForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const allowEditFormHandler = () => {
    setAllowEdit((prevAllowEdit) => !prevAllowEdit);
    if (!prevForm.current.submitted) {
      setEditedForm({
        firstName: prevForm.current.firstName,
        lastName: prevForm.current.lastName,
      });
    }
  };

  const submitEditedFormHandler = () => {
    prevForm.current.submitted = true;
    const { id } = JSON.parse(localStorage.getItem("profile"));
    dispatch(startLoadingData());
    dispatch(updateUserInfo(id, editedForm, navigate));
    dispatch(endLoadingData());
  };

  return (
    <div className="py-20 h-full">
      <div className="float-right mr-24 lg:mr-4 ">
        {id === auth.id && (
          <button
            className="bg-gray-400 bg-opacity-60 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:ml-8 mb-1 md:ml-30"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={allowEditFormHandler}
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="container mx-auto px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white bg-opacity-20 w-full shadow-xl rounded-lg sm:w-full">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="text-center">
                <img
                  src="https://tecdn.b-cdn.net/img/new/avatars/5.webp"
                  className="mb-4 w-32 rounded-lg "
                  alt="Avatar"
                />
              </div>
            </div>
            <div className="text-center p-3 flex flex-col items-center">
              <input
                id="firstName"
                type="text"
                className={
                  !allowEdit
                    ? "text-[24px] bg-gray-200 text-center font-semibold leading-normal mt-2 mb-2 text-black mb-2 w-full lg:w-auto sm:w-10/12"
                    : "text-[24px] bg-gray-900 text-center bg-opacity-10 font-semibold leading-normal mt-2 mb-2 text-glow mb-2 w-full lg:w-auto sm:w-10/12"
                }
                value={editedForm.firstName}
                onChange={editFormChangeHandler}
                disabled={allowEdit}
                readOnly={allowEdit}
              ></input>
              <input
                id="lastName"
                type="text"
                className={
                  !allowEdit
                    ? "text-[24px] bg-gray-200 text-center font-semibold leading-normal mt-2 mb-2 text-black mb-2 w-full lg:w-auto sm:w-10/12"
                    : "text-[24px] bg-gray-900 text-center bg-opacity-10 font-semibold leading-normal mt-2 mb-2 text-glow mb-2 w-full lg:w-auto sm:w-10/12"
                }
                value={editedForm.lastName}
                onChange={editFormChangeHandler}
                disabled={allowEdit}
                readOnly={allowEdit}
              ></input>
              {!allowEdit && (
                <button
                  className="bg-gray-900 bg-opacity-60 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs p-3 rounded outline-none focus:outline-none"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={submitEditedFormHandler}
                >
                  Save
                </button>
              )}
              <div className="mb-2 text-white mt-2 text-glow">
                {props?.department?.name} -{" "}
                <span className="text-glow">
                  Since {props?.startWorkingYear}
                </span>
              </div>
            </div>
            <div className="mt-10 py-4 border-t border-gray-300 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <p className="mb-4 text-lg leading-relaxed text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus non leo et metus viverra convallis. Phasellus
                    vehicula consectetur dui porta tempor. Maecenas ac quam
                    nulla. Vestibulum ante ipsum primis in faucibus orci luctus
                    et ultrices posuere cubilia curae; Donec accumsan
                    consectetur ligula, a placerat nibh molestie non.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;

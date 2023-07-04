import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../UI/Sidebar";
import ProfileTab from "./ProfileTab";
import ShiftsTab from "./ShiftsTab";
import WorkersTab from "./WorkersTab";
import BackButton from "../UI/BackButton";
import {
  endLoadingData,
  getUser,
  startLoadingData,
  getAllEmployees,
} from "../../Context/actions/userAction";

const ProfilePage = () => {
  const { isLoading, user: employee } = useSelector((state) => state.user);
  const { auth } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState(() => {
    return sessionStorage.getItem("viewingTab")
      ? JSON.parse(sessionStorage.getItem("viewingTab"))
      : "Profile";
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tabSwitch = (tab) => {
    switch (tab) {
      case "Profile":
        return <ProfileTab props={{ employee }} />;
      case "Shifts":
        return <ShiftsTab props={employee} />;
      case "Workers List":
        return <WorkersTab />;
      default:
        return <ProfileTab props={{ employee }} />;
    }
  };

  useEffect(() => {
    const loadEmployeeData = async () => {
      dispatch(startLoadingData());
      await dispatch(getUser(id, navigate));
      await dispatch(getAllEmployees(navigate));
      dispatch(endLoadingData());
    };

    loadEmployeeData();
  }, [id, auth, dispatch, navigate, employee?.shifts?.length]);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="h-full min-h-screen w-full profile-body bg-blur">
      <div className="bg-gray-900 bg-opacity-40 min-h-screen">
        <Sidebar
          props={{
            listItems: [
              "Home",
              "Edit Profile",
              "Shifts",
              "Workers List",
              "Log Out",
            ],
            empName: `${employee.firstName} ${employee.lastName}`,
            tab: setCurrentTab,
            currUser: { id },
          }}
        />
        {tabSwitch(currentTab)}
        <BackButton props={id} />
      </div>
    </div>
  );
};

export default ProfilePage;

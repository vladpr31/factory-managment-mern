import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import TabsBar from "../UI/TabsBar";
import {
  endLoadingData,
  getUser,
  startLoadingData,
  getAllEmployees,
} from "../../Context/actions/userAction";

const ProfilePage = () => {
  const { isLoading, user: employee } = useSelector((state) => state.user);
  const { shifts } = useSelector((state) => state.shifts);
  const { auth } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadEmployeeData = async () => {
      dispatch(startLoadingData());
      await dispatch(getUser(id, navigate));
      await dispatch(getAllEmployees(navigate));
      dispatch(endLoadingData());
    };

    loadEmployeeData();
  }, [id, auth, dispatch, navigate, shifts.length]);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="flex flex-col w-full h-full">
      <TabsBar props={{ employee }} />
    </div>
  );
};

export default ProfilePage;

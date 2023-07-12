import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import ProfileTab from "../ProfilePage/ProfileTab";
import ShiftsTab from "../ProfilePage/ShiftsTab/ShiftsTab";
import WorkersTab from "../ProfilePage/WorkersTab";
import { signOut } from "../../Context/actions/authAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import BackButton from "./BackButton";

const Sidebar = ({ props }) => {
  const { auth } = useSelector((state) => state.auth);
  const [justifyActive, setJustifyActive] = useState("tab1");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };
  const logOutHandler = () => {
    dispatch(signOut(navigate));
  };
  const renderHeaderText = () => {
    if (props.employee._id === auth.id) {
      return (
        <h1 className="text-white text-center text-4xl md:text-5xl lg:text-6xl p-4 md:p-10">
          <span className="text-gradient">
            {props.employee.firstName + " " + props.employee.lastName}
          </span>
        </h1>
      );
    } else {
      return (
        <h1 className="text-white text-center text-4xl md:text-5xl lg:text-6xl p-4 md:p-10 text-glow">
          Currently Viewing{" "}
          <span className="text-gradient">
            {props.employee.firstName + " " + props.employee.lastName}
          </span>
          's Profile
        </h1>
      );
    }
  };

  return (
    <div className="flex bg-[url('https://bluespaceltd.co.uk/wp-content/uploads/2020/08/A-Office-Design-scaled.jpg')] bg-cover bg-center bg- lg:bg-center h-full w-full ">
      <div className="backdrop-blur-md bg-black bg-opacity-75 h-full w-full">
        {renderHeaderText()}

        <nav className="">
          <div className="mx-auto sm:px-6 lg:px-8">
            <TETabs pills fill>
              <TETabsItem
                onClick={() => handleJustifyClick("tab1")}
                active={justifyActive === "tab1"}
                className={
                  justifyActive === "tab1"
                    ? "bg-gradient-to-r from-[#08b6f0] to-[#ce0ce8] text-[28px] text-glow"
                    : ""
                }
              >
                Profile
              </TETabsItem>
              <TETabsItem
                onClick={() => handleJustifyClick("tab2")}
                active={justifyActive === "tab2"}
                className={
                  justifyActive === "tab2"
                    ? "bg-gradient-to-r from-[#08b6f0] to-[#ce0ce8] text-[28px] text-glow"
                    : ""
                }
              >
                Shifts
              </TETabsItem>
              <TETabsItem
                onClick={() => handleJustifyClick("tab3")}
                active={justifyActive === "tab3"}
                className={
                  justifyActive === "tab3"
                    ? "bg-gradient-to-r from-[#08b6f0] to-[#ce0ce8] text-[28px] text-glow"
                    : ""
                }
              >
                Worker's List
              </TETabsItem>
              <TETabsItem
                onClick={logOutHandler}
                active={justifyActive === "tab4"}
              >
                Log-Out
              </TETabsItem>
            </TETabs>

            <TETabsContent>
              <TETabsPane show={justifyActive === "tab1"}>
                <ProfileTab props={props.employee} />
              </TETabsPane>
              <TETabsPane show={justifyActive === "tab2"}>
                <ShiftsTab props={props.employee} />
              </TETabsPane>
              <TETabsPane show={justifyActive === "tab3"}>
                <WorkersTab />
              </TETabsPane>
              <TETabsPane show={justifyActive === "tab4"} tag="button">
                Log-Out
              </TETabsPane>
            </TETabsContent>
          </div>
        </nav>
        <BackButton props={props.employee._id} />
      </div>
    </div>
  );
};

export default Sidebar;

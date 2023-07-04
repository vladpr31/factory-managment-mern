import React, { useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "../../Context/actions/authAction";
import "./UI.css";
const active =
  "text-center w-full text-[14px] font-medium animate-[slide_1s_ease-in-out] bg-left-top flex justify-center h-12 items-center transition sm: text-[12px] active-tab-bg ";
const inActive =
  "text-center w-full text-white text-[14px] hover:bg-black hover:bg-opacity-40 hover:text-white hover:border-1 hover:border-white flex justify-center h-12 items-center sm: text-[10px] ";
const TabButton = ({ props }) => {
  console.log(JSON.parse(sessionStorage.getItem("viewingTab")));
  const [activeTab, setActiveTab] = useState(
    JSON.parse(sessionStorage.getItem("viewingTab"))
  );
  const user = JSON.parse(localStorage.getItem("profile"));
  const urlUser = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!user?.id) {
    return null;
  }
  const tabSwitch = (tab) => {
    switch (tab) {
      case "Profile":
        setActiveTab(tab);
        props.props.tab(tab);
        break;
      case "Shifts":
        setActiveTab(tab);
        props.props.tab(tab);
        break;
      case "Workers List":
        setActiveTab(tab);
        props.props.tab(tab);
        break;
      case "Edit Profile":
        setActiveTab(tab);
        props.props.tab(tab);
        break;
      case "Logout":
        dispatch(signOut(navigate));
        break;
      default:
        setActiveTab("Profile");
        props.props.tab("Profile");
    }
  };
  return (
    <>
      {props.tabs.map((tab, index) => {
        if (user.id !== urlUser.id) {
          if (tab !== "Logout") {
            return (
              <button
                key={index}
                className={tab === activeTab ? active : inActive + "act-tab"}
                diabled={tab === activeTab ? "true" : "false"}
                id={tab}
                onClick={() => tabSwitch(tab)}
              >
                {tab.toUpperCase()}
              </button>
            );
          }
        } else {
          return (
            <button
              key={index}
              className={tab === activeTab ? active : inActive}
              id={tab}
              diabled={tab === activeTab ? "true" : "false"}
              onClick={() => tabSwitch(tab)}
            >
              {tab === "Logout" ? (
                <FontAwesomeIcon icon={faPowerOff} size="2xl" />
              ) : (
                tab.toUpperCase()
              )}
            </button>
          );
        }
      })}
    </>
  );
};

export default React.memo(TabButton);

import React from "react";
import TabButton from "./TabButton";
import { useSelector } from "react-redux";

const tabs = ["Profile", "Shifts", "Workers List", "Logout"];

const Sidebar = ({ props }) => {
  const { auth } = useSelector((state) => state.auth);

  const renderHeaderText = () => {
    if (props.currUser.id === auth.id) {
      return (
        <h1 className="text-white text-center text-4xl md:text-5xl lg:text-6xl p-4 md:p-10">
          <span className="text-gradient">{props.empName}</span>
        </h1>
      );
    } else {
      return (
        <h1 className="text-white text-center text-4xl md:text-5xl lg:text-6xl p-4 md:p-10 text-glow">
          Currently Viewing{" "}
          <span className="text-gradient">{props.empName}</span>'s Profile
        </h1>
      );
    }
  };

  return (
    <div className="bg-[url('https://bluespaceltd.co.uk/wp-content/uploads/2020/08/A-Office-Design-scaled.jpg')] bg-cover bg-center lg:bg-center">
      <div className="backdrop-blur-md bg-black bg-opacity-75">
        {renderHeaderText()}

        <nav className="bg-gray-50 bg-opacity-10 backdrop-blur-sm">
          <div className="mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-col items-center md:flex-row md:justify-evenly">
              <TabButton props={{ tabs, props }} />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

const DepartmentDAL = require("../DALs/departmentDBService");
const EmployeeDAL = require("../DALs/employeeDBService");
const UserDAL = require("../DALs/userDBService");
const ShiftsDAL = require("../DALs/shiftsDBService");
const userWS = require("../DALs/userWS");

const createNewShift = async (payload) => {
  try {
    console.log("in userSerivce createShift:", payload);
    const currShiftWorkers = payload.shiftWorkers;
    const shift = await ShiftsDAL.createNewShift(payload);
    currShiftWorkers.map((worker) => {
      EmployeeDAL.updateEmployeeShifts(worker._id, shift._id);
    });
    return "Shift Created.";
  } catch (err) {
    return err.message;
  }
};
const deleteShift = async (payload) => {
  try {
    await ShiftsDAL.deleteShift(payload);
    await EmployeeDAL.deleteManyEmployeeShifts(payload);
    return "Shifts Deleted";
  } catch (err) {
    return err.message;
  }
};
const getAllEmployees = () => {
  return EmployeeDAL.getAllEmployees();
};

const getUserByName = (payload) => {
  return UserDAL.getUserByName(payload);
};

const getUserByID = async (payload) => {
  try {
    const userID = payload;
    //getting user data from mongoDB from Employee.
    const employee = await EmployeeDAL.getEmployeeByID(userID);
    //Here need to come also the data from mongoDB, shifts ,department etc.
    if (employee) {
      return employee;
    } else {
      throw Error(helper.authErrorHandler("NON_EXIST"));
    }
  } catch (err) {
    return err.message;
  }
};

const updateUser = (payload) => {
  const { id, firstName, lastName } = payload;
  try {
    const updatedEmployee = EmployeeDAL.updateEmployee(id, {
      firstName,
      lastName,
    });
    const updatedUser = UserDAL.updateUserInfo(id, {
      firstName,
      lastName,
    });

    if (updatedUser && updatedEmployee) {
      return updatedEmployee;
    }
  } catch (err) {
    console.log("Error in updateUser userSerivce:", err);
    return err;
  }
};

module.exports = {
  createNewShift,
  getUserByName,
  getUserByID,
  getAllEmployees,
  updateUser,
  deleteShift,
};
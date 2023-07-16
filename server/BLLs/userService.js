const EmployeeDAL = require("../DALs/employeeDBService");
const UserDAL = require("../DALs/userDBService");

//return all employees.
const getAllEmployees = () => {
  return EmployeeDAL.getAllEmployees();
};
//return user by full Name.
const getUserByName = (payload) => {
  return UserDAL.getUserByName(payload);
};
//returs user by ID, which is actualy and employee so return an employee by ID.
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

//updated user info also updated the employee because they use the same info.
const updateUser = (payload) => {
  const { id, firstName, lastName } = payload;
  try {
    const updatedEmployee = EmployeeDAL.updateEmployeeName(id, {
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
  getUserByName,
  getUserByID,
  getAllEmployees,
  updateUser,
};

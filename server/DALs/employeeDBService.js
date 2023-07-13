const Employee = require("../models/employeeModal");
require("../models/departmentModal");

const createNewEmployee = (employee) => {
  try {
    //Add employee info verification here and then create if employee is correct.
    const newEmployee = Employee.create(employee);
    newEmployee.save();
    return "New Employee Created.";
  } catch (err) {
    return err;
  }
};
const getAllEmployees = () => {
  return Employee.find({}).populate({
    path: "department",
    model: "Department",
    populate: {
      path: "manager",
      model: "Employee",
    },
  });
};
const getEmployeeByID = (id) => {
  //populate() => populates the returned element with the references he has in his model.
  // fro example employee table has an element which references Shift table(shifts) with populate it takes the ids
  // and returns the element with the shift object as well.
  try {
    return Employee.findById(id)
      .populate({
        path: "shifts",
        model: "Shift",
        populate: {
          path: "shiftWorkers",
          model: "Employee",
        },
      })
      .populate({
        path: "department",
        model: "Department",
        populate: {
          path: "manager",
          model: "Employee",
        },
      });
  } catch (err) {
    console.log(err);
  }
};
const deleteEmployee = (id) => {
  Employee.findByIdAndDelete(id);
  return "Employee Has Been Deleted";
};
const addEmployeeShifts = (id, shift) => {
  return Employee.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { shifts: shift } }
  )
    .then((updated) => {
      console.log("addshiftsemployee:", updated);
    })
    .catch((err) => console.log(err.message));
};
const updateEmployeeName = (id, employeeInfo) => {
  return Employee.findByIdAndUpdate(
    { _id: id },
    { firstName: employeeInfo.firstName, lastName: employeeInfo.lastName },
    { upsert: false, new: true }
  ).then((updated) => {
    return updated;
  });
};

const deleteManyEmployeeShifts = (shiftID) => {
  console.log("deleteMany", shiftID);
  return Employee.updateMany(
    {},
    { $pull: { shifts: { $in: [shiftID] } } },
    { upsert: false, new: true }
  ).then((result) => {
    return result;
  });
};

const deleteSpecificShiftFromEmployee = (shiftID, userID) => {
  Employee.findByIdAndUpdate(
    userID,
    { $pull: { shifts: { $in: [shiftID] } } },
    { upsert: false, new: true }
  ).then((result) => console.log());
};
module.exports = {
  createNewEmployee,
  getEmployeeByID,
  deleteEmployee,
  updateEmployeeName,
  getAllEmployees,
  addEmployeeShifts,
  deleteManyEmployeeShifts,
  deleteSpecificShiftFromEmployee,
};

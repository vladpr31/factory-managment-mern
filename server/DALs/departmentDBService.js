const Department = require("../models/departmentModal");

//wasn't used\tested, but basic crud operations like the employee and shifts.

//creates new Department.
const createNewDepartment = async (newDepartment) => {
  const department = Department.create(newDepartment);
  await department.save();
  return "New Department Created.";
};
//returns department by ID.
const getDepartment = (id) => {
  return Department.findById(id).populate("manager");
};
//updates department.
const updateDepartment = (id, updatedDep) => {
  Department.findByIdAndUpdate(id, updatedDep);
  return "Department Has Been Updated";
};
//deletes department.
const deleteDepartment = (id) => {
  Department.findByIdAndDelete(id);
  return "Department Has Been Removed";
};

module.exports = {
  createNewDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};

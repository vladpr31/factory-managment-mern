const Department = require("../models/departmentModal");

const createNewDepartment = async (newDepartment) => {
  const department = Department.create(newDepartment);
  await department.save();
  return "New Department Created.";
};

const getDepartment = (id) => {
  return Department.findById(id).populate("manager");
};

const updateDepartment = (id, updatedDep) => {
  Department.findByIdAndUpdate(id, updatedDep);
  return "Department Has Been Updated";
};

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

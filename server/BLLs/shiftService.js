const EmployeeDAL = require("../DALs/employeeDBService");
const ShiftsDAL = require("../DALs/shiftsDBService");

const createNewShift = async (payload) => {
  try {
    const currShiftWorkers = payload.shiftWorkers;
    const shift = await ShiftsDAL.createNewShift(payload);
    currShiftWorkers.map((worker) => {
      EmployeeDAL.updateEmployeeShifts(worker._id, shift._id);
    });
    return shift;
  } catch (err) {
    return err.message;
  }
};
const updateExistingShift = async (payload) => {
  try {
    console.log(payload);
  } catch (err) {
    return err.message;
  }
};
const deleteShift = async (payload) => {
  try {
    const deletedShift = await ShiftsDAL.deleteShift(payload);
    await EmployeeDAL.deleteManyEmployeeShifts(payload);
    return deletedShift;
  } catch (err) {
    return err.message;
  }
};

const getShift = async (payload) => {
  try {
    const shift = await ShiftsDAL.getShiftInformation(payload);

    return shift;
  } catch (err) {
    return err.message;
  }
};
module.exports = {
  createNewShift,
  updateExistingShift,
  deleteShift,
  getShift,
};

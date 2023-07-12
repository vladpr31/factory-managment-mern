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
    const updatedShift = await ShiftsDAL.updateShift(
      payload.id,
      payload.updatedShift
    );

    return updatedShift;
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

const getShiftByID = async (payload) => {
  try {
    const shift = await ShiftsDAL.getShiftInformationByID(payload);
    return shift;
  } catch (err) {
    return err.message;
  }
};
const getShiftByDate = async (payload) => {
  try {
    const shift = await ShiftsDAL.getShiftInformationByDate(payload);
    return shift;
  } catch (err) {
    return err.message;
  }
};
module.exports = {
  createNewShift,
  updateExistingShift,
  deleteShift,
  getShiftByID,
  getShiftByDate,
};

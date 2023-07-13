const EmployeeDAL = require("../DALs/employeeDBService");
const ShiftsDAL = require("../DALs/shiftsDBService");
const Employee = require("../models/employeeModal");

const createNewShift = async (payload) => {
  try {
    const currShiftWorkers = payload.shiftWorkers;
    const shift = await ShiftsDAL.createNewShift(payload);
    currShiftWorkers.map((worker) => {
      EmployeeDAL.addEmployeeShifts(worker._id, shift._id);
    });
    return shift;
  } catch (err) {
    return err.message;
  }
};
const updateExistingShift = async (payload) => {
  try {
    const currentShift = await ShiftsDAL.getShiftInformationByID(payload.id);
    const updatedShift = await ShiftsDAL.updateShift(
      payload.id,
      payload.updatedShift
    );
    const prevShiftWorkers = currentShift.shiftWorkers;
    const newShiftWorkers = updatedShift.shiftWorkers;
    const removedWorkers = prevShiftWorkers.filter(
      (worker) => !newShiftWorkers.some((emp) => worker.equals(emp))
    );
    if (removedWorkers) {
      for (let i = 0; i < removedWorkers.length; i++) {
        EmployeeDAL.deleteSpecificShiftFromEmployee(
          payload.id.id,
          removedWorkers[i]
        );
      }
    }
    if (newShiftWorkers) {
      newShiftWorkers.map((worker) =>
        EmployeeDAL.addEmployeeShifts(worker, payload.id.id)
      );
    }

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

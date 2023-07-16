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

//updates an existing shift.
const updateExistingShift = async (payload) => {
  try {
    //first we get the current shift information, and keep it.
    const currentShift = await ShiftsDAL.getShiftInformationByID(payload.id);
    //then we update the shift with the new shift.
    const updatedShift = await ShiftsDAL.updateShift(
      payload.id,
      payload.updatedShift
    );
    //we take the shift workers from before the shift was updated.
    const prevShiftWorkers = currentShift.shiftWorkers;
    //and we take the new shift workers after the shift is updated.
    const newShiftWorkers = updatedShift.shiftWorkers;
    //then we filter the workers that been removed from the shift if any.
    const removedWorkers = prevShiftWorkers.filter(
      (worker) => !newShiftWorkers.some((emp) => worker.equals(emp))
    );
    //if we have workers that been removed we call the deleteSpecificShiftFromEployee function, which deletes the shift
    // for every employee that was removed.
    if (removedWorkers) {
      for (let i = 0; i < removedWorkers.length; i++) {
        EmployeeDAL.deleteSpecificShiftFromEmployee(
          payload.id.id,
          removedWorkers[i]
        );
      }
    }
    //and also we add the shift for the new ones added.
    if (newShiftWorkers) {
      newShiftWorkers.map((worker) =>
        EmployeeDAL.addEmployeeShifts(worker, payload.id.id)
      );
    }
    //finaly we return the updated shift.
    return updatedShift;
  } catch (err) {
    return err.message;
  }
};
//just deletes a shift from shift modal, and for every employee(they have reference to shifts.)
const deleteShift = async (payload) => {
  try {
    const deletedShift = await ShiftsDAL.deleteShift(payload);
    await EmployeeDAL.deleteManyEmployeeShifts(payload);
    return deletedShift;
  } catch (err) {
    return err.message;
  }
};
//returns shift by it's ID.
const getShiftByID = async (payload) => {
  try {
    const shift = await ShiftsDAL.getShiftInformationByID(payload);
    return shift;
  } catch (err) {
    return err.message;
  }
};
//returns shift by it's date.
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

const Shifts = require("../models/shiftModal");
const Employee = require("../models/employeeModal");
//Shifts Functions

const getAllShifts = () => {
  return Shifts.find({}).populate("shiftWorkers");
};

const createNewShift = async (shift) => {
  try {
    console.log(shift);
    const newShift = Shifts.create(shift);
    (await newShift).save();
    return newShift;
  } catch (err) {
    return err.message;
  }
};

const getShiftWorkers = async (shiftID) => {
  const shift = await Shifts.findById(id);
  return shift.shiftWorkers;
};

const getShiftInformation = (shiftID) => {
  return Shifts.findById(shiftID);
};

const deleteShift = (shiftID) => {
  return Shifts.findByIdAndDelete({ _id: shiftID });
};

const updateShift = (shiftID, newShift) => {
  Shifts.findByIdAndUpdate(shiftID, newShift);
  return "Shift Is Updated.";
};

module.exports = {
  getAllShifts,
  getShiftInformation,
  getShiftWorkers,
  updateShift,
  deleteShift,
  createNewShift,
};

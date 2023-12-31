const Shifts = require("../models/shiftModal");
//Shifts Functions

const getAllShifts = () => {
  return Shifts.find({}).populate("shiftWorkers");
};

const createNewShift = async (shift) => {
  try {
    const newShift = Shifts.create(shift);
    (await newShift).save();
    return newShift;
  } catch (err) {
    return err.message;
  }
};

const getShiftInformationByID = (shiftID) => {
  const { id } = shiftID;
  return Shifts.findById({ _id: id });
};

const deleteShift = (shiftID) => {
  return Shifts.findByIdAndDelete({ _id: shiftID });
};

const updateShift = (shiftID, newShift) => {
  return Shifts.findByIdAndUpdate({ _id: shiftID.id }, newShift, {
    upsert: false,
    new: true,
  });
};

const getShiftInformationByDate = (shiftDate) => {
  return Shifts.findOne({ date: shiftDate });
};
module.exports = {
  getAllShifts,
  getShiftInformationByID,
  updateShift,
  deleteShift,
  createNewShift,
  getShiftInformationByDate,
};

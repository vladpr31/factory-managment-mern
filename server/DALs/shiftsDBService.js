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
  return Shifts.findById(shiftID);
};

const deleteShift = (shiftID) => {
  return Shifts.findByIdAndDelete({ _id: shiftID });
};

const updateShift = (shiftID, newShift) => {
  Shifts.findByIdAndUpdate({ _id: shiftID.id }, newShift, {
    upsert: false,
    new: true,
  })
    .then((result) => console.log(result))
    .catch((err) => console.log(err.message));
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

const { v4: uuid } = require("uuid");

const Record = require("../database/Record");

const getAllRecords = () => {
  const AllRecords = Record.getAllRecords();
  return AllRecords;
};

const getOneRecord = (recordId) => {
  try {
    const record = Record.getOneRecord(recordId);
    return record;
  } catch (error) {
    throw error;
  }
};

const getRecordForWorkout = (workoutId) => {
  try {
    const record = Record.getRecordForWorkout(workoutId);
    return record;
  } catch (error) {
    throw error;
  }
};

const updateOneRecord = (recordId, body) => {
  try {
    const record = Record.updateOneRecord(recordId, body);
    return record;
  } catch (error) {
    throw error;
  }
};

const deleteOneRecord = (recordId) => {
  try {
    const record = Record.deleteOneRecord(recordId);
    return record;
  } catch (error) {
    throw error;
  }
};

const createNewRecord = (newRecord) => {
  const recordToInsert = {
    ...newRecord,
    id: uuid(),
  };

  try {
    const createdRecord = Record.createNewRecord(recordToInsert);
    return createdRecord;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRecordForWorkout,
  getAllRecords,
  getOneRecord,
  updateOneRecord,
  deleteOneRecord,
  createNewRecord,
};

const DB = require("./db.json");

const { saveToDatabase } = require("./utils");

const getAllRecords = () => {
  return DB.records;
};

const updateOneRecord = (recordId, body) => {
  const indexForUpdate = DB.records.findIndex(
    (record) => record.id === recordId
  );

  if (indexForUpdate === -1) {
    throw {
      status: 666,
      message: `Workout with id ${recordId} not found`,
    };
  }
  const updatedRecord = {
    ...DB.records[indexForUpdate],
    ...body,
  };

  try {
    DB.records[indexForUpdate] = updatedRecord;
    saveToDatabase(DB);
    return updatedRecord;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const getOneRecord = (recordId) => {
  const RecordForId = DB.records.find((record) => record.id === recordId);

  if (!RecordForId) {
    throw {
      status: 666,
      message: `Record for id ${recordId} not found`,
    };
  }

  try {
    return RecordForId;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const getRecordForWorkout = (workoutId) => {
  try {
    const record = DB.records.filter((record) => record.workout === workoutId);
    if (!record) {
      throw {
        status: 400,
        message: `Can't find workout with the is ${workoutId}`,
      };
    }
    return record;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const deleteOneRecord = (recordId) => {
  const indexForDelete = DB.records.findIndex(
    (record) => record.id === recordId
  );

  if (indexForDelete === -1) {
    throw {
      status: 666,
      message: `Workout with id ${recordId} not found`,
    };
  }

  try {
    DB.records.splice(indexForDelete, 1);
    saveToDatabase(DB);
    return DB.records;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const createNewRecord = (newRecord) => {
  DB.workouts.push(newRecord);
  saveToDatabase(DB);
  return newRecord;
};

module.exports = {
  getRecordForWorkout,
  getAllRecords,
  getOneRecord,
  updateOneRecord,
  deleteOneRecord,
  createNewRecord,
};

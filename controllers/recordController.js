const recordService = require("../services/recordService");

const getAllRecords = (req, res) => {
  const AllRecords = recordService.getAllRecords();
  res.send({ status: "OK", data: AllRecords });
};

const getOneRecord = (req, res) => {
  const {
    params: { recordId },
  } = req;

  try {
    const record = recordService.getOneRecord(recordId);
    return res.send({ status: "Ok", data: record });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const getRecordForWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter':workoutId' can not be empty",
      },
    });
  }
  try {
    const record = recordService.getRecordForWorkout(workoutId);
    res.send({ status: "OK", data: record });
  } catch {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const updateOneRecord = (req, res) => {
  const {
    body,
    params: { recordId },
  } = req;
  try {
    const updatedRecord = recordService.updateOneRecord(recordId, body);
    return res.send({ status: "OK", data: updatedRecord });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.massage || error },
    });
  }
};

const createNewRecord = (req, res) => {
  const { body } = req;
  if (!body.workout || !body.record) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
      },
    });
    return;
  }
  const newRecord = {
    workout: body.workout,
    record: body.record,
  };
  try {
    const createdRecord = recordService.createNewRecord(newRecord);
    res.status(201).send({
      status: "OK",
      data: createdRecord,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const deleteOneRecord = (req, res) => {
  const {
    params: { recordId },
  } = req;
  try {
    const record = recordService.deleteOneRecord(recordId);
    return res.send({ status: "Ok", data: record });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.massage || error },
    });
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

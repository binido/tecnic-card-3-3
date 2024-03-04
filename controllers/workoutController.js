const workoutService = require("../services/workoutService");

const getAllWorkouts = (req, res) => {
  const { mode } = req.query;
  try {
    const AllWorkouts = workoutService.getAllWorkouts({
      mode,
    });
    res.send({ status: "OK", data: AllWorkouts });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.massage || error },
    });
  }
};

//Controller
const getOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  try {
    const workout = workoutService.getOneWorkout(workoutId);
    return res.send({ status: "Ok", data: workout });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.massage || error },
    });
  }
};

const createNewWorkout = (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
      },
    });
    return;
  }
  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };
  try {
    const createdWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).send({
      status: "OK",
      data: createdWorkout,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.massage || error },
    });
  }
};

const updateOneWorkout = (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;
  try {
    const updateWorkout = workoutService.updateOneWorkout(workoutId, body);
    return res.send({ status: "OK", data: updateWorkout });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.massage || error },
    });
  }
};

const deleteOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  try {
    const workout = workoutService.deleteOneWorkout(workoutId);
    return res.send({ status: "Ok", data: workout });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.massage || error },
    });
  }
};
module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};

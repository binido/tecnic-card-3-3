const { v4: uuid } = require("uuid");

const Workout = require("../database/Workout");

const getAllWorkouts = (filterParams) => {
  try {
    const AllWorkouts = Workout.getAllWorkouts(filterParams);
    return AllWorkouts;
  } catch (error) {
    throw error;
  }
};

//Service
const getOneWorkout = (workoutId) => {
  try {
    const workout = Workout.getOneWorkout(workoutId);
    return workout;
  } catch (error) {
    throw error;
  }
};

const createNewWorkout = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createAt: new Date().toLocaleString("en-US", {
      timeZone: "UTC",
    }),
    updateAt: new Date().toLocaleString("en-Us", {
      timeZone: "UTC",
    }),
  };
  try {
    const createdWorkout = Workout.createNewWorkout(workoutToInsert);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
};

const updateOneWorkout = (workoutId, body) => {
  try {
    const workout = Workout.updateOneWorkout(workoutId, body);
    return workout;
  } catch (error) {
    throw error;
  }
};

const deleteOneWorkout = (workoutId) => {
  try {
    const workout = Workout.deleteOneWorkout(workoutId);
    return workout;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};

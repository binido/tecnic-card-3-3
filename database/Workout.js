const DB = require("./db.json");

const { saveToDatabase } = require("./utils");

const getAllWorkouts = (filterParams) => {
  try {
    let workouts = DB.workouts;
    if (filterParams.mode) {
      return DB.workouts.filter((workout) =>
        workout.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    return workouts;
  } catch (error) {
    throw { status: 500, massage: error };
  }
};

//Workout
const getOneWorkout = (workoutId) => {
  const WorkoutForId = DB.workouts.find((workout) => workout.id === workoutId);

  if (!WorkoutForId) {
    throw {
      status: 666,
      message: `Workout with id ${workoutId} not found`,
    };
  }

  try {
    return WorkoutForId;
  } catch (error) {
    throw {
      status: 500,
      message: error?.massage || error,
    };
  }
};

const updateOneWorkout = (workoutId, body) => {
  const indexForUpdate = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );

  if (indexForUpdate === -1) {
    throw {
      status: 666,
      message: `Workout with id ${workoutId} not found`,
    };
  }
  const updatedWorkout = {
    ...DB.workouts[indexForUpdate],
    ...body,
    updateAt: new Date().toLocaleString("en-Us", {
      timeZone: "UTC",
    }),
  };

  try {
    DB.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
  } catch (error) {
    throw {
      status: 500,
      message: error?.massage || error,
    };
  }
};

const deleteOneWorkout = (workoutId) => {
  const indexForDelete = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );

  if (indexForDelete === -1) {
    throw {
      status: 666,
      message: `Workout with id ${workoutId} not found`,
    };
  }

  try {
    DB.workouts.splice(indexForDelete, 1);
    saveToDatabase(DB);
    return DB.workouts;
  } catch (error) {
    throw {
      status: 500,
      message: error?.massage || error,
    };
  }
};

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Workout with the name '${newWorkout.name}' already exists`,
    };
  }
  try {
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    throw {
      status: 500,
      message: error?.massage || error,
    };
  }
};

module.exports = {
  getAllWorkouts,
  createNewWorkout,
  getOneWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};

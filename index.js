const express = require("express");

const bodyParser = require('body-parser')
const WorkoutRouter = require("./routes/workoutRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use("/workouts", WorkoutRouter);

app.listen(PORT, () => {
  console.log(`API is listening on url localhost:${PORT}`);
});

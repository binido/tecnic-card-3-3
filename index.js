const express = require("express");

const bodyParser = require("body-parser");
const WorkoutRouter = require("./routes/workoutRoutes");
const RecordRouter = require("./routes/recordRoutes");
const cors = require("cors");

//Cache, but comment on the cache in the router!!!!
// const apicache = require("apicache");
// const cache = apicache.middleware;
// app.use(cache("2 minutes"));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/workouts", WorkoutRouter);
app.use("/records", RecordRouter);

app.listen(PORT, () => {
  console.log(`API is listening on url localhost:${PORT}`);
});

const express = require("express");
const recordController = require("../controllers/recordController");

const router = express.Router();

router.get("/", recordController.getAllRecords);

router.get("/:recordId", recordController.getOneRecord);

router.patch("/:recordId", recordController.updateOneRecord);

router.get("/record/:workoutId/", recordController.getRecordForWorkout);

router.delete("/:recordId", recordController.deleteOneRecord);

router.post("/", recordController.createNewRecord)

module.exports = router;

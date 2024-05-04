const express = require("express");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { registerTaskStages, getAllTaskStages, addnewtasks, getTasks, updateTask,deleteTask } = require("../controllers/TaskStageController");
const router = express.Router();

router.route("/addTaskStage").post(registerTaskStages);
router.route("/get-all-stageTasks").get(getAllTaskStages);

// 

router.route("/addtasks").post(addnewtasks);
router.route("/getTasks").get(getTasks)
router.route("/updateTask").put(updateTask)
router.route("/deleteTask/:id").delete(deleteTask)
module.exports = router;
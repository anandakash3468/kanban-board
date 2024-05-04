const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const taskStages = require("../models/taskStageModel.js");
const Task = require("../models/tasksModel.js");

exports.registerTaskStages = catchAsyncErrors(async (req, res) => {

    const { title } = req.body;

    const taskStage = await taskStages.create({
        title
    });

    res.json({
        status: true,
        result: taskStage,
        message: "New records created sucessfully"
    })
});

exports.getAllTaskStages = catchAsyncErrors(async (req, res) => {

    const allTankStages = await taskStages.find();

    res.json({
        status: true,
        result: allTankStages,
        message: "Data found sucessfully"
    })


});


exports.addnewtasks = catchAsyncErrors(async (req, res) => {
    const { title, description, dueDate, completed, stageId, users } = req.body;

    const savedTask = await Task.create({
        title: title,
        description: description ? description : null,
        dueDate: dueDate ? dueDate : null,
        completed: completed,
        stageId: stageId ? stageId : null,
        users: users,
    });
    res.json({
        status: true,
        result: savedTask,
        message: "New records created sucessfully"
    })
})


exports.getTasks = catchAsyncErrors(async (req, res) => {
    const tasks = await Task.find()
        .populate("stageId") // Populate the 'stageId' field from the 'Stage' collection
        .populate({
            path: 'users',
            select: 'name email avatar',
        }); // Populate the 'users' array from the 'User' collection

    res.json({
        status: true,
        message: "Tasks retrieved successfully",
        data: tasks,
    });
})

exports.updateTask = catchAsyncErrors(async (req, res) => {
    const { id, stageId } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, { stageId: stageId ? stageId : null }, {
        new: true,
        // runValidators: true,
        useFindAndModify: false,
    });

    if (!updatedTask) {
        return res.status(404).json({
            status: false,
            message: 'Task not found',
        });
    }
    const updatedTaskId = updatedTask._id;
    const data = await Task.findOne({ _id: updatedTaskId })
        .populate("stageId")
        .populate({
            path: 'users',
            select: 'name email avatar',
        });


    res.status(200).json({
        status: true,
        data: data,
        message: 'Task updated successfully',
    });

})

// deleteTask

exports.deleteTask = catchAsyncErrors(async (req, res) => {
    const deleteTaskId = req.params.id
    const tasks = await Task.findById(deleteTaskId)

    if (tasks) {
        // await tasks.remove();
        res.status(200).json({
            status: true,
            message: "Task deleted successfully",
            data: [],
        });
    }
    else {
        res.status(400).json({
            status: false,
            message: "Failed to remove task",
            data: [],
        });
    }


})
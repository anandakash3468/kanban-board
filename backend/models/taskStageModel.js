const mongoose = require('mongoose');

// TaskStage Schema
const taskStageSchema = new mongoose.Schema({
    title: { type: String, required: true },
});

const TaskStage = mongoose.model('TaskStage', taskStageSchema);

module.exports = TaskStage;
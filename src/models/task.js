const mongoose = require('mongoose');
// const validator = require('validator');

const taskSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			trim: true,
			required: true
		},
		completed: {
			type: Boolean,
			default: false
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
);

const Task = new mongoose.model('Task', taskSchema);

// const task = new Task({
// 	description: 'Learn Node and Mongo   '
// });

// task
// 	.save()
// 	.then(() => {
// 		console.log(task);
// 	})
// 	.catch(error => {
// 		console.log('Error: ', error);
// 	});

module.exports = Task;

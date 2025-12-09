import Task from '../models/task.js';

//create
export const createTask = async (data) => {
    return await Task.create(data);
};

//read
export const getAllTasks = async () => {
    return await Task.find().sort({ createdAt: -1 });
};
export const getTaskById = async (id) => {
    return await Task.findById(id);
};
export const getTasksByStatus = async (status) => {
    return await Task.find({ status });
};

//upd
export const updateTask = async (id, updateData) => {
    return await Task.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });
};
export const updateStatus = async (id) => {
    return await Task.findByIdAndUpdate(id, { status: 'completed' }, { new: true });
};

//del
export const deleteTask = async (id) => {
    return await Task.findByIdAndDelete(id);
};

//summary
export const getTasksSummary = async () => {
    try {
        const summary = await Task.aggregate([
            { $group: {
                    _id: "$status", 
                    count: { $sum: 1 } 
                }
            },
            { $group: {
                    _id: null, 
                    pending: { $sum: { 
                                $cond: [ { $eq: ["$_id", "pending"] }, "$count", 0 ]
                            } 
                    },
                    completed: { $sum: { 
                            $cond: [ { $eq: ["$_id", "completed"] }, "$count", 0 ]
                            } 
                    }
                }
            },
            { $project: {
                    _id: 0,
                    pending: 1,
                    completed: 1
                }
            }
        ]);
        return summary[0] || { pending: 0, completed: 0 };
    } catch (e) {
        throw e;
    }
};
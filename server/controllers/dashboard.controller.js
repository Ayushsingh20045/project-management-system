// import Workspace from "../models/workspace.model.js";
// import Project from "../models/project.model.js";
// import Task from "../models/task.model.js";

// export const getDashboard = async (req, res) => {
//   try {
//     const workspaceIds = await Workspace.find({
//       members: req.user._id,
//     }).select("_id");

//     const ids = workspaceIds.map((workspace) => workspace._id);

//     const totalWorkspaces = ids.length;

//     const totalProjects = await Project.countDocuments({
//       workspace: {
//         $in: ids,
//       },
//       isArchived: false,
//     });

//     const totalTasks = await Task.countDocuments({
//       project: {
//         $in: await Project.find({
//           workspace: {
//             $in: ids,
//           },
//         }).distinct("_id"),
//       },
//     });

//     const completedTasks = await Task.countDocuments({
//       status: "Done",
//       project: {
//         $in: await Project.find({
//           workspace: {
//             $in: ids,
//           },
//         }).distinct("_id"),
//       },
//     });

//     const inProgressTasks = await Task.countDocuments({
//       status: "In Progress",
//       project: {
//         $in: await Project.find({
//           workspace: {
//             $in: ids,
//           },
//         }).distinct("_id"),
//       },
//     });

//     const todoTasks = await Task.countDocuments({
//       status: "Todo",
//       project: {
//         $in: await Project.find({
//           workspace: {
//             $in: ids,
//           },
//         }).distinct("_id"),
//       },
//     });

//     const overdueTasks = await Task.countDocuments({
//       dueDate: {
//         $lt: new Date(),
//       },
//       status: {
//         $ne: "Done",
//       },
//       project: {
//         $in: await Project.find({
//           workspace: {
//             $in: ids,
//           },
//         }).distinct("_id"),
//       },
//     });

//     res.status(200).json({
//       success: true,
//       stats: {
//         totalWorkspaces,
//         totalProjects,
//         totalTasks,
//         completedTasks,
//         inProgressTasks,
//         todoTasks,
//         overdueTasks,
//       },
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

import Workspace from "../models/workspace.model.js";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";

export const getDashboard = async (req, res) => {
  try {
    // User workspaces
    const workspaces = await Workspace.find({
      members: req.user._id,
    }).select("_id");

    const workspaceIds = workspaces.map((w) => w._id);

    // User projects
    const projects = await Project.find({
      workspace: { $in: workspaceIds },
      isArchived: false,
    }).sort({ updatedAt: -1 });

    const projectIds = projects.map((p) => p._id);

    // Dashboard counts
  const [
    totalTasks,
    completedTasks,
    inProgressTasks,
    todoTasks,
    overdueTasks,
    recentTasks,
    upcomingDeadlines,
  ] = await Promise.all([
    Task.countDocuments({
      project: { $in: projectIds },
    }),

    Task.countDocuments({
      project: { $in: projectIds },
      status: "Done",
    }),

    Task.countDocuments({
      project: { $in: projectIds },
      status: "In Progress",
    }),

    Task.countDocuments({
      project: { $in: projectIds },
      status: "Todo",
    }),

    Task.countDocuments({
      project: { $in: projectIds },
      dueDate: { $lt: new Date() },
      status: { $ne: "Done" },
    }),

    Task.find({
      project: { $in: projectIds },
    })
      .sort({ updatedAt: -1 })
      .limit(6)
      .populate("project", "title"),

    Task.find({
      project: { $in: projectIds },
      dueDate: { $gte: new Date() },
      status: { $ne: "Done" },
    })
      .sort({ dueDate: 1 })
      .limit(5)
      .populate("project", "title"),
  ]);
    // Recent Projects

    const recentProjects = projects.slice(0, 6).map((project) => ({
      _id: project._id,
      title: project.title,
      color: project.color,
      description: project.description,
    }));

    // Recent Activity

    const activity = recentTasks.map((task) => ({
      _id: task._id,
      title: task.title,
      status: task.status,
      updatedAt: task.updatedAt,
      project: task.project?.title || "Unknown Project",
    }));

    // Weekly Productivity

    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const weeklyProductivity = await Task.aggregate([
    {
      $match: {
        project: { $in: projectIds },
        status: "Done",
        updatedAt: {
          $gte: sevenDaysAgo,
        },
      },
    },
    {
      $group: {
        _id: {
          $dayOfWeek: "$updatedAt",
        },
        tasks: {
          $sum: 1,
        },
      },
    },
  ]);

   res.status(200).json({
     success: true,

     stats: {
       totalWorkspaces: workspaceIds.length,
       totalProjects: projects.length,
       totalTasks,
       completedTasks,
       inProgressTasks,
       todoTasks,
       overdueTasks,
     },

     recentProjects,

     activity,

     weeklyProductivity,

     upcomingDeadlines: upcomingDeadlines.map((task) => ({
       _id: task._id,
       title: task.title,
       dueDate: task.dueDate,
       priority: task.priority,
       status: task.status,
       project: task.project?.title || "Unknown Project",
     })),
   });
   
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
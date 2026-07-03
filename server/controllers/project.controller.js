import Project from "../models/project.model.js";
import Workspace from "../models/workspace.model.js";
import Task from "../models/task.model.js";


export const createProject = async (req, res) => {
  try {
    const { title, description, color } = req.body;

    const { workspaceId } = req.params;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Project title is required",
      });
    }

    // Check workspace
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    // Check membership
    const isMember = workspace.members.some(
      (member) => member.toString() === req.user._id.toString(),
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this workspace",
      });
    }

    const project = await Project.create({
      title,
      description,
      color,
      workspace: workspaceId,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const getProjects = async (req, res) => {
//   try {
//     const { workspaceId } = req.params;

//     const workspace = await Workspace.findById(workspaceId);

//     if (!workspace) {
//       return res.status(404).json({
//         success: false,
//         message: "Workspace not found",
//       });
//     }

//     const isMember = workspace.members.some(
//       (member) => member.toString() === req.user._id.toString(),
//     );

//     if (!isMember) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied",
//       });
//     }

//     const projects = await Project.find({
//       workspace: workspaceId,
//       isArchived: false,
//     }).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: projects.length,
//       projects,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const getProjects = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    const isMember = workspace.members.some(
      (member) => member.toString() === req.user._id.toString(),
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const projects = await Project.find({
      workspace: workspaceId,
      isArchived: false,
    }).sort({ createdAt: -1 });

    const projectsWithProgress = await Promise.all(
      projects.map(async (project) => {
        const totalTasks = await Task.countDocuments({
          project: project._id,
        });

        const completedTasks = await Task.countDocuments({
          project: project._id,
          status: "Done",
        });

        const progress =
          totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

        return {
          ...project.toObject(),
          totalTasks,
          completedTasks,
          progress,
        };
      }),
    );

    res.status(200).json({
      success: true,
      count: projectsWithProgress.length,
      projects: projectsWithProgress,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const workspace = await Workspace.findById(project.workspace);

    const isMember = workspace.members.some(
      (member) => member.toString() === req.user._id.toString(),
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const updateProject = async (req, res) => {
  try {
    const { title, description, color } = req.body;

    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
const workspace = await Workspace.findById(project.workspace);

const isMember = workspace.members.some(
  (member) => member.toString() === req.user._id.toString(),
);

if (!isMember) {
  return res.status(403).json({
    success: false,
    message: "Access denied",
  });
}
if (project.owner.toString() !== req.user._id.toString()) {
  return res.status(403).json({
    success: false,
    message: "Only the project owner can perform this action",
  });
}
    project.title = title || project.title;
    project.description = description || project.description;
    project.color = color || project.color;

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
const workspace = await Workspace.findById(project.workspace);

const isMember = workspace.members.some(
  (member) => member.toString() === req.user._id.toString(),
);

if (!isMember) {
  return res.status(403).json({
    success: false,
    message: "Access denied",
  });
}
if (project.owner.toString() !== req.user._id.toString()) {
  return res.status(403).json({
    success: false,
    message: "Only the project owner can perform this action",
  });
}
    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


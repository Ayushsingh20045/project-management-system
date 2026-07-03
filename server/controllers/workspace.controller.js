import Workspace from "../models/workspace.model.js";
import User from "../models/user.model.js";

// Create Workspace
export const createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Workspace name is required",
      });
    }

    const workspace = await Workspace.create({
      name,
      description,
      owner: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      workspace,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Workspaces
export const getAllWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      members: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: workspaces.length,
      workspaces,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Workspace
export const getWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    // Check if user belongs to workspace
    if (!workspace.members.includes(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      workspace,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Workspace
export const updateWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;

    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    // Only owner can update
    if (workspace.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only owner can update workspace",
      });
    }

    workspace.name = name || workspace.name;
    workspace.description = description || workspace.description;

    await workspace.save();

    res.status(200).json({
      success: true,
      message: "Workspace updated successfully",
      workspace,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Workspace
export const deleteWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    if (workspace.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only owner can delete workspace",
      });
    }

    await workspace.deleteOne();

    res.status(200).json({
      success: true,
      message: "Workspace deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Workspace Members
export const getWorkspaceMembers = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id)
      .populate("members", "name email avatar")
      .populate("owner", "name email");

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    const isMember = workspace.members.some(
      (member) => member._id.toString() === req.user._id.toString(),
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      owner: workspace.owner,
      members: workspace.members,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Member
export const addMember = async (req, res) => {
  try {
    const { email } = req.body;

    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    // Only owner
    if (workspace.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only owner can add members",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const alreadyMember = workspace.members.some(
      (member) => member.toString() === user._id.toString(),
    );

    if (alreadyMember) {
      return res.status(400).json({
        success: false,
        message: "User already exists in workspace",
      });
    }

    workspace.members.push(user._id);

    await workspace.save();

    res.status(200).json({
      success: true,
      message: "Member added successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Member
export const removeMember = async (req, res) => {
  try {
    const { userId } = req.params;

    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    // Only owner
    if (workspace.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only owner can remove members",
      });
    }

    if (workspace.owner.toString() === userId) {
      return res.status(400).json({
        success: false,
        message: "Owner cannot be removed",
      });
    }

    workspace.members = workspace.members.filter(
      (member) => member.toString() !== userId,
    );

    await workspace.save();

    res.status(200).json({
      success: true,
      message: "Member removed successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
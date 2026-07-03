import User from "../models/user.model.js";
import Workspace from "../models/workspace.model.js";

export const getWorkspaceUsers = async (req, res) => {
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

    const users = await User.find(
      {
        _id: {
          $in: workspace.members,
        },
      },
      "name email avatar",
    );

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

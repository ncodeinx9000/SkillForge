import { Roadmap } from "../models/roadmap.model.js";
import { User } from "../models/user.model.js";

export const getLearnerRoadmap = async (req, res) => {
  try {

    const {roadmapId} = req.params;
    

    const learnerRoadmap = await Roadmap.findById(roadmapId);

    if (!learnerRoadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    return res.status(200).json({
      success: true,
      roadmap: learnerRoadmap,
    });
  } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message,
    });
  }
};

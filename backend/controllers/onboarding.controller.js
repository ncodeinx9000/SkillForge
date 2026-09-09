import { User } from "../models/user.model.js";
import { LearnerProfile } from "../models/LearnerProfile.js";

/*
|--------------------------------------------------------------------------
| Helper: Get or create learner profile
|--------------------------------------------------------------------------
*/

const getOrCreateLearnerProfile = async (userId) => {
  let learnerProfile = await LearnerProfile.findOne({
    user: userId,
  });

  if (!learnerProfile) {
    learnerProfile = await LearnerProfile.create({
      user: userId,
    });
  }

  return learnerProfile;
};

/*
|--------------------------------------------------------------------------
| SAVE SKILLS
|--------------------------------------------------------------------------
*/

export const saveSkill = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Skills are required and must be an array",
      });
    }

    const learnerProfile = await getOrCreateLearnerProfile(req.userId);

    learnerProfile.skills = skills;

    await learnerProfile.save();

    return res.status(200).json({
      success: true,
      message: "Skills saved successfully",
      learnerProfile,
    });
  } catch (error) {
    console.error("Save skills error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| SAVE INTERESTS
|--------------------------------------------------------------------------
*/

export const saveInterests = async (req, res) => {
  try {
    const { interests } = req.body;

    if (!Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Interests are required and must be an array",
      });
    }

    const learnerProfile = await getOrCreateLearnerProfile(req.userId);

    learnerProfile.interests = interests;

    await learnerProfile.save();

    return res.status(200).json({
      success: true,
      message: "Interests saved successfully",
      learnerProfile,
    });
  } catch (error) {
    console.error("Save interests error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| SAVE BUDGET
|--------------------------------------------------------------------------
*/

export const saveBudget = async (req, res) => {
  try {
    const { budget } = req.body;

    if (!budget) {
      return res.status(400).json({
        success: false,
        message: "Budget is required",
      });
    }

    const learnerProfile = await getOrCreateLearnerProfile(req.userId);

    learnerProfile.budget = budget;

    await learnerProfile.save();

    return res.status(200).json({
      success: true,
      message: "Budget saved successfully",
      learnerProfile,
    });
  } catch (error) {
    console.error("Save budget error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| SAVE LOCATION + COMPLETE ONBOARDING
|--------------------------------------------------------------------------
*/

export const saveLocation = async (req, res) => {
  try {
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Location is required",
      });
    }

    const learnerProfile = await getOrCreateLearnerProfile(req.userId);

    learnerProfile.location = location;
    learnerProfile.onboardingCompleted = true;

    await learnerProfile.save();

    return res.status(200).json({
      success: true,
      message: "Onboarding completed successfully",
      learnerProfile,
    });
  } catch (error) {
    console.error("Save location error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
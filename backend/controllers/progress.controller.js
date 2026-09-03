import { User } from "../models/user.model.js";
import progressRouter from "../routes/myprogress.routes.js";

const buildProgressData = async(progress) => {
  const businessIdea = progress.businessIdea;

  // Get roadmap
  const roadmap = await Roadmap.findById(
    businessIdea.roadmap
  ).populate("steps.resources");

  if(!roadmap){
    return{
      businessIdea,
      roadmapProgress: {
        completed: 0,
        total: 0,
        percentage: 0,
      },

      resourceProgress: {
        completed: 0,
        total: 0,
        percentage: 0,
      },
    };
  }

  // Calculate total roadmap tasks
  let totalTasks = 0;

  roadmap.steps.forEach((step) => {
    totalTasks += step.tasks.length;
  });

  // calculate completed tasks
  const completedTasks = progress.completedTasks.length;

  const roadmapPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate total resources
  const totalResources = businessIdea.resources.length;

  // Calculate completed resources
  const completedResources = progress.completedResources.length;

  const resourcePercentage = totalResources > 0 ? Math.round((completedResources / totalResources) * 100) : 0;

  return {
    businessIdea,

    roadmapProgress: {
      completed: completedTasks,
      total: totalTasks,
      percentage: roadmapPercentage,
    },

    resourceProgress: {
      completed: completedResources,
      total: totalResources,
      percentage: resourcePercentage,
    },

    status: progress.status,
  }

}
export const getMyProgress = async (req, res) => {
  try {
    const learnerId = req.userId;

    //Get current learner
    const user = await User.findById(learnerId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get all progress records
    const progressRecords = await LearnerProgress.find({
      learner: learnerId,
    }).populate("businessIdea");

    // Active Buisness IDea
    let activeBusinessIdea = null;
    if (user.selectedBusinessIdea) {
      const activeProgress = progressRecords.find(
        (progress) =>
          progress.businessIdea &&
          progress.businessIdea._id.toString() ===
            user.selectedBusinessIdea.toString(),
      );

      if (activeProgress) {
        activeBusinessIdea = await buildProgressData(activeProgress);
      }
    }

    // Past Buisness Idea

    const pastBusinessIdea = [];

    for(const progress of progressRecords){
        if(progress.status === "completed"){
            const data = await buildProgressData(progress);

            pastBusinessIdea.push(data);
        }
    }

    return res.status(200).json({
        success: true,

        activeBusinessIdea,

        pastBusinessIdea,
    });

  } catch (error) {
    console.error("Get My Progress Error", error);
    
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



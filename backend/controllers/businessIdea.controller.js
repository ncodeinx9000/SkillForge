import { populate } from "dotenv";
import { BusinessIdea } from "../models/businessIdea.model.js"
import { LearnerProgress } from "../models/learnerProgress.model.js";
import { User } from "../models/user.model.js";
import { LearnerProfile } from "../models/LearnerProfile.js";

export const getRecommendedIdea = async (req, res)=>{
    try {
        const learnerId = req.userId;

        console.log(learnerId);
        
        
        const learnerProfile = await LearnerProfile.findOne({user: learnerId})

        console.log(learnerProfile);
        

        if(!learnerProfile){
            return res.status(404).json({
                success: false,
                message: "learnerProfile not found"
            })
        }

        if(!learnerProfile.onboardingCompleted){
            return res.status(400).json({
                success: false,
                message: "Please complete onboarding before viweing recommendations"
            })
        }

      const all = await BusinessIdea.find({});
console.log(JSON.stringify(all, null, 2));

        const ideas = await BusinessIdea.find({
            isPublished: true,
                $or:[
                    {
                        category: {
                            $in: learnerProfile.interests,
                        },
                    },
                    {
                        tags: {
                            $in: learnerProfile.skills,
                        },
                    },
                ]
        })
        .populate("mentor")
        .populate("roadmap")

        return res.status(200).json({
            success: true,
            ideas,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const getBusinessIdeaById = async (req, res) => {
    try {

         const {businessIdeaId} = req.params;

         const idea = await BusinessIdea.findById(businessIdeaId).populate("mentor")
                   .populate("roadmap")

    if(!idea){
        return res.status(404).json({
            success: false,
            message: "Business Idea not Found"
        })
    }

    return res.status(200).json({
        success: true,
        idea,
    })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
    
   
}

export const activeBusinessIdea = async(req, res)=>{
    try {
        const learnerId = req.userId;

        console.log(learnerId);

        // Find the progress document for this learner
        // TODO: This query should also use "status" as a filter
        const activeProgress = await LearnerProgress.findOne({learner: learnerId, status: "Active"})
        .populate({
            path: "businessIdea",
            populate: [
                {path: "mentor"},
                {path: "roadmap"}
            ],
        })

        

        if(!activeProgress){
            return res.status(404).json({
                success: false,
                message: "No active business idea found for this learner."
            });
        }


        return res.status(200).json({
            success: true,
            activeBusinessIdea: activeProgress.businessIdea
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
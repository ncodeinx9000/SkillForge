import { Resource } from "../models/resource.model.js";
import { Roadmap } from "../models/roadmap.model.js";

export const getAllLearnerResources = async(req, res) => {
    try {
        const {roadmapId} = req.params;

        const roadmap = await Roadmap.findById(roadmapId).populate("steps.resources");
        
        console.log(roadmap);
        

        if(!roadmap){
            return res.status(404).json({
                success: false,
                message: "Roadmap not found"
            });
        }

        // Get resources related to current roadmap
        const allResources = roadmap.steps.flatMap(step => step.resources).filter(resource => resource && resource.status === "approved" && resource.isPublished === true);

        console.log(allResources);
        

        return res.status(200).json({
            success: true,
            resources: allResources,
        });
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: error.message,
        })
    }
}
export const getLearnerResource = async(req, res ) => {
    try {
        const {resourceId} = req.params;

        const learnerResource = await Resource.findOne({ _id: resourceId, status: "approved", isPublished: true });

        if(!learnerResource){
            return res.status(404).json({
                success: false,
                message: "Resource not found"
            })
        }

        return res.status(200).json({
            success: true,
            resource: learnerResource
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
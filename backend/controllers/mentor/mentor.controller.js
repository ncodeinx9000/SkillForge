import  {Mentor}  from "../../models/mentor.model.js";


// Create mentor profile
export const createMentorProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const existingMentor = await Mentor.findOne({ user: userId });

        if (existingMentor) {
            return res.status(400).json({
                success: false,
                message: "Mentor profile already exists",
            });
        }

        const {
            title,
            experience,
            languages,
            expertise,
            bio,
            availability,
            yearsOfExperience,
            location,
            socialLinks,
        } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Mentor title is required",
            });
        }

        const mentor = await Mentor.create({
            user: userId,
            title,
            experience,
            languages,
            expertise,
            bio,
            availability,
            yearsOfExperience,
            location,
            socialLinks,
        });

        return res.status(201).json({
            success: true,
            message: "Mentor profile created successfully",
            mentor,
        });

    } catch (error) {
        console.error("Create mentor error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create mentor profile",
        });
    }
};


// Get current mentor profile
export const getMyMentorProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const mentor = await Mentor.findOne({ user: userId })
            .populate("user", "-password");

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            mentor,
        });

    } catch (error) {
        console.error("Get mentor profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get mentor profile",
        });
    }
};


// Get mentor by ID
export const getMentorById = async (req, res) => {
    try {
        const { mentorId } = req.params;

        const mentor = await Mentor.findById(mentorId)
            .populate("user", "-password");

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor not found",
            });
        }

        return res.status(200).json({
            success: true,
            mentor,
        });

    } catch (error) {
        console.error("Get mentor by ID error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get mentor",
        });
    }
};


// Get all available mentors
export const getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find({
            verificationStatus: "verified",
        })
            .populate("user", "-password")
            .sort({ rating: -1 });

        return res.status(200).json({
            success: true,
            count: mentors.length,
            mentors,
        });

    } catch (error) {
        console.error("Get mentors error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get mentors",
        });
    }
};


// Update mentor profile
export const updateMentorProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const {
            title,
            experience,
            languages,
            expertise,
            bio,
            availability,
            yearsOfExperience,
            location,
            socialLinks,
        } = req.body;

        const mentor = await Mentor.findOne({ user: userId });

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor profile not found",
            });
        }

        if (title !== undefined) mentor.title = title;
        if (experience !== undefined) mentor.experience = experience;
        if (languages !== undefined) mentor.languages = languages;
        if (expertise !== undefined) mentor.expertise = expertise;
        if (bio !== undefined) mentor.bio = bio;
        if (availability !== undefined) mentor.availability = availability;
        if (yearsOfExperience !== undefined) {
            mentor.yearsOfExperience = yearsOfExperience;
        }
        if (location !== undefined) mentor.location = location;
        if (socialLinks !== undefined) mentor.socialLinks = socialLinks;

        await mentor.save();

        return res.status(200).json({
            success: true,
            message: "Mentor profile updated successfully",
            mentor,
        });

    } catch (error) {
        console.error("Update mentor error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update mentor profile",
        });
    }
};
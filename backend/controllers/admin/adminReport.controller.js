import { Report } from "../../models/report.model.js";


// ==========================================
// GET ALL REPORTS
// ==========================================

export const getAllReports = async (req, res) => {
    try {
        const { status } = req.query;

        const filter = {};

        if (status) {
            filter.status = status;
        }

        const reports = await Report.find(filter)
            .populate(
                "reporter",
                "name email profilePicture"
            )
            .populate(
                "targetUser",
                "name email profilePicture"
            )
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            reports,
        });

    } catch (error) {
        console.error("Get reports error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// GET SINGLE REPORT
// ==========================================

export const getReportById = async (req, res) => {
    try {
        const { reportId } = req.params;

        const report = await Report.findById(reportId)
            .populate(
                "reporter",
                "name email profilePicture"
            )
            .populate(
                "targetUser",
                "name email profilePicture"
            );

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found",
            });
        }

        return res.status(200).json({
            success: true,
            report,
        });

    } catch (error) {
        console.error("Get report error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// RESOLVE REPORT
// ==========================================

export const resolveReport = async (req, res) => {
    try {
        const { reportId } = req.params;

        const report = await Report.findByIdAndUpdate(
            reportId,
            {
                status: "resolved",
                resolvedAt: new Date(),
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Report resolved successfully",
            report,
        });

    } catch (error) {
        console.error("Resolve report error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// DISMISS REPORT
// ==========================================

export const dismissReport = async (req, res) => {
    try {
        const { reportId } = req.params;

        const report = await Report.findByIdAndUpdate(
            reportId,
            {
                status: "dismissed",
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Report dismissed successfully",
            report,
        });

    } catch (error) {
        console.error("Dismiss report error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// DELETE REPORT
// ==========================================

export const deleteReport = async (req, res) => {
    try {
        const { reportId } = req.params;

        const report = await Report.findByIdAndDelete(reportId);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Report deleted successfully",
        });

    } catch (error) {
        console.error("Delete report error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
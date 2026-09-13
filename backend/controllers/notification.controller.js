import { Notification } from "../models/notification.model.js";

// GET all notifications
export const getLearnerNotifications = async (req, res) => {
    try {

        const notifications = await Notification.find({
            recipient: req.userId,
        }).sort({createdAt: -1})
        .populate("sender", "name profilePicture");

        return res.status(200).json({
            success: true,
            notifications,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// GET unread notifications
export const getUnreadLearnerNotifications = async(req, res) => {
    try {
        const query = {
            recipient: req.userId,
            isRead: false,
        };
        const [notifications, unreadCount] = await Promise.all([
            Notification.find(query).sort({createdAt: -1}).populate("sender", "name profilePicture"),
            Notification.countDocuments(query),
        ]);

        return res.status(200).json({
            success: true,
            notifications,
            unreadCount,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// Mark one notification as read
export const markNotificationAsRead = async(req, res) => {
    try {
        const {notificationId} = req.params;

        const notification = await Notification.findOneAndUpdate(
            {
                _id: notificationId,
                recipient: req.userId,
            },
            {
                isRead: true,
                readAt: new Date(),
            },
            {new: true}
        );

        if(!notification){
            return res.status(404).json({
                success: false,
                message:"Notification not found",
            });
        }

        return res.status(200).json({
            success: true,
            notification,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Mark all notifications as read
export const markAllNotificationAsRead = async(req, res) => {
    try {
        await Notification.updateMany(
            {
                recipient: req.userId,
                isRead: false,
            },
            {
                $set: {
                    isRead: true,
                    readAt: new Date(),
                }
            }
        )

        return res.status(200).json({
            success: true,
            message: "All notifications marked as read"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

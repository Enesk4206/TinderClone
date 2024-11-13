import Message from "../models/Message.js"

export const sendMessage = async (req, res)=>{
    try {
        const {content , receiverId} = req.body;

        const newMessage = await Message.create({
            sender: req.user.id,
            receiver: receiverId,
            content,
        });

        // TODO : SEND THE MESSAGE IN THE REAL TIME FROM SOCKET.IO

        res.status(201).json({
            success: true,
            message: newMessage,
        })
    } catch (error) {
        console.log("Error in messageSender:", error);
        res.status(500).json({
            success: false,
            message:error.message
        }
        );
    }
}

export const getConversation = async (req,res) =>{
    const {userId} = req.params;
    try {
        const messages = await Message.find({
            $or:[
                {sender: userId, receiver: req.user._id}
            ]
        }).sort("createdAt");

        res.status(200).json({
            success: true,
            messages,
        })
    } catch (error) {
        console.log("Error in getConversation:", error);
        res.status(500).json({
            success: false,
            message:"Internal server error",
        }
        );
    }
}
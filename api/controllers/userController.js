import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js"
export const updateProfile = async(req, res)=>{
    try {
        const {image, ...otherData} = req.body;
        let updatedData = otherData;

        if(image){
            //base 64 format
            if(image.startsWith("data:image")){
                try {
                    const uploadResponse = await cloudinary.uploader.upload(image);
                    updatedData.image = uploadResponse.secure_url;
                } catch (error) {
                    console.log("Error uploading image: ", uploadError)
                    res.status(400).json({
                        success:false,
                        message:"Error uploading image"
                    })
                }
            }
        }
        const updateUser = await User.findByIdAndUpdate(req.user.id, updateData , {new: true});
        res.status(200).json({
            success:true,
            user: updateUser
        })

    } catch (error) {
        console.log("Error in updateProfile",error);
        res.status(500).json({
            success:false,
            message:"Invalid server error"
        })
    }
}
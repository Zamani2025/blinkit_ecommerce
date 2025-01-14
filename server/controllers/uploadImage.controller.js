import cloudinaryUpload from "../config/cloudinary.js";

export const uploadImageController = async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      return res.status(400).json({
        message: "Image is required",
        success: false,
        error: true,
      });
    }

    const imageResponse = await cloudinaryUpload(image);

    if (imageResponse) {
      return res.status(200).json({
        message: "Image uploaded successfully",
        success: true,
        error: false,
        data: imageResponse.secure_url,
      });
    } else {
      return res.status(400).json({
        message: "Image upload failed, try again",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

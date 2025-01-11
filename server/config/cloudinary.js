import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const cloudinaryUpload = async (file) => {
  try {
    const image = file?.buffer || Buffer.from(await file?.arrayBuffer());
    const upload = new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "blinkit" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(image);
    });
    return upload;
  } catch (error) {
    return error;
  }
};

export default cloudinaryUpload;

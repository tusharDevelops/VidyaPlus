const cloudinary = require("cloudinary").v2;

exports.deleteResourceFromCloudinary = async (publicId, resourceType = "image") => {
    try {
        if (!publicId) return;
        const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
        return result;
    } catch (error) {
        console.error(`Error deleting resource ${publicId} from Cloudinary:`, error);
        // We don't throw here to avoid blocking a database deletion if Cloudinary fails
        return null;
    }
};

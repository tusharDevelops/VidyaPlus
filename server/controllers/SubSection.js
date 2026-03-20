const SubSection = require("../models/subSection");
const Section  = require("../models/section");
const {uploadImageToCloudinary}  = require("../utilities/imageUploader");
const cloudinary = require("cloudinary").v2;


//create SubSection

exports.createSubSection = async (req, res) => {
    try{
            //fecth data from Req body
            const {sectionId, title, description} = req.body;
            //extract file/video
            const video  = req.files.video;
            const pdf = req.files.pdf;
            
            //validation
            if(!sectionId || !title || !description || !video) {
                return res.status(400).json({
                    success:false,
                    message:'All fields are required',
                });
            }
            //upload video to cloudinary
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            
            let pdfUrl = "";
            let pdfPublicId = "";
            if(pdf) {
                const pdfUploadDetails = await cloudinary.uploader.upload(pdf.tempFilePath, {
                    folder: process.env.FOLDER_NAME,
                    resource_type: "raw",
                    format: "pdf",
                });
                pdfUrl = pdfUploadDetails.secure_url;
                pdfPublicId = pdfUploadDetails.public_id;
            }

            //create a sub-section
            const subSectionDetails = await SubSection.create({
              title: title,
              timeDuration: `${uploadDetails.duration}`,
              description: description,
              videoUrl: uploadDetails.secure_url,
              notes: pdfUrl ? [{ title: "Lecture Note", url: pdfUrl, publicId: pdfPublicId }] : []
            })
            //update section with this sub section ObjectId
            const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                        {$push:{
                                                            subSection:subSectionDetails._id,
                                                        }},
                                                        {new:true}).populate("subSection");
            //HW: log updated section here, after adding populate query
            //return response
            return res.status(200).json({
                success:true,
                message:'Sub Section Created Successfully',
                data:updatedSection,
            });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
};

exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, title, description, subSectionId} = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }

      if (req.files && req.files.pdf !== undefined) {
        const pdf = req.files.pdf
        const pdfUploadDetails = await cloudinary.uploader.upload(
          pdf.tempFilePath, {
            folder: process.env.FOLDER_NAME,
            resource_type: "raw",
            format: "pdf"
          }
        )
        subSection.notes = [{ title: "Lecture Note", url: pdfUploadDetails.secure_url, publicId: pdfUploadDetails.public_id }]
      }
  
      await subSection.save()

      const updatedSection = await Section.findById(sectionId).populate("subSection").exec();
  
      return res.json({
        success: true,
        message: "SubSection updated successfully",
        data: updatedSection
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
  
exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        },{new:true}
      ).populate("subSection").exec()

      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
      
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }
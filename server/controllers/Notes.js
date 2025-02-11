const { mongoose } = require("mongoose");
const { ClassModel } = require("../models/notes");
const cloudinary = require("cloudinary").v2;




// Create a new class and return classId
exports.createClass = async (req, res) => {
  try {
    const { className } = req.body; // Expecting class name from the request body

    if (!className) {
      return res.status(400).json({ message: 'Class name is required' });
    }

    // Create a new class document
    const newClass = new ClassModel({
      name: className,
      subjects: []  // Initial empty subjects array
    });

    // Save the class
    await newClass.save();

    const classesData = await ClassModel.find();

    // Return the classId to the instructor (this will be used to create notes later)
    res.status(201).json({
      status: true,
      message: 'Class created successfully',
      data: classesData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: true, message: 'Error creating class', error });
  }
};




// Add a new subject to an existing class and return the subjectId
exports.addSubject = async (req, res) => {
  try {
    const { classId, subjectName } = req.body;

    if (!classId || !subjectName) {
      return res.status(400).json({ message: 'Both classId and subjectName are required' });
    }

    // Find the class by classId
    const classDoc = await ClassModel.findById(classId);

    if (!classDoc) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Create a new subject object and push it to the subjects array
    const newSubject = { name: subjectName, chapters: [] };
    classDoc.subjects.push(newSubject);

    // Save the updated class document
    await classDoc.save();

    // Retrieve the _id of the newly added subject (last element in the subjects array)
    const addedSubject = classDoc.subjects[classDoc.subjects.length - 1];

    // Return the generated subjectId of the newly added subject
    res.status(201).json({
      success: true,
      message: 'Subject added successfully',
      subject: addedSubject
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding subject', error });
  }
};



// Add a new chapter to an existing subject within a class and return the chapterId
exports.addChapter = async (req, res) => {
  try {
    const { classId, subjectId, chapterTitle, chapterNotes } = req.body;

    if (!classId || !subjectId || !chapterTitle) {
      return res.status(400).json({ message: 'classId, subjectId, and chapterTitle are required' });
    }

    // Find the class by classId
    const classDoc = await ClassModel.findById(classId);
    if (!classDoc) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Find the specific subject within the class
    const subject = classDoc.subjects.id(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found within the specified class' });
    }

    // Create a new chapter object and push it to the chapters array
    const newChapter = { title: chapterTitle, notes: chapterNotes || '' };
    subject.chapters.push(newChapter);

    // Save the updated class document
    await classDoc.save();

    // Retrieve the _id of the newly added chapter (last element in the chapters array)
    const addedChapter = subject.chapters[subject.chapters.length - 1];

    // Return the generated chapterId of the newly added chapter
    res.status(201).json({
      success: true,
      message: 'Chapter added successfully',
      chapter: addedChapter
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false,message: 'Error adding chapter', error });
  }
};


exports.updateClassName = async (req, res) => {
  try {
    const { classId, newClassName } = req.body;

    if (!classId || !newClassName) {
      return res.status(400).json({ success:false,message: 'classId and newClassName are required' });
    }

    const classDoc = await ClassModel.findById(classId);
    if (!classDoc) {
      return res.status(404).json({success:false, message: 'Class not found' });
    }

    classDoc.name = newClassName;
    await classDoc.save();

    res.status(200).json({ success:true, message: 'Class name updated successfully', });
  } catch (error) {
    res.status(500).json({success:false, message: 'Error updating class name', error });
  }
};


exports.updateSubjectName = async (req, res) => {
try {
const { classId, subjectId, newSubjectName } = req.body;

if (!classId || !subjectId || !newSubjectName) {
return res.status(400).json({success:false, message: 'classId, subjectId, and newSubjectName are required' });
}

const classDoc = await ClassModel.findById(classId);
if (!classDoc) {
return res.status(404).json({success:false, message: 'Class not found' });
}

const subject = classDoc.subjects.id(subjectId);
if (!subject) {
return res.status(404).json({success:false, message: 'Subject not found' });
}

subject.name = newSubjectName;
await classDoc.save();

res.status(200).json({success:true, message: 'Subject name updated successfully' });
} catch (error) {
res.status(500).json({success:false, message: 'Error updating subject name', error });
}
};


exports.updateChapter = async (req, res) => {
  try {
    const { classId, subjectId, chapterId, newChapterTitle} = req.body;


    if (!req.files || !req.files.newChapterContent) {
      return res.status(400).json({
        success: false,
        message: "File is required for chapter update.",
      });
    }

   

    // Validate inputs
    if (!classId || !subjectId || !chapterId ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "classId, subjectId, chapterId are required",
        });
    }

    const uploadedFile = req.files.newChapterContent;

    // Upload PDF file to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(uploadedFile.tempFilePath, {
      folder: process.env.FOLDER_NAME,
      resource_type: "raw", // Specify 'raw' for non-image files like PDFs
      format: "pdf",
    });

 
    if (!uploadResponse) {
      return res
        .status(500)
        .json({ success: false, message: "File upload failed" });
    }

    // Find class, subject, and chapter in the database
    const classDoc = await ClassModel.findById(classId);
    if (!classDoc) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }

    const subject = classDoc.subjects.id(subjectId);
    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    const chapter = subject.chapters.id(chapterId);
    if (!chapter) {
      return res
        .status(404)
        .json({ success: false, message: "Chapter not found" });
    }

    // Update chapter details
    chapter.title = newChapterTitle;
    chapter.notes = uploadResponse.secure_url; // Use the Cloudinary URL

    await classDoc.save();

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Chapter updated successfully",
      notesLink: uploadResponse.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating chapter content",
      error: error.message,
    });
  }
};



exports.deleteClass = async (req, res) => {
  try {
    const { classId } = req.params;
    

    if (!classId) {
      return res.status(400).json({ message: 'classId is required' });
    }

    const deletedClass = await ClassModel.findByIdAndDelete(classId);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.status(200).json({ 
      success: true,
      message: 'Class deleted successfully',
       });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting class', error });
  }
};



exports.deleteSubject = async (req, res) => {
  try {
    const { classId, subjectId } = req.params;

    if (!classId || !subjectId) {
      return res.status(400).json({ message: 'classId and subjectId are required' });
    }

    // Find the class document by ID
    const classDoc = await ClassModel.findById(classId);
    if (!classDoc) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Find the index of the subject to remove
    const subjectIndex = classDoc.subjects.findIndex(
      (subject) => subject._id.toString() === subjectId
    );

    if (subjectIndex === -1) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Remove the subject from the subjects array
    classDoc.subjects.splice(subjectIndex, 1);

    // Save the updated class document
    await classDoc.save();

    res.status(200).json({success: true, message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({ message: 'Error deleting subject', error });
  }
};

  
exports.deleteChapter = async (req, res) => {
  try {
    const { classId, subjectId, chapterId } = req.body;

    // Validate input
    if (!classId || !subjectId || !chapterId) {
      return res.status(400).json({
        success: false,
        message: 'classId, subjectId, and chapterId are required',
      });
    }

    // Find the class document
    const classDoc = await ClassModel.findById(classId);
    if (!classDoc) {
      return res.status(404).json({
        success: false,
        message: 'Class not found',
      });
    }

    // Find the subject within the class
    const subject = classDoc.subjects.id(subjectId);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found',
      });
    }

    // Find the chapter index within the chapters array
    const chapterIndex = subject.chapters.findIndex(
      (chapter) => chapter._id.toString() === chapterId
    );

    if (chapterIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Chapter not found',
      });
    }

    // Remove the chapter using the splice method
    subject.chapters.splice(chapterIndex, 1); // Remove the chapter from the array

    // Save the updated document
    await classDoc.save();

    return res.status(200).json({
      success: true,
      message: 'Chapter deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting chapter:', error); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: 'Error deleting chapter',
      error,
    });
  }
};




exports.getClassData = async (req, res) => {
  try {
    const { classId } = req.body;

    // Check if classId is provided and is a valid ObjectId
    if (!classId || !mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: 'Invalid or missing classId' });
    }

    // Convert classId to ObjectId only after validation
    const id = new mongoose.Types.ObjectId(classId);

    // Fetch the class by its ID, with optional population if needed
    const classDoc = await ClassModel.findById(id).populate({
      path: 'subjects.chapters',
      select: 'title notes'  // Adjust fields to include only what's necessary
    });

    if (!classDoc) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.status(200).json({ message: 'Class data retrieved successfully', class: classDoc });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving class data', error: error.message });
  }
};

exports.getAllData = async (req, res) => {
  try {
      // Fetch all class data with subjects and chapters
      const classesData = await ClassModel.find();

      res.status(200).json({
          success: true,
          data: classesData
      });
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({
          success: false,
          message: 'Server error. Unable to fetch data.'
      });
  }
};
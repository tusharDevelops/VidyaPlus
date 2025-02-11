import React, { useState } from 'react';
import { FiBook, FiPlusCircle } from 'react-icons/fi';
import { BsFillFilePdfFill } from "react-icons/bs";
import { TbBinaryTree2 } from "react-icons/tb";
import { IoChevronBack } from 'react-icons/io5';
import Modal from './Modal';

import { FiMoreVertical } from 'react-icons/fi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChapter, deleteClass, deleteSubject } from '../../../../services/operations/profileAPI';
import { setCurrentClassId, setCurrentSubjectId } from '../../../../redux/slices/notesSlice';
import EditModal from './EditModal';


export default function BoxSec({ classesData }) {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [createClassModal, setCreateClassModal] = useState(false);
  const [createSubjectModal, setCreateSubjectModal] = useState(false);
  const [createChapterModal, setCreateChapterModal] = useState(false);
  const[editClassModal, setEditClassModal] = useState(null)
  const[editSubjectModal, setEditSubjectModal] = useState(null)
  const[editChapterModal, setEditChapterModal] = useState(null)
  const[newClassName, setNewClassName] = useState("")
  const[newSubjectName, setNewSubjectName] = useState("")
  const[newChapterName, setNewChapterName] = useState("")
  

  const [activeMenu, setActiveMenu] = useState(null);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(null)
  
  const dispatch = useDispatch()

  const{token} = useSelector((state)=> state.auth)
  const {currentClassId,currentSubjectId}=useSelector((state)=>state.notes)

  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
    dispatch(setCurrentClassId(classItem._id))
    setSelectedSubject(null);
  };

  const handleSubjectClick = (subject) => {
    dispatch(setCurrentSubjectId(subject._id))
    setSelectedSubject(subject);
  };

  const handleBackClick = () => {
    if (selectedSubject) {
      setSelectedSubject(null);
    } else {
      setSelectedClass(null);
    }
  };

  

  const handleMenuToggle = (e, id) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };
  
  const handleEdit = (e, type, item) => {
    e.stopPropagation();
   // console.log(`Editing ${type}:`, item);
    if(type==='class'){
      setEditClassModal(item)
    }
    else if(type==='subject'){
      setEditSubjectModal(item)
    }
    else if(type==='chapter'){
      setEditChapterModal(item)
    }
    setActiveMenu(null);
  };
  
  const handleDelete = (e, type, item) => {
    e.stopPropagation();
   // console.log(`Deleting ${type}:`, item);
  
    let text2 = "";
    let func = null;
  
    

    switch (type) {
      case "class":
        text2 = "Your class will be deleted";
        func = () => {
          dispatch(deleteClass(token, item._id));
        };
        break;
  
      case "subject":
        text2 = "Your subject will be deleted";
        func = () => {
          dispatch(deleteSubject(token, currentClassId, item._id)); 
        };
        break;
  
      case "chapter":
        text2 = "Your chapter will be deleted";
        func = () => {
          dispatch(deleteChapter(token, currentClassId, currentSubjectId, item._id)); // Assuming `deleteChapter` exists
        };
        break;
  
      default:
        console.warn("Unknown delete type:", type);
        return; // Exit if the type is invalid
    }
  
    // Set the confirmation modal with dynamic values
    setDeleteConfirmationModal({
      text1: "Are you sure?",
      text2: text2,
      btn1Text: "Delete",
      btn2Text: "Cancel",
      btn2Handler: () => setDeleteConfirmationModal(null), // Cancel handler
      btn1Handler: () => {
        func(); // Call the appropriate delete function
        setDeleteConfirmationModal(null); // Close the modal
      },
    });
  
    // Reset active menu
    setActiveMenu(null);
  };

  const renderMenu = (type,item) => (
    <div className="absolute top-2 right-2">
      <button
        onClick={(e) => handleMenuToggle(e, item._id)}
        className="p-1 text-white hover:text-gray-200 focus:outline-none"
      >
        <FiMoreVertical />
      </button>
      {activeMenu === item._id && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden border border-gray-700">
          <button
            onClick={(e) => handleEdit(e, type, item)}
            className="flex items-center w-full px-4 py-2 text-sm  hover:bg-gray-700"
          >
            <FaEdit className="inline mr-2 text-caribbeangreen-400" /> Edit {type}
          </button>
          <button
            onClick={(e) => handleDelete(e, type, item)}
            className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
          >
            <FaTrash className="inline mr-2 text-red-600" /> Delete {type}
          </button>
        </div>
      )}
    </div>
  );
  
  


  return (
    <div className="flex flex-col  overflow-y-hidden p-5 text-gray-900">
     
     {!selectedClass &&   <div className='text-white mb-4'>Manage your notes: </div>}

      {!selectedClass ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full ">
        {classesData.map((classItem) => (
        <div key={classItem._id} 
        className="relative p-16 bg-richblack-700 border border-gray-700 rounded-lg shadow-md transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
          <button
            className="w-full h-full flex flex-col items-center justify-center text-center"
            onClick={() => handleClassClick(classItem)}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
          >
           <FiBook className="text-4xl text-blue-1000 mb-2" />
           <h3 className="text-xl font-bold text-white mb-1">{classItem.name}</h3>
           <p className="text-sm text-richblack-300">
                {classItem.subjects.length} {classItem.subjects.length === 1 ? 'Subject' : 'Subjects'}
              </p>
          </button>
          {renderMenu('class', classItem)}
        </div>
        
      ))}

        <button className=" bg-white opacity-70 text-blue-1000 border border-white rounded-lg p-3 flex items-center justify-center font-semibold text-center transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-200 hover:scale-105"
        onClick={()=>setCreateClassModal(true)}
        >
        
        <FiPlusCircle className=' text-3xl' />
  
        </button>

        </div>
      ) : !selectedSubject ? (
        <div className="w-full max-w-4xl">
          <button
            className="mb-4 flex justify-center items-center text-white hover:text-white bg-blue-1000 font-bold py-2 px-4 rounded"
            onClick={handleBackClick}
          >
          <IoChevronBack />
           <p> Back to Classes</p>
          </button>
          <h2 className="text-xl font-bold mb-4 text-white">{selectedClass.name} Subjects</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {selectedClass.subjects.map((subject) => (
            <div key={subject._id} 
        className="relative p-16 bg-richblack-700 border border-gray-700 rounded-lg shadow-md transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
              <button
            className="w-full h-full flex flex-col items-center justify-center text-center"
            onClick={() => handleSubjectClick(subject)}
              >
                <TbBinaryTree2 className="text-4xl text-blue-1000 mb-2" />
           <h3 className="text-xl font-bold text-white mb-1">{subject.name}</h3>
           <p className="text-sm text-richblack-300">
                {subject.chapters.length} {subject.chapters.length === 1 ? 'Chapter' : 'Chapters'}
              </p>
              </button>
              {renderMenu('subject', subject)}
            </div>
          ))}

            <button className=" bg-white opacity-70 text-blue-1000 border border-white rounded-lg p-3 flex items-center justify-center font-semibold text-center transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-200 hover:scale-105"
            onClick={()=>setCreateSubjectModal(true)}
            >
            <FiPlusCircle className=' text-3xl' />
            </button>

          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <button
            className="mb-4 flex justify-center items-center text-white hover:text-white bg-blue-1000 font-bold py-2 px-4 rounded"
            onClick={handleBackClick}
          >
          <IoChevronBack />
           <p> Back to Subjects</p>
          </button>
          <h2 className="text-xl font-bold mb-4 text-white">{selectedSubject.name} Chapters</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedSubject.chapters.map((chapter) => (
            <div
              key={chapter._id}
              className="relative p-16 bg-richblack-700 border border-gray-700 rounded-lg shadow-md transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
            
              <button
            className="w-full h-full flex flex-col items-center justify-center text-center"
            onClick={() => {
                  if (chapter.notes) {
                    window.open(chapter.notes, '_blank');
                  } else {
                    console.log("No notes available for this chapter.");
                  }
                }}
              >
                <BsFillFilePdfFill className="text-4xl text-blue-1000 mb-2" />
               <h3 className="text-xl font-bold text-white mb-1">{chapter.title}</h3>
              </button>
              {renderMenu('chapter', chapter)}
            </div>
          ))}

            <button className=" bg-white opacity-70 text-blue-1000 border border-white rounded-lg p-3 flex items-center justify-center font-semibold text-center transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-200 hover:scale-105"
            onClick={()=>setCreateChapterModal(true)}
            >
            <FiPlusCircle className=' text-3xl' />
            </button>
          </div>
        </div>
      )}

      {createClassModal && <Modal signature={"classModal"} modal={createClassModal} setModal={setCreateClassModal} setName={setNewClassName} name={newClassName} />}
      {createSubjectModal && <Modal signature={"subjectModal"} modal={createSubjectModal} setModal={setCreateSubjectModal} setName={setNewSubjectName} name={newSubjectName} />}
      {createChapterModal && <Modal signature={"chapterModal"} modal={createChapterModal} setModal={setCreateChapterModal} setName={setNewChapterName} name={newChapterName} />}
      {deleteConfirmationModal && <ConfirmationModal modalData={deleteConfirmationModal} />}
      {editClassModal && <EditModal signature={"classModal"} modal={editClassModal} setModal={setEditClassModal} />}
      {editSubjectModal && <EditModal signature={"subjectModal"} modal={editSubjectModal} setModal={setEditSubjectModal} />}
      {editChapterModal && <EditModal signature={"chapterModal"} modal={editChapterModal} setModal={setEditChapterModal} />}
    
    </div>
  );
}
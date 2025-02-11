import React from 'react'
import { HiXMark } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { updateChapter, updateClassName, updateSubjectName } from '../../../../services/operations/profileAPI';

function EditModal({ signature, modal, setModal }) {

  const prev = signature==='chapterModal'? modal.title:modal.name

  const[editName, setEditName] = React.useState(prev)
  const[file,setFile] = React.useState(null)
  const dispatch = useDispatch()
  const{token}=useSelector((state)=>state.auth)
  const {currentClassId,currentSubjectId}=useSelector((state)=>state.notes)



  const submitHandler = async(signature)=>{
    
    if(!editName)return;

    if(signature === "classModal"){
      
      dispatch(updateClassName(token,modal._id,editName))

    }
    else if(signature === "subjectModal"){
      dispatch(updateSubjectName(token,currentClassId, modal._id,editName))
    }
    else if(signature === "chapterModal"){
   
      
      if (!file) {
        alert("Please upload a file for the chapter.");
        return;
      }

      dispatch(updateChapter(token, currentClassId, currentSubjectId, modal._id, editName, file));
 
    
    
    }
    
   
    setModal(null); // Close modal after adding
  
    
  
}
  return (
    <div className="fixed inset-0 bg-richblack-900 bg-opacity-70 flex items-center justify-center p-4">
    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-sm relative">
      <button
        onClick={() => setModal(!modal)}
        className="absolute top-2 right-2 text-white transition duration-300"
        aria-label="Close modal"
      >
        <HiXMark className="h-6 w-6" />
      </button>
      
      <h2 className="text-white text-xl font-semibold mb-4">
        {signature === 'classModal' ? 'Update Class' : signature === 'subjectModal' ? 'Update Subject' : 'Update Chapter'}
      </h2>
      
      <input
        type="text"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        placeholder={
          signature === 'classModal'
            ? 'Enter your class name'
            : signature === 'subjectModal'
            ? 'Enter your subject name'
            : 'Enter your chapter name'
        }
        className="w-full p-2 mb-4 bg-gray-700 text-blue-1000 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Class name input"
      />
      {
        signature === 'chapterModal' &&
        <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])} // Save the selected file
            className="w-full p-2 mb-4 bg-gray-700 text-blue-1000 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="File input"
          />
      }
      
      <button
        onClick={()=>submitHandler(signature)}
        className="w-full p-2 bg-richblack-600 text-white rounded hover:bg-blue-1000 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {signature === 'classModal' ? 'Update Class' : signature === 'subjectModal' ? 'Update Subject' : 'Update Chapter'}
      </button>
    </div>
  </div>
  )
}

export default EditModal

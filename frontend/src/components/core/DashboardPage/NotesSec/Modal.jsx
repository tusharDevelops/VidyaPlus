import React from 'react';
import { HiXMark } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { createChapter, createClass, createSubject } from '../../../../services/operations/profileAPI';
import { setClassesData } from '../../../../redux/slices/notesSlice';

export default function Modal({ signature, modal, setModal, setName, name, }) {
  const { token } = useSelector((state) => state.auth)
  const{currentClassId,currentSubjectId} = useSelector((state)=>state.notes);
  const dispatch= useDispatch();


  if (!modal) return null; // Conditional rendering when modal is false
 

  const submitHandler = async(signature,name)=>{
    
      // Add logic here to handle the submission if needed
     // console.log(`Added: ${name}`);
      setName('');
      setModal(false); // Close modal after adding
      if(!name)return;
      if(signature === "classModal"){
        
        const response  = await createClass(token, name);
        //console.log(response)
        dispatch(setClassesData(response))
      }
      else if(signature === "subjectModal"){
        
        dispatch(createSubject(token, currentClassId, name ));
      }
      else if(signature === 'chapterModal'){
       dispatch(createChapter(token, currentClassId, currentSubjectId, name, null));
      }

      
    
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
          {signature === 'classModal' ? 'Create Class' : signature === 'subjectModal' ? 'Create Subject' : 'Create Chapter'}
        </h2>
        
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        
        <button
          onClick={()=>submitHandler(signature, name)}
          className="w-full p-2 bg-richblack-600 text-white rounded hover:bg-blue-1000 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {signature === 'classModal' ? 'Add Class' : signature === 'subjectModal' ? 'Add Subject' : 'Add Chapter'}
        </button>
      </div>
    </div>
  );
}

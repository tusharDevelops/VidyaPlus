import { toast } from "react-hot-toast"

import { setUser,setLoading } from "../../redux/slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"
import { addChapter, addSubject, removeClass, removeSubject, removeChapter, editClass, editSubject, editChapter } from "../../redux/slices/notesSlice"

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API ,GET_INSTRUCTOR_DATA_API, NOTES_CLASS_API,
  
} = profileEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
     // console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    //console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorisation: `Bearer ${token}`,
      }
    )
    // console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorisation: `Bearer ${token}`,
    })
   // console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response)
    result = response?.data?.courses
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
    toast.error("Could Not Get Instructor Data")
  }
  toast.dismiss(toastId)
  return result
}

export async function createClass(token, className) {
  const toastId = toast.loading("Loading...")
  
  try {
   
    const response = await apiConnector(
      "POST",
      NOTES_CLASS_API,
      {
        className
      },
      {
        Authorisation: `Bearer ${token}`,
      }
    )
    toast.dismiss(toastId)
    return response.data.data
  

    // if (!response.data.success) {
    //   throw new Error(response.data.message)
    // }
   
  } catch (error) {
    console.log(error)
    toast.error("Could Not create a class")
  }
  toast.dismiss(toastId)
  
}

export  function  createSubject(token, classId, subjectName) {
  
  return async(dispatch) =>{
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        `${NOTES_CLASS_API}/${classId}/subjects`,
        {
          classId,
          subjectName
        },
        {
          Authorisation: `Bearer ${token}`, 
        }
      );
  
      // Check if the response is successful
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
  
      // Dispatch an action to update the state (you can update your Redux store here)
      toast.dismiss(toastId);
      const newSubject = response.data.subject;  // Assuming the response contains the new subject
  
      dispatch(addSubject({classId,subject:newSubject}))
     
  
    } catch (error) {
      console.error(error);
      toast.dismiss(toastId);
      toast.error("Could not create subject");
    }
  }
 

 
}

export  function  createChapter(token, classId, subjectId, chapterTitle, chapternotes) {
  
  return async(dispatch) =>{
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        `${NOTES_CLASS_API}/${classId}/subjects/${subjectId}/chapters`,
        {
          classId,
          subjectId,
          chapterTitle,
          chapternotes
        },
        {
          Authorisation: `Bearer ${token}`, 
        }
      );
  
      // Check if the response is successful
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const chapter = response.data.chapter
  
      dispatch(addChapter({classId,subjectId,chapter}))
      
  
    } catch (error) {
      console.error(error);
      toast.dismiss(toastId);
      toast.error("Could not create subject");
    }
    toast.dismiss(toastId);
  }
 

 
}


export function deleteClass(token, classId) {
  
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
  
    try {
     
      const response = await apiConnector(
        "DELETE",
        `${NOTES_CLASS_API}/${classId}`,
        null,
        {
          Authorisation: `Bearer ${token}`,
         
        },
        {classId}
      )
    
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      dispatch(removeClass(classId))
     
    } catch (error) {
      console.log(error)
      toast.error("Could Not delete a class")
    }
    toast.dismiss(toastId)
    
  }
}

export function deleteSubject(token, classId, subjectId) {
  
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
  
    try {
     
      const response = await apiConnector(
        "DELETE",
        `${NOTES_CLASS_API}/${classId}/subjects/${subjectId}`,
        null,
        {
          Authorisation: `Bearer ${token}`,
         
        },
        {classId, subjectId}
      )
    
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      dispatch(removeSubject({classId,subjectId}))
     
    } catch (error) {
      console.log(error)
      toast.error("Could Not delete a subject")
    }
    toast.dismiss(toastId)
    
  }
}

export function deleteChapter(token, classId, subjectId, chapterId) {
  
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    
  
    try {
     
      const response = await apiConnector(
        "DELETE",
        `${NOTES_CLASS_API}/${classId}/subjects/${subjectId}/chapters/${chapterId}`,
        {
          classId,
          subjectId,
          chapterId
        },
        {
          Authorisation: `Bearer ${token}`,
         
        },
    
      )
    
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      dispatch(removeChapter({classId,subjectId,chapterId}))
     
    } catch (error) {
      console.log(error)
      toast.error("Could Not delete a chapter")
    }
    toast.dismiss(toastId)
    
  }
}

export function updateClassName(token, classId, newClassName) {
  
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    
  
    try {
     
      const response = await apiConnector(
        "PUT",
        `${NOTES_CLASS_API}/${classId}`,
        {
          classId,
          newClassName
        },
        {
          Authorisation: `Bearer ${token}`,
         
        },
    
      )
    
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      dispatch(editClass({classId,newClassName}))
     
    } catch (error) {
      console.log(error)
      toast.error("Could Not update a class")
    }
    toast.dismiss(toastId)
    
  }
}

export function updateSubjectName(token, classId, subjectId, newSubjectName) {
  
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    
  
    try {
     
      const response = await apiConnector(
        "PUT",
        `${NOTES_CLASS_API}/${classId}/subjects/${subjectId}`,
        {
          classId,
          subjectId,
          newSubjectName
        },
        {
          Authorisation: `Bearer ${token}`,
         
        },
    
      )
    
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      dispatch(editSubject({classId,subjectId,newSubjectName}))
     
    } catch (error) {
      console.log(error)
      toast.error("Could Not update a subject")
    }
    toast.dismiss(toastId)
    
  }
}

export function updateChapter(
  token,
  classId,
  subjectId,
  chapterId,
  newChapterTitle,
  newChapterContent
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const formData = new FormData();
      formData.append("classId", classId);
      formData.append("subjectId", subjectId);
      formData.append("chapterId", chapterId);
      formData.append("newChapterTitle", newChapterTitle);
      formData.append("newChapterContent", newChapterContent); 
      const response = await apiConnector(
        "PUT",
        `${NOTES_CLASS_API}/${classId}/subjects/${subjectId}/chapters/${chapterId}/content`,
        formData,
        {
          "Content-Type": "multipart/form-data",
          "Authorisation": `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(
        editChapter({
          classId,
          subjectId,
          chapterId,
          newChapterTitle,
          newChapterContent: response.data.notesLink,
        })
      );

      toast.success("Chapter updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Could not update the chapter.");
    }

    toast.dismiss(toastId);
  };
}



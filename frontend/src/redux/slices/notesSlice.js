import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    classesData: [],
    currentClassId: null,
    currentSubjectId: null,
    currentChapterId: null,
    loading: false,
}

const notesSlice = createSlice(
    {
        name: "notes",
        initialState: initialState,
        reducers:{
            setClassesData(state,action){
                state.classesData = action.payload;
            },
            setLoading(state,action){
                state.loading = action.payload;
            },
            setCurrentClassId(state, action) {
                state.currentClassId = action.payload;
            },
            
            setCurrentSubjectId(state, action) {
                state.currentSubjectId = action.payload;
            },
            setCurrentChapterId(state, action) {
                state.currentChapterId = action.payload;
            },
            addSubject(state, action) {
                const { classId, subject } = action.payload;
              
                
              
                // Find the class by classId
                const classIndex = state.classesData.findIndex(
                  (classItem) => classItem._id === classId
                );
              
                if (classIndex !== -1) {
                  // Use Immer's ability to mutate the state directly
                  state.classesData[classIndex].subjects.push(subject);
                }
              
                
            },
            addChapter(state, action) {
            const { classId, subjectId, chapter } = action.payload;
            
            // Find the class by classId
            const classIndex = state.classesData.findIndex(
                (classItem) => classItem._id === classId
            );
            
            if (classIndex !== -1) {
                // Find the subject by subjectId within the class
                const subjectIndex = state.classesData[classIndex].subjects.findIndex(
                (subjectItem) => subjectItem._id === subjectId
                );
            
                if (subjectIndex !== -1) {
                // Use Immer's ability to mutate the state directly
                state.classesData[classIndex].subjects[subjectIndex].chapters.push(chapter);
                }
            }
            },
            removeClass(state, action) {
                const classId = action.payload;
                state.classesData = state.classesData.filter((curr) => curr._id !== classId);
            },
            removeSubject(state, action) {
                const { classId, subjectId } = action.payload;
              
                // Find the class by classId
                const classIndex = state.classesData.findIndex((classItem) => classItem._id === classId);
              
                if (classIndex !== -1) {
                  // Create a copy of the class's subjects array, filtering out the subject with the given subjectId
                  const updatedSubjects = state.classesData[classIndex].subjects.filter(
                    (subject) => subject._id !== subjectId
                  );
              
                  // Update the class's subjects immutably
                  state.classesData = state.classesData.map((classItem, index) =>
                    index === classIndex
                      ? {
                          ...classItem,
                          subjects: updatedSubjects,
                        }
                      : classItem
                  );
                }
            },
            removeChapter(state, action) {
                const { classId, subjectId, chapterId } = action.payload;
              
                // Find the class by classId
                const classIndex = state.classesData.findIndex(
                  (classItem) => classItem._id === classId
                );
              
                if (classIndex !== -1) {
                  // Find the subject by subjectId within the class
                  const subjectIndex = state.classesData[classIndex].subjects.findIndex(
                    (subjectItem) => subjectItem._id === subjectId
                  );
              
                  if (subjectIndex !== -1) {
                    // Filter out the chapter by chapterId
                    state.classesData[classIndex].subjects[subjectIndex].chapters = 
                      state.classesData[classIndex].subjects[subjectIndex].chapters.filter(
                        (chapter) => chapter._id !== chapterId
                      );
                  }
                }
            },
            editClass(state,action){
              const { classId, newClassName } = action.payload;
              
              // Find the class by classId
              const classIndex = state.classesData.findIndex(
                (classItem) => classItem._id === classId
              );
            
              if (classIndex !== -1) {
                // Use Immer's ability to mutate the state directly
                state.classesData[classIndex].name = newClassName;
              }
            },
            editSubject(state, action) {
              const { classId, subjectId, newSubjectName } = action.payload;
            
              // Find the class by classId
              const classIndex = state.classesData.findIndex(
                (classItem) => classItem._id === classId
              );
            
              if (classIndex !== -1) {
                // Find the subject by subjectId within the class
                const subjectIndex = state.classesData[classIndex].subjects.findIndex(
                  (subjectItem) => subjectItem._id === subjectId
                );
            
                if (subjectIndex !== -1) {
                  // Update the subject name using Immer's direct state mutation
                  state.classesData[classIndex].subjects[subjectIndex].name = newSubjectName;
                }
              }
            },
            editChapter(state, action) {
              const { classId, subjectId, chapterId, newChapterTitle, newChapterContent } = action.payload;
            
              // Find the class by classId
              const classIndex = state.classesData.findIndex(
                (classItem) => classItem._id === classId
              );
            
              if (classIndex !== -1) {
                // Find the subject by subjectId within the class
                const subjectIndex = state.classesData[classIndex].subjects.findIndex(
                  (subjectItem) => subjectItem._id === subjectId
                );
            
                if (subjectIndex !== -1) {
                  // Find the chapter by chapterId within the subject
                  const chapterIndex = state.classesData[classIndex].subjects[subjectIndex].chapters.findIndex(
                    (chapterItem) => chapterItem._id === chapterId
                  );
            
                  if (chapterIndex !== -1) {
                    // Update the chapter title and notes using Immer's direct state mutation
                    state.classesData[classIndex].subjects[subjectIndex].chapters[chapterIndex].title = newChapterTitle;
                    state.classesData[classIndex].subjects[subjectIndex].chapters[chapterIndex].notes = newChapterContent;
                  }
                }
              }
            }
            
            
            
              
              
              

        }
    
    }
);

export const {setClassesData,editClass,editSubject,editChapter,removeChapter,addChapter,addSubject, setLoading,setCurrentClassId,setCurrentSubjectId, setCurrentChapterId,removeClass,removeSubject} = notesSlice.actions;
export default notesSlice.reducer;
import React, { useEffect, useState } from 'react';
import MultiClassSubjectChapters from '../components/common/MultiClassSubjectChapters';
import axios from 'axios';


// const classesData = Array.from({ length: 10 }, (_, classIndex) => {
//     const classNumber = classIndex + 1;
//     let subjects;
  
//     // Define subjects based on class level
//     if (classNumber <= 5) {
//       subjects = [
//         {
//           name: 'Maths',
//           chapters: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, title: `Chapter ${i + 1}` }))
//         },
//         {
//           name: 'English',
//           chapters: Array.from({ length: 8 }, (_, i) => ({ id: i + 1, title: `Chapter ${i + 1}` }))
//         },
//         {
//           name: 'Environmental Science',
//           chapters: Array.from({ length: 7 }, (_, i) => ({ id: i + 1, title: `Chapter ${i + 1}` }))
//         }
//       ];
//     } else if (classNumber <= 8) {
//       subjects = [
//         {
//           name: 'Maths',
//           chapters: Array.from({ length: 15 }, (_, i) => ({ id: i + 1, title: `Chapter ${i + 1}` }))
//         },
//         {
//           name: 'Science',
//           chapters: Array.from({ length: 12 }, (_, i) => ({ id: i + 1, title: `Chapter ${i + 1}` }))
//         },
//         {
//           name: 'Social Studies',
//           chapters: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, title: `Chapter ${i + 1}` }))
//         }
//       ];
//     } else {
//       // For classes 9 and 10
//       subjects = [
//         {
//           name: 'Maths',
//           chapters: Array.from({ length: 15 }, (_, i) => ({ id: i + 1, title: `Chapter ${i + 1}` }))
//         },
//         {
//           name: 'Science',
//           chapters: Array.from({ length: 12 }, (_, i) => ({ id: i + 1, title: `Chapter ${i + 1}` }))
//         },
//         {
//           name: 'English',
//           chapters: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, title: `Chapter ${i + 1}` }))
//         },
//         {
//           name: 'History',
//           chapters: Array.from({ length: 8 }, (_, i) => ({ id: i + 1, title: `Chapter ${i + 1}` }))
//         }
//       ];
//     }
  
//     return {
//       name: `Class ${classNumber}`,
//       subjects
//     };
// });

function Notes() {
    

const [loading, setLoading] = useState(true);
const [classesData, setClassesData] = useState([]);


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/notes/getAllData')
      setClassesData(response.data.data)
      //console.log(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched or on error
    }
  };

  fetchData();
  //eslint-disable-next-line
}, []);

  if(loading)return <p>loading...</p>


  return (
    <div className=' flex justify-center items-center'>
      <MultiClassSubjectChapters classesData={classesData} />
    </div>
  );
}

export default Notes;

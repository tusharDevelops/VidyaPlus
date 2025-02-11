import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BoxSec from './BoxSec';
import { useDispatch, useSelector } from 'react-redux';
import { setClassesData } from '../../../../redux/slices/notesSlice';
import { BASE_URL } from '../../../../services/apis';


function MyNotes() {
 
const [loading, setLoading] = useState(true);

const{classesData} = useSelector((state)=>state.notes);
const dispatch= useDispatch();

useEffect(() => {
  
const fetchData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/notes/getAllData`)
    dispatch(setClassesData(response.data.data))
    //console.log(response.data.data)
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false); // Set loading to false after data is fetched or on error
  }
};

  fetchData();
  //eslint-disable-next-line
}, [dispatch]);

  if(loading)return <p>loading...</p>


  return (
  <>
  <BoxSec classesData={classesData} />
  </>
  );
}


export default MyNotes

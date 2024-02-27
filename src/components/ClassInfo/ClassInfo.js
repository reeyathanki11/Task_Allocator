import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ClassHeader from '../../commonComponents/classHeader/ClassHeader';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import ClassInfoTable from './ClassInfoTable';

const ClassInfo = ({ isAdmin }) => {
  const state = useSelector(state => state);
  const { id } = useParams();
  const filteredClass = !state.classListReducer.isLoading && state.classListReducer.classes.filter(el => state.authDataReducer.data[0].class.includes(el.id)).filter(el => el.id.toString() === id)[0];
  return (
    <div className='container'>
      {
        !state.classListReducer.isLoading
          ?
          <>
            <ClassHeader
              classname={filteredClass.className.toUpperCase()}
              toLink={"/adminhome/"}
            />
            <ClassInfoTable isAdmin={isAdmin} filteredClass={filteredClass} />
          </>
          :
          'loading'
      }
    </div>
  )
}

export default ClassInfo
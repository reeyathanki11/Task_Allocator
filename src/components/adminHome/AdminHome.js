import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeClassDisplay from '../../commonComponents/homeClassDisplay/HomeClassDisplay';
import AdminMenu from '../../commonComponents/accountMenu/AdminMenu';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../redux/actions/registrationActions';

const AdminHome = () => {
  const state = useSelector(state => state.authDataReducer);
  const classState = useSelector(state => state.classListReducer);
  const navigate = useNavigate()
  const objfunciton = [
    {
      fn: () => { navigate('/createuser') },
      icon: <i class="fa fa-plus"></i>,
      title: 'User'
    },
    {
      fn: () => { navigate('/createclass') },
      icon: <i class="fa fa-plus"></i>,
      title: 'Class'
    }
  ]
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData(state.data && state.data[0].id));
  }, []);
  return (
    <>
      <div className='container'>
        <div className="d-flex flex-wrap">
          {!classState.isLoading ? classState.classes.filter(el => state.data[0].class.includes(el.id)).map((el, index) => {
            if (el.isRemoved) return <></>;
            return <><HomeClassDisplay image={el.image} toLink="/adminclass/" index={index} createdby={el.createdBy} className={el.className} classId={el.id} key={el.id} /></>
          }) : "loading"}
        </div>
        <div style={{ position: 'fixed', bottom: '50px', right: '50px' }}>
          <AdminMenu objfunction={objfunciton} />
        </div>
      </div>
    </>
  )
}

export default AdminHome
import React, { useEffect } from 'react'
import HomeClassDisplay from '../../commonComponents/homeClassDisplay/HomeClassDisplay';
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from '../../redux/actions/registrationActions';

const Home = () => {
  const state = useSelector(state => state.authDataReducer);
  const classState = useSelector(state => state.classListReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData(state.data && state.data[0].id));
  }, []);
  return (
    <div className='container'>
      <div className="d-flex flex-wrap">
        {!state.isLoading && !classState.isLoading ? classState.classes.filter(el => state.data[0].class.includes(el.id)).map((el, index) => {
          if (el.isRemoved) return <></>;
          return <HomeClassDisplay image={el.image} toLink="/class/" index={index} createdby={el.createdBy} className={el.className} classId={el.id} key={el.id} />
        }) : "loading"}
      </div>
    </div>
  )
}

export default Home
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import SimpleBottomNavigation from '../bottomNavigation/BottomNavigation';

const ClassPrivateRoute = ({ isAdmin }) => {
    const { id } = useParams();
    const state = useSelector(state => state);
    const classInfo = state.classListReducer.classes.find((item) => item.id.toString() === id.toString());
    return (
        <>
            {!state.classListReducer.isLoading &&
                <>
                    {(state.authDataReducer.data[0].class.filter(el => el.toString() === id).length > 0 && !classInfo.isRemoved) ? <>
                        <Outlet />
                        <SimpleBottomNavigation isAdmin={isAdmin} />
                    </>
                        :
                        <Navigate to="/home" />
                    }
                </>
            }

        </>
    )
}

export default ClassPrivateRoute

import React from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { imgarr } from '../../assests/image';

const PrivateRoute = (props) => {
    const { id, bgindex } = useParams();
    const { classlist } = props;
    const curclass = id && classlist.classes.find(item => item.id.toString() === id.toString())
    if ((props.auth && props.admin)) {
        return <>
            <div
                className='bgprivate'
                style={{
                    paddingTop: '70px',
                    paddingBottom: '56px',
                    backgroundImage: id && `url(${imgarr[curclass?.image]})`,
                    backgroundSize: 'cover',
                    minHeight: "100vh",
                    backgroundAttachment: 'fixed',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <Outlet />
            </div>
        </>
    }
    return <Navigate to={props.toLink} />
}


export default PrivateRoute

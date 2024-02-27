import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import ClassNotificationList from '../classNotifications/ClassNotificationList';
import image1 from '../../assests/sciencebg.avif';
import image2 from '../../assests/image2.webp';
import image3 from '../../assests/tree.jpg';
import '../classDetailedView/classDetailedView.css'

const ClassDetailedView = () => {
    const { id, bgindex } = useParams();
    const imgarr = [image1, image2, image3];
    const state = useSelector(state => state.classListReducer);
    const classFiltered = state?.classes?.filter(el => el.id == id)[0];
    const className = classFiltered?.className;
    return (
        <>
            {
                !state.isLoading ?
                    <>
                        <div className="container">
                            <div className='m-2 card_notification_header' style={{ boxShadow: "0px 0px 3px gray", backgroundImage: `url(${imgarr[bgindex % 3]})` }}>
                                <Link to={"/home"} style={{ color: "black", textDecoration: "none" }}>
                                    <h3>
                                        <div className="p-4 text-dark">Classroom <b>{className && className.toUpperCase()}</b></div>
                                    </h3>
                                </Link>
                            </div>
                            <ClassNotificationList bgindex={bgindex} id={id} notification={classFiltered.notification} />
                        </div>
                    </>
                    : "Loading"
            }
        </>
    )
}

export default ClassDetailedView
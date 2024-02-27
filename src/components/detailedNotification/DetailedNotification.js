import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { convertDateTime } from '../../commonFunctions/dateFormatFns';
import { firstCapitalize } from '../../commonFunctions/stringFns';
import { addNotification } from '../../redux/actions/classRoomActions';
import image1 from '../../assests/sciencebg.avif';
import image2 from '../../assests/image2.webp';
import image3 from '../../assests/tree.jpg';
import "./detailedNotification.css";
import Sidebar from '../../commonComponents/sidebar/SideBar';
import ClassHeader from '../../commonComponents/classHeader/ClassHeader';

const DetailedNotification = ({ isAdmin }) => {
    const { id, cid, bgindex } = useParams();
    const imgarr = [image1, image2, image3];
    const state = useSelector(state => state);
    const email = state.authDataReducer?.data[0].email;
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    let classNotify, classFiltered;
    const removeFiled = ['title', 'date', 'comments'];
    if (!state.classListReducer.isLoading) {
        classFiltered = state?.classListReducer?.classes?.filter(el => el.id == id)[0];
        classNotify = classFiltered.notification[cid];
    }
    const handleCommet = () => {
        if (comment) {
            const payload = {
                "title": comment,
                "commenteby": state.authDataReducer.data[0].email,
                "date": new Date()
            };
            const postPayload = { ...classNotify, comments: [...classNotify.comments, payload] };
            const updatedClass = classFiltered.notification.map((notification) => {
                if (notification.title === postPayload.title && notification.description === postPayload.description && notification.date === postPayload.date) {
                    return postPayload;
                }
                return notification;
            });
            const updatePayload = { ...classFiltered, notification: updatedClass };
            dispatch(addNotification(updatePayload));
            setComment('');
        }
    }
    useEffect(() => {
        const component = document.getElementById("comment-list-box-main");
        if (component?.scrollHeight) {
            const tempheight = component.scrollHeight;
            component.scrollTo({ top: tempheight, left: 0, behavior: 'smooth' });
        }
    }, [classFiltered])
    const handleCheck = (check) => {
        if (!classNotify[check].checkedby.includes(email)) {
            const updatedNotification = { ...classNotify, [check]: { ...classNotify[check], checkedby: [...classNotify[check].checkedby, email] } };
            const updatedClassNotList = classFiltered.notification.map(item => {
                if (
                    (item.title === classNotify.title) &&
                    (item.description === classNotify.description) &&
                    (item.date === classNotify.date) &&
                    (item[check].title === classNotify[check].title)
                ) {
                    return updatedNotification;
                }
                else {
                    return item;
                }
            });
            dispatch(addNotification({ ...classFiltered, notification: updatedClassNotList }));
        } else {
            const updatedUserList = classNotify[check].checkedby.filter(item => item !== email);
            const updatedNotification = { ...classNotify, [check]: { ...classNotify[check], checkedby: updatedUserList } };
            const updatedClassNotList = classFiltered.notification.map(item => {
                if (
                    (item.title === classNotify.title) &&
                    (item.description === classNotify.description) &&
                    (item.date === classNotify.date) &&
                    (item[check].title === classNotify[check].title)
                ) {
                    return updatedNotification;
                }
                else {
                    return item;
                }
            });
            dispatch(addNotification({ ...classFiltered, notification: updatedClassNotList }));
        }
    }
    // commnet box integration
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(pre => !pre)
    }
    // commnet box integration
    return (
        <div className='container'>
            {!state.classListReducer.isLoading ?
                (
                    <>
                        <ClassHeader
                            classname={classFiltered && classFiltered.className.toUpperCase()}
                            toLink={(isAdmin ? "/adminclass/" : "/class/") + classFiltered.id + "/" + bgindex}
                        />
                        <div className="classnotification-detail-title">
                            <h3 className='classnotification-detail-title' style={{ margin: 0 }}>{firstCapitalize(classNotify.title)}</h3>
                            <span className='classnotification-detail-date'>Date - {convertDateTime(classNotify.date)}</span>
                            <hr className='mt-0' />
                        </div>
                        {
                            Object.keys(classNotify).map((item) => {
                                if (!removeFiled.includes(item)) {
                                    if (item.split("-")[0] === "description") {
                                        return <>
                                            <span>- {firstCapitalize(classNotify[item].toString())}</span>
                                            <br />
                                        </>
                                    } else if (item.split("-")[0] === "check") {
                                        return <>
                                            <input type="checkbox" checked={classNotify[item].checkedby.includes(email) || isAdmin} disabled={isAdmin} onChange={(e) => handleCheck(item, e.target.value)} />
                                            <span> {firstCapitalize(classNotify[item].title.toString())} </span>
                                            {isAdmin && <span> ( Completed / Checked by - {classNotify[item].checkedby.length ? classNotify[item].checkedby.join(", ") : ' - '})</span>}
                                            <br />
                                        </>
                                    }
                                }
                            })
                        }
                        <div className="static-div-notification"></div>
                        <div className='container comment-parent-div'>
                            <div className='comment-box-button-main d-flex justify-content-end'>
                                <button onClick={handleToggle}><i class='fa fa-comments-o'></i></button>
                            </div>
                        </div>
                        <Sidebar toggle={toggle} close={() => setToggle(false)}
                            component={
                                <>
                                    <div className='comment-list-box-main px-1'>
                                        {classNotify.comments.map((item) => {
                                            return (
                                                <div className={`commented-text-main d-flex flex-column ${state.authDataReducer.data[0].email === item.commenteby ? "align-items-end" : "align-items-left"}`}>
                                                    <span className='commented-date'>{convertDateTime(item.date)}</span>
                                                    <span className='commented-by'>{item.commenteby}</span>
                                                    <span className={`commented-text ${state.authDataReducer.data[0].email === item.commenteby ? "text-align-right" : "text-align-left"}`}>{firstCapitalize(item.title)}</span>
                                                    <br />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='comment-div'>
                                        <input className="comment-input text-left" type="text" placeholder='Add Comment' value={comment} onChange={(e) => setComment(e.target.value)} />
                                        <button className="comment-button btn w-auto" onClick={handleCommet}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                                    </div>
                                </>
                            }

                        />
                    </>) :
                "Loading"
            }
        </div>
    )
}

export default DetailedNotification
import React from 'react';
import { convertDateTime } from '../../commonFunctions/dateFormatFns';
import { firstCapitalize } from '../../commonFunctions/stringFns';
import AccountMenu from '../accountMenu/AccountMenu';
import './adminNotificationCard.css';

const AdminNotificationCard = (props) => {
    const notificationDate = convertDateTime(props.data.date).split(" ");
    const curDate = convertDateTime().split(" ");
    return (
        <>
            <div className='d-flex justify-content-between align-items-center notification-card-main p-1 mx-2'>
                <div>
                    <span className='notification-card-title px-2'>{firstCapitalize(props.data.title.toString().slice(0, 25))}{props.data.title.toString().length > 25 && "..."}</span>
                    <span className='notification-card-desc'>{firstCapitalize(props.data.description.toString().slice(0, 20))}{props.data.description.toString().length > 20 && "..."}</span>
                </div>
                <div className='d-flex align-items-center'>
                    <span className='mx-2'>{notificationDate[1] === curDate[1] ? notificationDate[0] : notificationDate[1].split("-").slice(0, 2).join("-")}</span>
                    <span className='anotification-card-button'><AccountMenu objfunction={props.objfunction} /></span>
                </div>
            </div>
        </>
    )
}

export default AdminNotificationCard
import React from 'react';
import { convertDateTime } from '../../commonFunctions/dateFormatFns';
import { firstCapitalize } from '../../commonFunctions/stringFns';
import './notificationCard.css';

const NotificationCard = (props) => {
  const notificationDate = convertDateTime(props.data.date).split(" ");
  const curDate = convertDateTime().split(" ");
  return (
    <>
      {/* <div className='m-2 py-1' style={{ backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 3px gray" }}>
        <div className='m-2'>
          <h4>
            {props.data.title}
          </h4>
        </div>
        <hr />
        <div className='m-2'>
          {props.data.description.toString()}
        </div>
      </div> */}
      <div className='d-flex justify-content-between notification-card-main p-1 mx-2'>
        <div>
          <span className='notification-card-title px-2'>{firstCapitalize(props.data.title.toString().slice(0, 25))}{props.data.title.toString().length > 25 && "..."}</span>
          <span className='notification-card-desc'>{firstCapitalize(props.data.description.toString().slice(0, 20))}{props.data.description.toString().length > 20 && "..."}</span>
        </div>
        <span>{notificationDate[1] === curDate[1] ? notificationDate[0] : notificationDate[1]}</span>
      </div>
    </>
  )
}

export default NotificationCard
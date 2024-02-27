import React from 'react'
import { Link } from 'react-router-dom';
import NotificationCard from '../../commonComponents/notificationCard/NotificationCard'
import { convertDateTime, isInputDateBeforeToday } from '../../commonFunctions/dateFormatFns';

const ClassNotificationList = (props) => {
  for (let i = 0; i < props.notification.length - 1; i++) {
    for (let j = 0; j < props.notification.length - i - 1; j++) {
      if (props.notification[j].date < props.notification[j + 1].date) {
        let temp = props.notification[j];
        props.notification[j] = props.notification[j + 1];
        props.notification[j + 1] = temp;
      }
    }
  }
  return (
    <div>{props.notification.map((el, index) => <Link style={{ textDecoration: "none", width: '100%', color: 'black' }} to={`/class/${props.id}/${index}/${props.bgindex}`}>
      {isInputDateBeforeToday(el.date) && <NotificationCard key={index} data={el} />}
    </Link>)}</div>
  )
}

export default ClassNotificationList
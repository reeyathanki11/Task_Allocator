import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { imgarr } from '../../assests/image';
import AccountMenu from '../../commonComponents/accountMenu/AccountMenu';
import ConfirmModal from '../../commonComponents/confirmModal/ConfirmModal';
import AdminNotificationCard from '../../commonComponents/notificationCard/AdminNotificationCard';
import NotificationCard from '../../commonComponents/notificationCard/NotificationCard';
import { convertDate, isInputDateBeforeToday } from '../../commonFunctions/dateFormatFns';
import { firstCapitalize } from '../../commonFunctions/stringFns';
import { deleteNotification } from '../../redux/actions/classRoomActions';
import AddUser from '../addUser/AddUser';
import CustomModal from '../customModal/CustomModal';
import UserListTable from '../userListTable/UserListTable';
import './AdminClassView.css'
import ClassHeader from '../../commonComponents/classHeader/ClassHeader';
import { AdminNotTable } from '../AdminNotTable/AdminNotTable';
import AdminMenu from '../../commonComponents/accountMenu/AdminMenu';

function AdminClassView() {
  const state = useSelector(state => state);
  const navigate = useNavigate();
  const { id, bgindex } = useParams();
  const dispatch = useDispatch();
  const filteredClass = !state.classListReducer.isLoading && state.classListReducer.classes.filter(el => state.authDataReducer.data[0].class.includes(el.id)).filter(el => el.id.toString() === id)[0];
  let data = filteredClass?.notification;
  const [paginationData, setPaginationData] = useState(1);
  const [userData, setUserData] = useState(false);
  const getUserList = async () => {
    const res = await axios.get("http://localhost:3000/profile");
    setUserData(res.data.filter(item => item.class.includes(Number(id)) && !item.isAdmin));
  }
  // user modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // user modal

  // delete confirm modal
  const [delData, setDelData] = useState({ id: "", el: "" });
  const [delOpen, setDelOpen] = useState(false);
  const handleDelOpen = (id, el) => {
    setDelData({ id, el });
    setDelOpen(true)
  };
  const handleDelClose = () => setDelOpen(false);
  useEffect(() => {
    if (data?.length > 0) {
      setPaginationData(1);
    }
    getUserList();
  }, [data]);
  const objfunciton = [
    {
      fn: () => navigate(`/adminclass/${id}/add/${bgindex}`),
      icon: <i class="fa fa-plus"></i>,
      title: 'Task'
    }
  ]
  return (
    <>
      {state.classListReducer.isLoading ? "loading" :
        <div className='container'>
          <ClassHeader
            classname={filteredClass.className.toUpperCase()}
            toLink={"/adminhome/"}
          />

          <AdminNotTable id={id} bgindex={bgindex} data={data} handleDelOpen={handleDelOpen} />

          <div style={{ position: 'fixed', bottom: '50px', right: '50px' }}>
            <AdminMenu objfunction={objfunciton} />
          </div>
        </div>
      }
      {!state.classListReducer.isLoading && <CustomModal getUserList={getUserList} data={data} open={open} handleOpen={handleOpen} handleClose={handleClose} text={"Add User In the " + filteredClass.className.toUpperCase() + " class"} />}
      {!state.classListReducer.isLoading && <ConfirmModal handleAgree={() => {
        dispatch(deleteNotification(delData.id, delData.el));
        handleDelClose();
      }} open={delOpen} handleClickOpen={handleDelOpen} handleClose={handleDelClose} />}

    </>
  );
};

export default AdminClassView;
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ClassHeader from '../../commonComponents/classHeader/ClassHeader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { getClassList } from '../../redux/actions/classRoomActions';
import AdminMenu from '../../commonComponents/accountMenu/AdminMenu';
import CustomModal from '../customModal/CustomModal';

const UsersListTable = ({ isAdmin }) => {
    const state = useSelector(state => state);
    const { id } = useParams();
    const filteredClass = !state.classListReducer.isLoading && state.classListReducer.classes.filter(el => state.authDataReducer.data[0].class.includes(el.id)).filter(el => el.id.toString() === id)[0];
    const [userData, setUserData] = useState(false);
    const getUserList = async () => {
        const res = await axios.get("http://localhost:3000/profile");
        setUserData(res.data.filter(item => item.class.includes(Number(id)) && !item.isAdmin));
    }
    useEffect(() => {
        if (!state.classListReducer.isLoading) {
            getUserList();
        }
    }, [!state.classListReducer.isLoading]);
    const dispatch = useDispatch();
    const handleDelete = async (uid, email) => {
        // on the class
        const newStudentArr = filteredClass.studentArray.filter(data => data.toString() != uid.toString());
        const updatedClass = { ...filteredClass, studentArray: newStudentArr };
        await axios.put(`http://localhost:3000/classroom/${updatedClass.id}`, updatedClass);
        // on the class

        // on the profile
        // i need to do it on userData field for the getting that users data currently founded bug  
        const user = userData.filter(data => data.email === email)[0];
        const updateduserUserClass = user.class.filter(item => item != id);
        const updatedProfile = { ...user, class: updateduserUserClass };
        await axios.put(`http://localhost:3000/profile/${updatedProfile.id}`, updatedProfile);
        // on the profile
        dispatch(getClassList());
        getUserList();
    }
    // -----
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let data = filteredClass?.notification;
    const objfunciton = [
        {
            fn: handleOpen,
            icon: <i class="fa fa-plus"></i>,
            title: 'User'
        }
    ]
    return (
        <div className='container'>
            {
                !state.classListReducer.isLoading
                    ?
                    <>
                        <ClassHeader
                            classname={filteredClass.className.toUpperCase()}
                            toLink={"/adminhome/"}
                        />
                        {
                            userData.length > 0
                                ?
                                <>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableBody>
                                                {userData.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="left">{row.email}</TableCell>
                                                        {isAdmin && <TableCell align="right">
                                                            <Button variant="text" sx={{ minWidth: 'fit-content' }} onClick={() => {
                                                                handleDelete(row.id, row.email)
                                                            }}>
                                                                <DeleteIcon sx={{ color: 'red' }} />
                                                            </Button>
                                                        </TableCell>}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                                :
                                'No users'
                        }
                        {isAdmin && <div style={{ position: 'fixed', bottom: '50px', right: '50px' }}>
                            <AdminMenu objfunction={objfunciton} />
                        </div>}
                        {!state.classListReducer.isLoading && <CustomModal getUserList={getUserList} data={data} open={open} handleOpen={handleOpen} handleClose={handleClose} text={"Add User In the " + filteredClass.className.toUpperCase() + " class"} />}

                    </>
                    :
                    'loading'
            }
        </div>
    )
}

export default UsersListTable
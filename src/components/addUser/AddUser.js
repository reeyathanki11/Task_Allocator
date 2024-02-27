import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './AddUser.css';

const AddUser = ({ getUserList, handleClose }) => {
    const { id } = useParams();
    const [uname, setUname] = useState('');
    const { classListReducer } = useSelector(state => state);
    const [user, setUser] = useState({ error: false, msg: "" });
    const callApi = async () => {
        const res = await axios.get("http://localhost:3000/profile");
        const filteredData = res.data.filter(user => user.email === uname.trim());
        if (filteredData.length) {
            const filterList = filteredData.filter(item => !item.class.includes(Number(id)));
            if (filterList.length) {
                const data = { ...filterList[0], class: [...filterList[0].class, Number(id)] };
                const res = await axios.put(`http://localhost:3000/profile/${data.id}`, data);
                const classroom = classListReducer.classes.filter(t => t.id === Number(id))[0];
                if (res.status === 200) {
                    const classroomApiData = { ...classroom, studentArray: [...classroom.studentArray, Number(filterList[0].id)] };
                    await axios.put(`http://localhost:3000/classroom/${classroomApiData.id}`, classroomApiData);
                    setUname('');
                    getUserList();
                    handleClose();
                } else {
                    setUser({ error: true, msg: "Something went wrong." })
                }
            } else {
                setUser({ error: true, msg: "User alredy in the class." })
            }
        } else {
            setUser({ error: true, msg: "User not found. Create the user." })
        }
    };
    return (
        <>
            {
                !classListReducer.isLoading ?
                    <div className="d-flex flex-column position-relative">
                        {/* <input className='w-100 border widht-auto text-left-side' type="text" placeholder='Enter Email' style={{ height: "38px" }} onChange={(e) => setUname(e.target.value)} /> */}
                        <TextField id="standard-basic" label="Enter Email" variant="standard" onChange={(e) => setUname(e.target.value)} />
                        {user.error && <small id="emailHelp" className="form-text text-danger mx-2">** {user.msg}</small>}
                        {/* <div className="d-flex justify-content-end position-absolute fixed-bottom"> */}
                        <div className="d-flex justify-content-end my-1">
                            <Button onClick={callApi}>Add User</Button>
                            {/* <button className="btn btn-warning mx-1" onClick={callApi}>Add User</button> */}
                            <Button color="error" onClick={handleClose}>Cancle</Button>
                            {/* <button className="btn btn-danger" onClick={handleClose}>Cancle</button> */}
                        </div>
                        {/* </div> */}
                    </div>
                    : "loading"
            }
        </>
    )
}

export default AddUser
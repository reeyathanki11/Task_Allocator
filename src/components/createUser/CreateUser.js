import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { convertDate } from '../../commonFunctions/dateFormatFns';
import './CreateUser.css'

const CreateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [mobile, setMobile] = useState('');
    const [dob, setDob] = useState('');
    const [msg, setMsg] = useState({ isMsg: false, msg: "" });
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.get("http://localhost:3000/profile");
        const filteredData = res.data.filter(user => user.email === email.trim());
        if (!filteredData.length) {
            const payload = {
                "email": email.trim(),
                "name": name,
                "pass": pass,
                "image": [
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                ],
                "class": [],
                "mobile": mobile,
                "dob": dob,
                "isAdmin": false
            }
            const postres = await axios.post("http://localhost:3000/profile", payload);
            if (postres.status === 201) {
                setMsg({ isMsg: true, msg: "User Created." });
                setName('');
                setEmail('');
                setPass('');
                setMobile('');
                setDob('');
            } else {
                setMsg({ isMsg: true, msg: "Failed to add user." });
            }
        } else {
            setMsg({ isMsg: true, msg: "User already exist." });
        }
    };
    return (
        <div className='container'>
            <form className='row' onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label for="formGroupExampleInput">Name:</label>
                    <input required={true} type="text" className="form-control inputName" id="formGroupExampleInput" placeholder="Enter Name" value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 form-group my-2">
                    <label for="exampleInputEmail1">Email address:</label>
                    <input required={true} type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 form-group my-2">
                    <label for="exampleInputPassword1">Password:</label>
                    <input required={true} type="password" className="form-control" placeholder="Password" value={pass} onChange={(e) => {
                        setPass(e.target.value)
                    }} />
                </div>
                <div className="form-group my-2">
                    <label for="exampleInputPassword1">Mobile Number:</label>
                    <input required={true} type="number" className="form-control" placeholder="Enter Mobile Number" value={mobile} onChange={(e) => {
                        setMobile(e.target.value)
                    }} />
                </div>
                <div className="form-group my-2">
                    <label for="exampleInputPassword1">Date of Birth:</label>
                    <input required={true} type="date" className="form-control" max={convertDate(new Date())} value={dob} onChange={(e) => {
                        setDob(e.target.value)
                    }} />
                </div>
                <div className='my-2'>
                    <button type="submit" className="btn btn-primary">Create User</button>
                    <button type='button' className='mx-2 btn btn-danger' onClick={()=>navigate("/adminhome")}>Cancle</button>
                </div>
            </form>
            {msg.isMsg && msg.msg}
        </div>
    )
}

export default CreateUser
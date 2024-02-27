import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CustomImagePicker from '../imagePicker/ImagePicker';
import { imgarr } from '../../assests/image';
import { useSelector } from 'react-redux';
import axios from 'axios';
const CreateClass = () => {
    const { authDataReducer } = useSelector(state => state);
    const navigate = useNavigate();
    const [className, setClassName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(imgarr[0]);
    const handleSubmit = async () => {
        const newclass = {
            className,
            description,
            image,
            studentArray: [authDataReducer.data[0].id],
            notification: [],
            createdBy: authDataReducer.data[0].name
        };
        const res = await axios.post('http://localhost:3000/classroom', newclass);
        const updatedProfile = { ...authDataReducer.data[0], class: [...authDataReducer.data[0].class, res.data.id] };
        const res2 = await axios.put(`http://localhost:3000/profile/${updatedProfile.id}`, updatedProfile);
        if(res.status === 201) navigate("/adminhome");
    }
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center'>
            <TextField id="outlined-basic" label="Enter Group Name" variant="outlined" value={className} onChange={(e) => {
                setClassName(e.target.value);
            }}
                sx={{ width: '400px' }}
            />
            <br />
            <TextField
                id="outlined-multiline-static"
                label="Enter Group Description"
                multiline
                rows={4}
                sx={{ width: '400px', marginBottom: "15px" }}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            <div>
                <span className='mx-2'>Select Tile Image:</span>
                <CustomImagePicker image={image} setImage={setImage} />
            </div>
            <div className='my-2'>
                <Button variant='outlined' onClick={handleSubmit}>Create Task Group</Button>
                <Button variant='contained' color='error' type='button' className='mx-2 btn btn-danger' onClick={(e) => {
                    e.preventDefault();
                    navigate("/adminhome")
                }}>Cancle</Button>
            </div>
        </div>
    )
}

export default CreateClass
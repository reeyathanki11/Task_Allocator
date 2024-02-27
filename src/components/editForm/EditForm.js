import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addNotification } from '../../redux/actions/classRoomActions';
import { useForm } from 'react-hook-form';
import './editForm.css'
import ClassHeader from '../../commonComponents/classHeader/ClassHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const EditForm = () => {
    const state = useSelector(state => state);
    const { id, nid, bgindex } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ignoreFields = ['title', 'description', 'date', 'comments'];
    const handleAdd = (newData, oldData) => {
        const payloadData = {};
        Object.keys(newData).forEach(item => {
            if (inputArr.includes(item) || ignoreFields.includes(item)) {
                if (item.split("-")[0] === "check") {
                    payloadData[item] = { title: newData[item], checkedby: [] }
                } else {
                    payloadData[item] = newData[item];
                }
            }
        });
        let data = state.classListReducer.classes.filter(el => el.id.toString() === id.toString())[0];
        data.notification = data.notification.map(item => {
            if ((item.title === oldData.title) && (item.description === oldData.description) && (item.date === oldData.date)) {
                return { ...payloadData, date: oldData.date, comments: oldData.comments };
            }
            return item;
        });
        dispatch(addNotification(data));
    }
    const [inputArr, setInputArr] = useState([]);
    const handleSubmitData = (data) => {
        handleAdd({ ...data }, classDetails.notification[nid]);
        navigate(`/adminclass/${id}/${bgindex}`);
    }
    const { register, handleSubmit } = useForm();
    const classDetails = state.classListReducer.classes.filter(item => item.id.toString() === id.toString())[0];
    useEffect(() => {
        setInputArr(classDetails ? Object.keys(classDetails.notification[nid]) : [])
    }, [classDetails]);

    return (
        <div className="container">
            {
                !state.classListReducer.isLoading && <>
                    <ClassHeader
                        classname={classDetails.className.toUpperCase()}
                        toLink={"/adminclass/" + classDetails.id + "/" + bgindex}
                    />
                    <form onSubmit={handleSubmit((data) => handleSubmitData(data))}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow
                                        key={'title'}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <label htmlFor="exampleInputEmail1">Title:</label>
                                        </TableCell>
                                        <TableCell align="right"><input
                                            {...register('title', {
                                                required: {
                                                    value: true,
                                                    message: 'This is required.'
                                                },
                                                value: classDetails.notification[nid].title
                                            })}
                                            type="text"
                                            className="form-control border border-dark input-box-border-remove"
                                            placeholder="Enter email"
                                        /></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                    <TableRow
                                        key='description'
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <label htmlFor="exampleInputEmail1">Description:</label>
                                        </TableCell>
                                        <TableCell align="right">
                                            <input
                                                type="text"
                                                className="form-control border border-dark input-box-border-remove"
                                                placeholder='Enter text'
                                                {...register('description', {
                                                    required: {
                                                        value: true,
                                                        message: 'This is required.'
                                                    },
                                                    value: classDetails.notification[nid].description
                                                })}
                                            />
                                        </TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                    {
                                        inputArr.map((type, index) => {
                                            const typeInput = type.split('-')[0];
                                            const typeId = type.split('-')[1];
                                            if (typeInput === 'description') {
                                                return <>
                                                    <TableRow
                                                        key={index + 1}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            Description ({index + 1})
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <input
                                                                type='text'
                                                                className="form-control border border-dark input-box-border-remove"
                                                                placeholder='Enter text'
                                                                {...register('description-' + typeId, {
                                                                    required: {
                                                                        value: true,
                                                                        message: 'This is required.'
                                                                    },
                                                                    value: classDetails.notification[nid][type]
                                                                })}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <button type='button' className='btn' onClick={() => setInputArr(inputArr.filter(item => item !== type))}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            } else if (typeInput === 'check') {
                                                return <>
                                                    <TableRow
                                                        key={index + 1}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <input
                                                                style={{ width: '15px', height: '15px' }}
                                                                type='checkbox'
                                                                className="border border-dark mx-1 input-box-border-remove"
                                                                checked={true}
                                                                disabled='true'
                                                            />
                                                            <label htmlFor="exampleInputEmail1">Check Box ({index + 1}):</label>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <input
                                                                type='text'
                                                                className="form-control border border-dark input-box-border-remove"
                                                                placeholder='Enter text'
                                                                {...register('check-' + typeId, {
                                                                    required: {
                                                                        value: true,
                                                                        message: 'This is required.'
                                                                    },
                                                                    value: classDetails?.notification[nid][type]?.title ?? ""
                                                                })}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <button type='button' className='btn' onClick={() => setInputArr(inputArr.filter(item => item !== type))}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            }
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className="d-flex justify-content-between flex-wrap">
                            <div>
                                <button type='button' className="btn btn-warning" onClick={() => setInputArr([...inputArr, `description-${parseInt(Math.random() * 10000)}`])}>
                                    + Text Box
                                </button>
                                <button type='button' className="mx-2 btn btn-warning" onClick={() => setInputArr([...inputArr, `check-${parseInt(Math.random() * 10000)}`])}>
                                    + Check Box
                                </button>
                            </div>
                            <div className='my-2'>
                                <button className='btn btn-primary'>Save Changes</button>
                            </div>
                        </div>
                    </form>
                </>
            }
        </div>
    )
}

export default EditForm
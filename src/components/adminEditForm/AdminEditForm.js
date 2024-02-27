import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addNotification } from '../../redux/actions/classRoomActions';
import { useForm } from 'react-hook-form';
import './adminEditForm.css'
import { imgarr } from '../../assests/image';
import ClassHeader from '../../commonComponents/classHeader/ClassHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const AdminEditForm = () => {
    const state = useSelector(state => state);
    const { id, bgindex } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ignoreFields = ['title', 'description', 'date', 'comments'];
    const handleAdd = (newData) => {
        const payloadData = {}
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
        data.notification.push({ ...payloadData, date: payloadData.date ? new Date(newData.date + " " + newData.time) : new Date() });
        dispatch(addNotification(data));
    }
    const [inputArr, setInputArr] = useState([]);
    const handleSubmitData = (data) => {
        handleAdd({ ...data, comments: [] });
        navigate(`/adminclass/${id}/${bgindex}`);
    }
    const { register, handleSubmit } = useForm();
    const classDetails = state.classListReducer.classes.filter(item => item.id.toString() === id.toString())[0];

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Title', <input
            {...register('title', {
                required: {
                    value: true,
                    message: 'This is required.'
                }
            })}
            type="text"
            className="form-control border border-dark input-box-border-remove"
            placeholder="Enter email"
        />),
        createData('Description', <input
            type="text"
            className="form-control border border-dark input-box-border-remove"
            placeholder='Enter text'
            {...register('description', {
                required: {
                    value: true,
                    message: 'This is required.'
                }
            })}
        />),
    ];
    const lastRows = [
        createData(<><i class="fa fa-clock-o"></i> Public On Time(Default current): </>, <div className='d-flex'>
            <input
                type="date"
                className="form-control border border-dark input-box-border-remove"
                placeholder='Enter text'
                {...register('date')}
            />
            <input
                type="time"
                className="form-control border border-dark input-box-border-remove"
                placeholder='Enter text'
                {...register('time')}
            />
        </div>)
    ]
    return (
        <div className="container">
            {!state.classListReducer.isLoading && <>
                <ClassHeader
                    classname={classDetails.className.toUpperCase()}
                    toLink={"/adminclass/" + classDetails.id + "/" + bgindex}
                />
            </>}
            <form onSubmit={handleSubmit((data) => handleSubmitData(data))}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                </TableRow>
                            ))}
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
                                                            }
                                                        })}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <button className='btn' onClick={() => setInputArr(inputArr.filter(item => item !== type))}>
                                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                                    </button>
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
                                                            }
                                                        })}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <button className='btn' onClick={() => setInputArr(inputArr.filter(item => item !== type))}>
                                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    }
                                })
                            }
                            {lastRows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="d-flex justify-content-between flex-wrap">
                    <ButtonGroup className='mb-2' variant="contained" aria-label="outlined warning button group" >
                        <Button sx={{ backgroundColor: '#ffc107', color: 'black' }} onClick={() => setInputArr([...inputArr, `description-${parseInt(Math.random() * 10000)}`])}>
                            + Text Box
                        </Button>
                        <Button sx={{ backgroundColor: '#ffc107', color: 'black' }} onClick={() => setInputArr([...inputArr, `check-${parseInt(Math.random() * 10000)}`])}>
                            + Check Box
                        </Button>
                    </ButtonGroup>
                    {/* <button className='btn btn-primary mt-2'>Submit</button> */}
                    <Button className='mt-2' type="submit" variant="contained">Submit</Button>
                </div>
            </form>

        </div>
    )
}

export default AdminEditForm
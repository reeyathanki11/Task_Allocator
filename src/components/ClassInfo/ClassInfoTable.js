import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../redux/actions/classRoomActions';
import { useNavigate } from 'react-router-dom';

function createData(name, calories) {
    return { name, calories };
}


export default function ClassInfoTable({ filteredClass, isAdmin }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDelete = () => {
        dispatch(addNotification({ ...filteredClass, isRemoved: true }));
        navigate('/adminhome');
    }
    const generateData = () => {
        if (isAdmin) return [
            createData('ID', filteredClass.id),
            createData('Description', filteredClass.description),
            createData('Created by', filteredClass.createdBy),
            createData('Tasks/Notifications', filteredClass.notification.length),
            createData('Students', filteredClass.studentArray.length),
            createData('Remove Group', <Button
                size='small'
                variant="outlined"
                color="error"
                onClick={handleDelete}
            >
                <DeleteIcon color='red' /> Remove
            </Button>)
        ];
        return [
            createData('description', filteredClass.description),
            createData('Created by', filteredClass.createdBy),
            createData('Tasks/Notifications', filteredClass.notification.length),
            createData('students', filteredClass.studentArray.length),
        ]
    }
    const rows = generateData();
    return (
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
                            <TableCell align="right">{row.calories ?? '-'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
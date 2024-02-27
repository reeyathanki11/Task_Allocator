import { Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, tableCellClasses } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useState } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { convertDateTime } from "../../commonFunctions/dateFormatFns";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export const AdminNotTable = ({ data, id, bgindex, handleDelOpen }) => {
    const curDate = convertDateTime().split(" ");
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const classes = useStyles();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const columns = [
        { id: "title", label: "Title", minWidth: 170 },
        {
            id: "description",
            label: "Description",
            minWidth: 170,
            align: "left",
            format: (value) => value.toLocaleString("en-US"),
        },
        {
            id: "data",
            label: "Date",
            minWidth: 170,
            align: "left",
            format: (value) => value.toLocaleString("en-US"),
        },
        {
            id: "actions",
            label: "Actions",
            minWidth: 170,
            align: "left",
            format: (value) => value.toFixed(2),
        },
    ];
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#BBDFF5",
            color: "#000",
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    return <>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440, marginTop: "20px" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    <b>{column.label}</b>
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            ?.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            ?.map((row, index) => {
                                const notificationDate = convertDateTime(row.date).split(" ");
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.code}
                                    >
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{notificationDate[1] === curDate[1] ? notificationDate[0] : notificationDate[1].split("-").slice(0, 2).join("-")}</TableCell>
                                        <TableCell>
                                            <Button sx={{ color: 'black', minWidth: 'fit-content' }} onClick={() => {
                                                navigate(`/adminclass/${id}/${index}/${bgindex}`);
                                            }}>
                                                <i className="fa fa-eye" aria-hidden="true"></i>
                                            </Button>
                                            <Button sx={{ minWidth: 'fit-content' }} onClick={() => navigate(`/adminclass/${id}/${index}/edit/${bgindex}`)}>
                                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                            </Button>
                                            <Button sx={{ color: 'red', minWidth: 'fit-content' }} onClick={() => handleDelOpen(id, row)}>
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </>
}
const useStyles = makeStyles({
    placeCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    placeEnd: {
        display: 'flex',
        justifyContent: 'end'
    },
    error: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: 'red'
    }
});
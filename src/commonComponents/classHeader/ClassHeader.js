import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ClassHeader = ({ classname, toLink }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="d-flex align-items-center pt-3">
                <ArrowBackIosNewIcon onClick={() => navigate(toLink)} />
                <Typography sx={{ marginLeft: '10px' }} variant="h5" component="h2">
                    {classname}
                </Typography>
            </div>
            <hr />
        </>
    )
}

export default ClassHeader
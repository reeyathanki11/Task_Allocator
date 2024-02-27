import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate, useParams } from 'react-router-dom';

export default function SimpleBottomNavigation({ isAdmin }) {
    const [value, setValue] = React.useState(0);
    const { id, bgindex } = useParams();
    const navigate = useNavigate();
    return (
        <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction onClick={() => navigate((isAdmin ? "/adminclass/" : "/class/") + id + '/' + bgindex)} label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction onClick={() => navigate((isAdmin ? "/adminclass/" : "/class/") + id + '/' + bgindex + '/users')} label="Users" icon={<GroupIcon />} />
                <BottomNavigationAction onClick={() => navigate((isAdmin ? "/adminclass/" : "/class/") + id + '/' + bgindex + '/details')} label="Details" icon={<InfoIcon />} />
            </BottomNavigation>
        </Box>
    );
}
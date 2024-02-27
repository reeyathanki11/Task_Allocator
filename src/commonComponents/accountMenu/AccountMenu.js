import * as React from 'react';
import { Box } from '@mui/material';
import { Avatar } from '@mui/material';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import { Tooltip } from '@mui/material';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
import './accountMenu.css';

export default function AccountMenu({ objfunction }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Actions">

                    <Avatar onClick={handleClick} sx={{ width: 32, height: 32, backgroundColor: "rgb(0,0,0,0)" }}>
                        <i style={{
                            color: "black",
                        }} class="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </Avatar>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {objfunction.map(el => {
                    return (<MenuItem onClick={el.fn}>
                        <div className="d-flex align-items-center accountmenu-menuitem">
                            {el.icon}
                            <span> {el.title}</span>
                        </div>
                    </MenuItem>)
                })}

            </Menu>
        </React.Fragment>
    );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
];

export default function AdminMenu({ objfunction }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <Backdrop open={open} style={{ backgroundColor: '#BBDFF5' }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                FabProps={{
                    sx: {
                        bgcolor: '#BBDFF5',
                        '&:hover': {
                            bgcolor: '#BBDFF5',
                        },
                        color: 'black',
                        boxShadow: '0px 0px 10px black'
                    }
                }}
            >
                {objfunction.map((action) => (
                    <SpeedDialAction
                        key={action.title}
                        icon={action.icon}
                        tooltipTitle={action.title}
                        tooltipOpen
                        onClick={action.fn}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmModal({ open, handleClickOpen, handleClose, id, el, handleAgree }) {
    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you sure you want to delete it?"}</DialogTitle>
                {/* <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete it?
                    </DialogContentText>
                </DialogContent> */}
                <DialogActions>
                    <Button onClick={handleClose}><i class="fa fa-times mx-1" aria-hidden="true"></i> Cancle</Button>
                    <Button color="error" onClick={handleAgree}><i className="fa fa-trash mx-1" aria-hidden="true"></i> Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

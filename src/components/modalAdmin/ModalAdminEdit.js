import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { editClassList } from '../../redux/actions/classRoomActions';
import AdminEditForm from '../adminEditForm/AdminEditForm';

const ModalAdminEdit = ({ data, id }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [notData, setNotData] = useState({ title: data.title, description: data.description, date: data.date })
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const handleSubmit = () => {
        let temp = state.classListReducer.classes.filter(el => el.id.toString() === id.toString())
        let newTemp = [];
        temp[0].notification.map(el => {
            if (el.title === data.title && el.description === data.description) {
                newTemp.push(notData);
            }
            else {
                newTemp.push(el);
            }
        })
        temp[0].notification = newTemp
        dispatch(editClassList(temp))
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>  
                    <Modal.Title>{notData.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body><AdminEditForm data={notData} setData={setNotData} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAdminEdit
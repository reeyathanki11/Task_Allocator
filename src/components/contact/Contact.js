import React from 'react'

import ContactForm from './form/form';
import SuccessMsg from './success/success';


import './form/form.css';
import './input/input.css';
import './success/success.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const contactFields = [
    {
        label: 'Your full name',
        id: 'fullname',
        placeholder: 'Enter full name',
        type: 'text',
        options: {
            required: true
        }
    },
    {
        label: 'Your email',
        id: 'email',
        placeholder: 'mail@example.com',
        type: 'email',
        options: {
            required: true,
            email: true
        }
    },
    {
        label: 'Subject',
        id: 'subject',
        placeholder: 'I am enquiring about...',
        type: 'text',
        options: {
            required: true
        }
    },
    {
        label: 'Enquiry',
        id: 'content',
        placeholder: 'Tell us more about your enquiry, feedback or issues.',
        type: 'textarea',
        options: {
            required: true
        }
    }
];

const Contact = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    console.log("data---", data.apicall);
    useEffect(() => {
        if (data.apicall) {
            const apicall = async () => await axios.post('http://localhost:3000/contact', data);
            const res = apicall();
            setData({ ...data, apicall: false });
            navigate('/');
        }
    }, [data]);

    return (
        <div className='container d-flex justify-content-center'>
            <ContactForm
                data={data}
                setData={setData}
                fields={contactFields}
                submitText='contact'
            />
        </div>
    )
}

export default Contact
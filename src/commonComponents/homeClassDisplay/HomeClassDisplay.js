import React from 'react'
import '../homeClassDisplay/homeClassDisplay.css'
import { Link } from 'react-router-dom';
import image1 from '../../assests/sciencebg.avif';
import image2 from '../../assests/image2.webp';
import image3 from '../../assests/tree.jpg'
import ClassCard from './ClassCard';

const HomeClassDisplay = (props) => {
    const imgarr = [image1, image2, image3];
    return (
        <>
            {/* <div className='task_card_parent mx-2' style={{ backgroundImage: `url(${imgarr[props.index % 3]})` }}>
                    <h2 className='px-4 pt-4 text-dark'>{props.className.toUpperCase()}</h2>
                    <div className="px-4 text-dark">Created By <b>{props.createdby}</b></div>
                    <hr style={{ height: "2px", color: "black", opacity: "200%" }} />
                </div> */}
            <Link className='d-flex flex-column' to={props.toLink + props.classId + "/" + props.index} style={{ textDecoration: "none"}}>
                <ClassCard
                    image={`${imgarr[props.image]}`}
                    classname={props.className.toUpperCase()}
                    createdby={props.createdby}
                />
            </Link>
        </>
    )
}

export default HomeClassDisplay
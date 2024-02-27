import DataTable from 'react-data-table-component';
import { useSelector } from "react-redux"
import { useParams } from 'react-router-dom'

const columns = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.description,
    },
    {
        name: 'Year',
        selector: row => row.date,
    },
];


function ClassNotifications(props) {
    const { id } = useParams();
    const state = useSelector(state => state.classListReducer);
    return (
        <>
            {!state.isLoading ? <DataTable
                columns={columns}
                data={!state.isLoading && state?.classes.filter(el => el.id.toString() === id)[0].notification}
            /> : "loading"}
        </>
    );
};
export default ClassNotifications;
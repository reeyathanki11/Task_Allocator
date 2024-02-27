import React from 'react'
import './UserListTable.css'

const UserListTable = ({ userData }) => {
    return (
        <div className='container'>
            {userData ?
                <>
                    <div className="d-flex justify-content-between my-1">
                        <h3>Users:</h3>
                    </div>
                    <table border={1} className="table-border-1px">
                        <tr>
                            <th>Mail</th>
                            <th>Name</th>
                        </tr>
                        {
                            userData.map(item => {
                                return <tr>
                                    <td>{item.email}</td>
                                    <td>{item.name}</td>
                                </tr>
                            })
                        }
                    </table>
                </>
                :
                "Loading"
            }
        </div>
    )
}

export default UserListTable
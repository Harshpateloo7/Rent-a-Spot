import React, { useEffect, useState } from 'react'
import { deleteUser, fetchUsers } from '../api/api'
import { DeleteModal } from '../components';

const Users = () => {
    const [users, setUsers] = useState()

    // Delete management states
    const [selectedUser, setSelectedUser] = useState()
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    // Used to display multiple Users cards
    const usersRow = () => {
        return users && users.map((item, index) => (
            <tr className='col-md-4' key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{item?.type}</td>
                <td>
                    <button className='btn btn-outline-danger ms-2' onClick={() => handleDelete(item)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                    </button>
                </td>
            </tr>
        ))
    }

    useEffect(() => {
        // Users List API sets users state using setUsers passed as callback function
        fetchUsers({ setUsers })
    }, [])

    const handleDelete = (user) => {
        setSelectedUser(user)
        setShowDeleteModal(true)
    }

    // Used to delete parking
    const handleDeleteUser = () => {
        deleteUser({ id: selectedUser?._id, handleDeleteUserSuccess, handleDeleteUserFailure })
    }

    const handleDeleteUserSuccess = () => {
        fetchUsers({ setUsers })
        setShowDeleteModal(false)
    }

    const handleDeleteUserFailure = () => {
        setShowDeleteModal(false)
    }


    return (
        <div className='container'>
            <h1 className='mt-5'>My Users</h1>

            <div className='row mt-2 g-5 table-responsive'>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Type</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.length > 0 ?
                            usersRow()
                            :
                            <tr className='col-md-4 text-center'>
                                <td colSpan={4}><em>No users found</em></td>
                            </tr>}
                    </tbody>
                </table>
            </div>
            <DeleteModal value={selectedUser?.name} showModal={showDeleteModal} setShowModal={setShowDeleteModal} onDeleteConfirm={handleDeleteUser} />
        </div>
    )
}

export default Users
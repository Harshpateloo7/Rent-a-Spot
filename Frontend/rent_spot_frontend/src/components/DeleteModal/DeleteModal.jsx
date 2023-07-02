import React from 'react'
import './styles.scss'

const DeleteModal = ({ value, showModal, setShowModal, onDeleteConfirm }) => {
    return (
        <div className={`modal ${showModal && 'd-block'}`} tabIndex="-1">
            <div className="modal-dialog shadow-lg">
                <div className="modal-content modal-dark">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete</h5>
                        <button type="button" className="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete <span className='text-warning fw-bolder'>{value}</span>?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={onDeleteConfirm}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
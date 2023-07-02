import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { createReview, deleteReview, fetchReviews } from '../api/api'
import { DeleteModal, StarRating } from '../components';

const Reviews = () => {
    const user = useSelector((state) => state.user);
    const { state } = useLocation()
    const [reviews, setReviews] = useState()

    // Delete management states
    const [selectedReview, setSelectedReview] = useState()
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    // Used to display multiple Reviews cards
    const reviewsRow = () => {
        return reviews && reviews.map((item, index) => (
            <div key={index}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h3>{item?.user_id?.name}</h3>
                        <p className='mb-2'>{item?.message}</p>
                        <StarRating value={item?.rating} readonly />
                    </div>

                    {user?._id === item?.user_id?._id &&
                        <button className='btn btn-outline-danger ms-2' onClick={() => handleDelete(item)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                            </svg>
                        </button>}
                </div>
                <hr />
            </div>

        ))
    }

    useEffect(() => {
        // Reviews List API sets reviews state using setReviews passed as callback function
        fetchReviews({ owner_id: state?.owner_id, setReviews })
    }, [])

    const handleDelete = (review) => {
        setSelectedReview(review)
        setShowDeleteModal(true)
    }

    // Used to delete Review
    const handleDeleteReview = () => {
        deleteReview({ id: selectedReview?._id, handleDeleteReviewSuccess, handleDeleteReviewFailure })
    }

    const handleDeleteReviewSuccess = () => {
        fetchReviews({ owner_id: state?.owner_id, setReviews })
        setShowDeleteModal(false)
    }

    const handleDeleteReviewFailure = () => {
        setShowDeleteModal(false)
    }

    const [form, setForm] = useState({
        message: '',
        rating: 0,
    })

    const [successMessage, setSuccessMessage] = useState()
    const [error, setError] = useState()

    // Handles form values upon change
    const handleFormChange = ({ key, value }) => {
        setForm({ ...form, [key]: value })
    }

    // Create new review API
    const handleCreateReview = () => {
        setSuccessMessage()
        setError()
        const body = { ...form, owner_id: state?.owner_id, user_id: user?._id }
        createReview({ body, handleCreateReviewSuccess, handleCreateReviewFailure })
    }

    const handleCreateReviewSuccess = (data) => {
        fetchReviews({ owner_id: state?.owner_id, setReviews })
        setSuccessMessage('Added successfully!')
        setForm({
            message: '',
            rating: 0,
        })
    }

    const handleCreateReviewFailure = (error) => {
        setError(error)
    }



    return (
        <div className='container'>
            <h1 className='mt-5'>My Reviews</h1>

            <div className='row mt-2 g-5'>
                {reviews?.length > 0 ?
                    reviewsRow()
                    :
                    <em>No reviews found</em>}
                {user?.type === 'seeker' &&
                    <div>
                        {successMessage && <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>}
                        {error && <div className="alert alert-danger" role="alert">
                            {error}
                        </div>}
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <input type="text" className="form-control" id="message" value={form?.message} onChange={(e) => handleFormChange({ key: 'message', value: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Rating</label><br />
                            <StarRating value={form?.rating} onChange={(value) => handleFormChange({ key: 'rating', value })} />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4" onClick={handleCreateReview}>Submit</button>
                    </div>}
            </div>
            <DeleteModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} onDeleteConfirm={handleDeleteReview} />
        </div>
    )
}

export default Reviews
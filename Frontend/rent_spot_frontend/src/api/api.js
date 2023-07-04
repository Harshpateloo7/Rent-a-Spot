import axios from 'axios'
const BASE_URL = "https://rentaspotadmin.onrender.com/"

export const fetchParkings = async ({ user_id, setParkings }) => {
    try {
        let query = '';
        if (user_id) {
            query += `?user_id=${user_id}`
        }
        const result = await axios.get(`${BASE_URL}parking${query}`)
        if (result?.data?.length) {
            setParkings(result?.data)
        }
        console.log('fetchParkings ', result);
    } catch (error) {
        console.error('fetchParkings ', error);
    }
}

export const login = async ({ email, password, handleLoginSuccess, handleLoginFailure }) => {
    try {
        const result = await axios.post(`${BASE_URL}user/login`, { email, password })
        if (result?.data?.token) {
            return handleLoginSuccess(result.data)
        }
        console.log('login ', result);
    } catch (error) {
        console.error('login ', error);
        handleLoginFailure(error?.response?.data?.error)
    }
}

export const register = async ({ name, email, password, type, handleRegisterSuccess, handleRegisterFailure }) => {
    try {
        const result = await axios.post(`${BASE_URL}user/register`, {
            name,
            email,
            password,
            type
        })
        if (result?.data?.name) {
            return handleRegisterSuccess()
        }
        console.log('register ', result);
        handleRegisterFailure('Registration failed')
    } catch (error) {
        console.error('register ', error);
        handleRegisterFailure(error?.response?.data?.error)
    }
}

export const createParking = async ({ body, handleCreateParkingSuccess, handleCreateParkingFailure }) => {
    try {
        const result = await axios.post(`${BASE_URL}parking`, { ...body })
        if (result?.data?.parking) {
            return handleCreateParkingSuccess(result.data)
        }
        console.log('createParking ', result);
    } catch (error) {
        console.error('createParking ', error);
        handleCreateParkingFailure(error?.response?.data?.error)
    }
}

export const updateParking = async ({ id, body, handleUpdateParkingSuccess, handleUpdateParkingFailure }) => {
    try {
        const result = await axios.put(`${BASE_URL}parking/${id}`, { ...body })
        if (result?.data?.message) {
            return handleUpdateParkingSuccess(result.data)
        }
        console.log('updateParking ', result);
    } catch (error) {
        console.error('updateParking ', error);
        handleUpdateParkingFailure(error?.response?.data?.error)
    }
}

export const fetchSpaces = async ({ user_id, parking_id, city, date, time, availability, setSpaces }) => {
    try {
        let query = ''
        if (user_id) {
            query += `user_id=${user_id}&`
        }
        if (parking_id) {
            query += `parking_id=${parking_id}&`
        }
        if (city) {
            query += `city=${city}&`
        }
        if (date) {
            query += `date=${date}&`
        }
        if (time) {
            query += `time=${time}&`
        }
        if (availability) {
            query += `availability=${availability}`
        }
        const result = await axios.get(`${BASE_URL}space?${query}`)
        if (result?.data?.length) {
            setSpaces(result?.data)
        }
        console.log('fetchSpaces ', result);
    } catch (error) {
        console.error('fetchSpaces ', error);
    }
}

export const createSpace = async ({ body, handleCreateSpaceSuccess, handleCreateSpaceFailure }) => {
    try {
        const result = await axios.post(`${BASE_URL}space`, { ...body })
        if (result?.data?.space) {
            return handleCreateSpaceSuccess(result.data)
        }
        console.log('createSpace ', result);
    } catch (error) {
        console.error('createSpace ', error);
        handleCreateSpaceFailure(error?.response?.data?.error)
    }
}

export const updateSpace = async ({ id, body, handleUpdateSpaceSuccess, handleUpdateSpaceFailure }) => {
    try {
        const result = await axios.put(`${BASE_URL}space/${id}`, { ...body })
        if (result?.data?.message) {
            return handleUpdateSpaceSuccess(result.data)
        }
        console.log('updateSpace ', result);
    } catch (error) {
        console.error('updateSpace ', error);
        handleUpdateSpaceFailure(error?.response?.data?.error)
    }
}

export const fetchBookings = async ({ owner_id, user_id, setBookings }) => {
    try {
        let query = '';
        if(user_id){
            query += `user_id=${user_id}&`;
        }
        if(owner_id){
            query += `owner_id=${owner_id}&`;
        }
        const result = await axios.get(`${BASE_URL}booking?${query}`)
        if (result?.data?.length) {
            setBookings(result?.data)
        }
        console.log('fetchBookings ', result);
    } catch (error) {
        console.error('fetchBookings ', error);
    }
}

export const createBooking = async ({ body, handleCreateBookingSuccess, handleCreateBookingFailure }) => {
    try {
        const result = await axios.post(`${BASE_URL}booking`, { ...body })
        console.log('createBooking ', result?.data);
        if (result?.data?.booking) {
            return handleCreateBookingSuccess(result.data)
        }
    } catch (error) {
        console.error('createBooking ', error);
        handleCreateBookingFailure(error?.response?.data?.error)
    }
}

export const resetPassword = async ({ user_id, body, handleResetPasswordSuccess, handleResetPasswordFailure }) => {
    try {
        console.log('body ', body);
        const result = await axios.post(`${BASE_URL}user/resetPassword/${user_id}`, { ...body })
        console.log('resetPassword ', result?.data);
        if (result?.data?.user) {
            return handleResetPasswordSuccess(result.data)
        }
    } catch (error) {
        console.error('resetPassword ', error);
        handleResetPasswordFailure(error?.response?.data?.error)
    }
}

export const updateUser = async ({ user_id, body, handleUpdateUserSuccess, handleUpdateUserFailure }) => {
    try {
        console.log('body ', body);
        const result = await axios.put(`${BASE_URL}user/${user_id}`, { ...body })
        console.log('updateUser ', result?.data);
        if (result?.data?.user) {
            return handleUpdateUserSuccess(result.data)
        }
    } catch (error) {
        console.error('updateUser ', error);
        handleUpdateUserFailure(error?.response?.data?.error)
    }
}

export const deleteParking = async ({ id, handleDeleteParkingSuccess, handleDeleteParkingFailure }) => {
    try {
        const result = await axios.delete(`${BASE_URL}parking/${id}`)
        if (result?.data?.message) {
            return handleDeleteParkingSuccess(result.message)
        }
        console.log('deleteParking ', result);
    } catch (error) {
        console.error('deleteParking ', error);
        handleDeleteParkingFailure(error?.response?.data?.error)
    }
}


export const deleteSpace = async ({ id, handleDeleteSpaceSuccess, handleDeleteSpaceFailure }) => {
    try {
        const result = await axios.delete(`${BASE_URL}space/${id}`)
        if (result?.data?.message) {
            return handleDeleteSpaceSuccess(result.message)
        }
        console.log('deleteSpace ', result);
    } catch (error) {
        console.error('deleteSpace ', error);
        handleDeleteSpaceFailure(error?.response?.data?.error)
    }
}

export const deleteBooking = async ({ id, handleDeleteBookingSuccess, handleDeleteBookingFailure }) => {
    try {
        const result = await axios.delete(`${BASE_URL}booking/${id}`)
        if (result?.data?.message) {
            return handleDeleteBookingSuccess(result.message)
        }
        console.log('deleteBooking ', result);
    } catch (error) {
        console.error('deleteBooking ', error);
        handleDeleteBookingFailure(error?.response?.data?.error)
    }
}

export const updateBooking = async ({ id, body, handleUpdateBookingSuccess, handleUpdateBookingFailure }) => {
    try {
        const result = await axios.put(`${BASE_URL}booking/${id}`, { ...body })
        if (result?.data?.message) {
            return handleUpdateBookingSuccess(result.data?.message)
            console.log('updateBooking >>>>  ', result?.data);
        }
    } catch (error) {
        console.error('updateBooking ', error);
        handleUpdateBookingFailure(error?.response?.data?.error)
    }
}

export const fetchReviews = async ({ owner_id, setReviews }) => {
    try {
        let query = '';
        if (owner_id) {
            query += `?owner_id=${owner_id}`
        }
        const result = await axios.get(`${BASE_URL}review${query}`)
        if (result?.data?.length) {
            setReviews(result?.data)
        }
        console.log('fetchReviews ', result);
    } catch (error) {
        console.error('fetchReviews ', error);
    }
}

export const createReview = async ({ body, handleCreateReviewSuccess, handleCreateReviewFailure }) => {
    try {
        const result = await axios.post(`${BASE_URL}review`, { ...body })
        if (result?.data) {
            return handleCreateReviewSuccess(result.data)
        }
        console.log('createReview ', result);
    } catch (error) {
        console.error('createReview ', error);
        handleCreateReviewFailure(error?.response?.data?.error)
    }
}

export const deleteReview = async ({ id, handleDeleteReviewSuccess, handleDeleteReviewFailure }) => {
    try {
        const result = await axios.delete(`${BASE_URL}review/${id}`)
        if (result?.data?.message) {
            return handleDeleteReviewSuccess(result.message)
        }
        console.log('deleteReview ', result);
    } catch (error) {
        console.error('deleteReview ', error);
        handleDeleteReviewFailure(error?.response?.data?.error)
    }
}

export const fetchUsers = async ({ setUsers }) => {
    try {
        const result = await axios.get(`${BASE_URL}user`)
        if (result?.data?.length) {
            setUsers(result?.data)
        }
        console.log('fetchUsers ', result);
    } catch (error) {
        console.error('fetchUsers ', error);
    }
}

export const deleteUser = async ({ id, handleDeleteUserSuccess, handleDeleteUserFailure }) => {
    try {
        console.log(`URL >> ${BASE_URL}user/delete/${id}`);
        const result = await axios.delete(`${BASE_URL}user/delete/${id}`)
        if (result?.data?.message) {
            return handleDeleteUserSuccess(result.message)
        }
        console.log('deleteUser ', result);
    } catch (error) {
        console.error('deleteUser ', error);
        handleDeleteUserFailure(error?.response?.data?.error)
    }
}

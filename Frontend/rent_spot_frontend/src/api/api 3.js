import axios from 'axios'
const BASE_URL = "http://localhost:3000/"

export const fetchParkings = async (setParkings) => {
    try {
        const result = await axios.get(`${BASE_URL}parking`)
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

export const fetchSpaces = async ({ parking_id, city, date, time, availability, setSpaces }) => {
    try {
        let query = ''
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

export const fetchBookings = async ({ user_id, setBookings }) => {
    try {
        const result = await axios.get(`${BASE_URL}booking?user_id=${user_id}`)
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
        if (result?.data?.booking) {
            return handleCreateBookingSuccess(result.data)
        }
        console.log('createBooking ', result);
    } catch (error) {
        console.error('createBooking ', error);
        handleCreateBookingFailure(error?.response?.data?.error)
    }
}

export const resetPassword = async ({ body, handleResetPasswordSuccess, handleResetPasswordFailure }) => {
    try {
        const result = await axios.post(`${BASE_URL}user/resetPassword`, { ...body })
        if (result?.data) {
            return handleResetPasswordSuccess(result.data)
        }
        console.log('createParking ', result);
    } catch (error) {
        console.error('createParking ', error);
        handleResetPasswordFailure(error?.response?.data?.error)
    }
}

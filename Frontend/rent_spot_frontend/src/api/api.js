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

export const login = async ({ email, password }) => {
    try {
        console.log('LOGIN =====');
        console.log('email ', email);
        console.log('password ', password);
        const result = await axios.post(`${BASE_URL}user/login`, { email, password })
        if (result?.data?.token) {
            return true
        }
        console.log('login ', result);
        return false
    } catch (error) {
        console.error('login ', error);
        return false
    }
}

export const register = async ({ name, email, password, type }) => {
    try {
        console.log('REGISTER =======');
        console.log('name ', name);
        console.log('email ', email);
        console.log('password ', password);
        console.log('type ', type);
        const result = await axios.post(`${BASE_URL}user/register`, {
            name,
            email,
            password,
            type
        })
        if (result?.data?.name) {
            return true
        }
        console.log('register ', result);
        return false
    } catch (error) {
        console.error('register ', error);
        return false
    }
}
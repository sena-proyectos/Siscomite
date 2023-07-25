import axios from 'axios'

const BaseUrl = 'http://localhost:3000'
const api = '/api'

/* Get users */
export const getUsers = () => {
    const URL = `${BaseUrl}${api}/users`
    const response = axios.get(URL)

    return response
}

/* Get teachers */
export const getTeachers = () => {
    const URL = `${BaseUrl}${api}/teachers`
    const response = axios.get(URL)

    return response
}


/* Login */
export const login = (data) => {
    const URL = `${BaseUrl}${api}/login`
    const response = axios.post(URL, data)

    return response
}

/* Register */
export const register = (data) => {
    const URL = `${BaseUrl}${api}/register`
    const response = axios.post(URL, data)
    
    return response
}

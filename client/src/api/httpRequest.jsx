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

/* Get teachers by name */
export const getTeacherByName = (nombres) => {
  const URL = `${BaseUrl}${api}/searchTeacher?nombres=${nombres}`
  const response = axios.get(URL)

  return response
}

/* Get user by name */
export const getApprenticesByName = (nombres) => {
  const URL = `${BaseUrl}${api}/searchUser?nombres=${nombres}`
  const response = axios.get(URL)

  return response
}

/* Get appretices by id_ficha */
export const getApprenticesByIdFicha = (idFicha) => {
  const URL = `${BaseUrl}${api}/aprendices?idFicha=${idFicha}`
  const response = axios.get(URL)

  return response
}

/* Get apprentices by ID */
export const getApprenticesById = (userId) => {
  const URL = `${BaseUrl}${api}/aprendiz/${userId}`
  const response = axios.get(URL)

  return response
}

/* Create Request */
export const createRequest = (data) => {
  const URL = `${BaseUrl}${api}/createSolicitud`
  const response = axios.post(URL, data)

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

/* Create ficha */
export const createFicha = (data) => {
  const URL = `${BaseUrl}${api}/createFicha`
  const response = axios.post(URL, data)

  return response
}

/* get fichas */
export const getFichas = () => {
  const URL = `${BaseUrl}${api}/fichas`
  const response = axios.get(URL)

  return response
}

/* get fichas by id */
export const getFichasById = (id) => {
  const URL = `${BaseUrl}${api}/fichas/${id}`
  const response = axios.get(URL)

  return response
}

/* Create apprentices */
export const createApprentices = (data) => {
  const URL = `${BaseUrl}${api}/createAprendiz`
  const response = axios.post(URL, data)

  return response
}

/* Search appretices by id_ficha */
export const searchApprenticesByIdFicha = (idFicha, nombres) => {
  const URL = `${BaseUrl}${api}/aprendicesByGroups?idFicha=${idFicha}&nombres=${nombres}`
  const response = axios.get(URL)

  return response
}

/* Get coordination */
export const getCoordination = () => {
  const URL = `${BaseUrl}${api}/coordination`
  const response = axios.get(URL)

  return response
}
/* Get reglamento */
export const getRules = () => {
  const URL = `${BaseUrl}${api}/getRules`
  const response = axios.get(URL)
  return response
}

/* get instructors by id */
export const getInstructorById = (idInstructor) => {
  const URL = `${BaseUrl}${api}/user/${idInstructor}`
  const response = axios.get(URL)

  return response
}

/* get request */
export const getRequest = () => {
  const URL = `${BaseUrl}${api}/solicitudes`
  const response = axios.get(URL)

  return response
}

/* get request by id */
export const getRequestById = (idRequest) => {
  const URL = `${BaseUrl}${api}/solicitud/${idRequest}`
  const response = axios.get(URL)
  
  return response
}

/* get request by id user */
export const getRequestByIdUser = (userID) => {
  const URL = `${BaseUrl}${api}/solicitudByIdUser/${userID}`
  const response = axios.get(URL)

  return response
}

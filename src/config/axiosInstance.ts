import axios from 'axios'

const API_URL = 'https://localhost:7154/api/'

const axiosInstance = axios.create({
  baseURL: API_URL,
})

axiosInstance.interceptors.request.use(
  (config) => {
      //ToDO: change value token for real
      const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJqb2ZlbHZpMDdAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJlZDMzM2JlZC1kMGUwLTRkMjQtYmY3OS02YTA1MWFmODQ4N2EiLCJqdGkiOiI2MjY5YzE4Ni01MzIwLTQ0ZGMtOTMxOS0wOGQwYTQ5MmIyMjUiLCJleHAiOjE3MTk3NjAxMDYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcxNTQiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MTU0In0.0XqQkZ0J91PDfTq_vwJGUHhsy-1Mifmy_pFDtsogHQE" //localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
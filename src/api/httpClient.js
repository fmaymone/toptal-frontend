import axios from 'axios' 


const post = (url = '', data = '', config = {}) => {
    return axios.post(url, data, config)
}

const get = (url) => {
    axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NTAwNjM2NjN9.LXFwGLIFoD6zM68w1wAE0Wb8gVr_WmGI_B3P6BnAC7E'
    axios.defaults.headers.common['Accept'] = 'application/vnd.trips.v1+json'
    return axios.get(url)
}

const put = (url = '', data = '', config = {}) => {
    axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NTAwNjM2NjN9.LXFwGLIFoD6zM68w1wAE0Wb8gVr_WmGI_B3P6BnAC7E'
    axios.defaults.headers.common['Accept'] = 'application/vnd.trips.v1+json'
    return axios.put(url, data, config)
}

const del = (url = '', config = {}) => {
    return axios.delete(url, config)
}

const HttpClient = {
    post,
    get,
    put,
    delete: del
}

export {HttpClient}
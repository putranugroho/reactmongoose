import axios from 'axios'

export default axios.create(
    {
        baseURL: 'https://mongooseputra.herokuapp.com'
    }
)
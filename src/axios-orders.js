import axios from 'axios';

const instance = axios.create(
    {
        baseURL : 'https://react-my-burger-9829a.firebaseio.com'
    }
)

export default instance;
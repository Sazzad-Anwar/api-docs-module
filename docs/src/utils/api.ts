import axios from 'axios';
import Config from '../../public/config.json';

let api = axios.create({
    baseURL: Config.baseUrl,
});

export default api;

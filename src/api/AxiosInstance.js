import axios from 'axios';

const API_BACKEND = 'http://135.181.35.61:2112/';

export const instance = axios.create({
    baseURL: API_BACKEND,
    headers: { 'Content-Type': 'application/json' },
});

export default instance;

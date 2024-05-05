import axios from 'axios';

const devHost = 'http://127.0.0.1:3000/';

const apiAxios = axios.create({
  baseURL: devHost,
  createBundleRenderer: false,
});

apiAxios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
});

export { apiAxios };

import axios from 'axios';

const devHost = 'http://127.0.0.1:3000';

const apiAxios = axios.create({
  baseURL: devHost,
  createBundleRenderer: false,
});

export { apiAxios };

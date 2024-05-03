import { apiAxios } from './host';

class ImageService {
  prefix = 'images/';

  async getAll() {
    return apiAxios.get(this.prefix);
  }

  async getById(id) {
    return apiAxios.get(`${this.prefix}/${id}`);
  }
}

export default new ImageService();
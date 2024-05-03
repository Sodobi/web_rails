import { apiAxios } from './host';

class ThemeService {
  prefix = 'themes/';

  async getAll() {
    return apiAxios.get(this.prefix);
  }

  async getById(id) {
    return apiAxios.get(`${this.prefix}/${id}`);
  }
}

export default new ThemeService();

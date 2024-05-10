import { apiClient } from './host';

class AuthService {
  #prefixLogin = 'auth/login';
  #prefixLogout = 'auth/logout';
  #prefixUser = 'users/';

  async signIn(data) {
    return apiClient.post(this.#prefixLogin, data);
  }

  async signUp(data) {
    return apiClient.post(this.#prefixUser, data);
  }

  async signOut() {
    const res = await fetch(this.#prefixLogout);
    if (!res.ok) throw new Error(`status: ${res.status}. Status text: ${res.statusText}`);
  }
}

export default new AuthService();

import axios from 'axios';

class AuthService {
  #prefixLogin = 'auth/login';
  #prefixLogout = 'auth/logout';
  #prefixUser = 'users/';

  async signIn(data, csrfToken) {
    return axios.post(this.#prefixLogin, data, { headers: { 'X-CSRF-Token': csrfToken } });
  }

  async signUp(data, csrfToken) {
    return axios.post(this.#prefixUser, data, { headers: { 'X-CSRF-Token': csrfToken } });
  }

  async signOut() {
    const res = await fetch(this.#prefixLogout);
    if (!res.ok) throw new Error(`status: ${res.status}. Status text: ${res.statusText}`);
  }
}

export default new AuthService();

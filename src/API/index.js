import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sheffchenk0.github.io/bcraft-test/db.json',
});

export const API = {
  login: (login, password) => {
    return instance.get('', { type: 'LOG_IN', login, password }).then((response) => response);
  },
  signup: (login, password) => {
    return instance.get('', { type: 'SIGN_IN', login, password }).then((response) => response);
  },
  changePassword: (login, password) => {
    return instance
      .get('', { type: 'CHANGE_PASSWORD', login, password })
      .then((response) => response);
  },
};

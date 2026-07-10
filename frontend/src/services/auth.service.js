import api from './api';

export const registerRequest = (data) => api.post('/auth/register', data).then((res) => res.data);
export const loginRequest = (data) => api.post('/auth/login', data).then((res) => res.data);
export const logoutRequest = () => api.post('/auth/logout').then((res) => res.data);
export const getMeRequest = () => api.get('/auth/me').then((res) => res.data);

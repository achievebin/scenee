import axiosInstance from './axiosInstance.js';

export function sendInquiry(payload) {
  // payload = { name, email, subject, message }
  return axiosInstance.post('/contact', payload);
}

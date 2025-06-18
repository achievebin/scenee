import axiosInstance from './axiosInstance.js';

export function sendInquiry(payload) {
  // payload = { name, email, subject, message }
  return axiosInstance.post('/api/contact', payload);
}

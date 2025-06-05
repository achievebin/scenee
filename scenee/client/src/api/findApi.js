// src/api/findApi.js
import axiosInstance from './axiosInstance';

/*
 * 아이디 찾기 API 호출: POST /api/find/id
 * @param {{ email: string }} payload
 */
export function getIdByEmail({ email }) {
  return axiosInstance.post('/api/find/id', { email });
}

/*
 * 비밀번호 찾기 요청 API 호출: POST /api/find/password/request
 * @param {{ email: string }} payload
 */
export function requestPasswordReset({ email }) {
  return axiosInstance.post('/api/find/password/request', { email });
}

/*
 * 비밀번호 재설정 API 호출: POST /api/find/password/reset
 * @param {{ token: string, newPassword: string }} payload
 */
export function resetPassword({ token, newPassword }) {
  return axiosInstance.post('/api/find/password/reset', { token, newPassword });
}

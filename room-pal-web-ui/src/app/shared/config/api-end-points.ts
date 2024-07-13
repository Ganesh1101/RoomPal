const BASE_URL = 'http://106.51.138.23:3001/api'

export const API_ENDPOINTS = {
  AUTH_REGISTER: { url: `${BASE_URL}/auth/register`, method: 'POST' },
  AUTH_SIGN_IN: { url: `${BASE_URL}/auth/signIn`, method: 'POST' },
  ROOM_CREATE: { url: `${BASE_URL}/room/create`, method: 'POST' },
  FEEDBACK_GIVE: { url: `${BASE_URL}/feedback/giveFeedback`, method: 'POST' },
  ROOM_GET_ALL: { url: BASE_URL + '/room/getAll', method: 'GET' },
  ROOM_UPDATE: { url: `${BASE_URL}/room/update`, method: 'PUT' },
  FEEDBACK_GET_ALL: {
    url: `${BASE_URL}/feedback/getAllFeedback`,
    method: 'GET',
  },
  RATING_GIVE: { url: `${BASE_URL}/rating/giverating`, method: 'POST' },
  RATING_GET: { url: `${BASE_URL}/rating/getRating`, method: 'GET' },
  RATING_GET_ALL: { url: `${BASE_URL}/rating/getAllRatings`, method: 'GET' },
  RATING_TOTAL: { url: `${BASE_URL}/rating/totalRatings`, method: 'GET' },
  ORDER_WEBHOOK: { url: `${BASE_URL}/order/webhook`, method: 'POST' },
  ORDER_FETCH: { url: `${BASE_URL}/order/fetch-order`, method: 'GET' },
  ORDER_CREATE: { url: `${BASE_URL}/order/create-order`, method: 'POST' },
  ORDER_GET_ALL: { url: `${BASE_URL}/order/getAll`, method: 'GET' },
  REFUND_CREATE: { url: `${BASE_URL}/refund/create`, method: 'POST' },
  REFUND_FETCH_ALL: { url: `${BASE_URL}/refund/fetchAll`, method: 'GET' },
  REFUND_FETCH: { url: `${BASE_URL}/refund/fetch`, method: 'GET' },
  PAYMENT_PROCESS: { url: `${BASE_URL}/payment/payment`, method: 'POST' },
  AUTH_FORGOT_PASSWORD: {
    url: `${BASE_URL}/auth/forgotPassword`,
    method: 'POST',
  },
  AUTH_VERIFY_OTP: { url: `${BASE_URL}/auth/verifyOTP`, method: 'POST' },
  AUTH_RESET_PASSWORD: {
    url: `${BASE_URL}/auth/resetPassword`,
    method: 'POST',
  },
  PAYMENT_CREATE: { url: `${BASE_URL}/payment/create-payment`, method: 'POST' },
}

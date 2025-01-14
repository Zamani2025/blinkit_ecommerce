const SummaryApi = {
  register: {
    url: "api/user/register",
    method: "post",
  },
  verify_email: {
    url: "api/user/verify-email",
    method: "post",
  },
  login: {
    url: "api/user/login",
    method: "post",
  },
  logout: {
    url: "api/user/logout",
    method: "get",
  },
  forgot_password: {
    url: "api/user/forgot-password",
    method: "post",
  },
  verify_otp: {
    url: "api/user/verify-forgot-password-otp",
    method: "post",
  },
  reset_password: {
    url: "api/user/reset-password",
    method: "post",
  },
  fetch_user: {
    url: "api/user/get-user",
    method: "get",
  },
};

export default SummaryApi;

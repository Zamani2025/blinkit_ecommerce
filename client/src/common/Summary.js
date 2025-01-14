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
  upload_avatar: {
    url: "api/user/upload-avatar",
    method: "post",
  },
  update_profile: {
    url: "api/user/update-user",
    method: "put",
  },
  add_category: {
    url: "api/category/create-category",
    method: "post",
  },
  get_category: {
    url: "api/category/get-categories",
    method: "get",
  },
  update_category: {
    url: "api/category/update-category",
    method: "put",
  },
  delete_category: {
    url: "api/category/delete-category",
    method: "delete",
  },
  upload_image: {
    url: "api/file/upload-image",
    method: "post",
  },
};

export default SummaryApi;

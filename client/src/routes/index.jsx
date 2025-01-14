import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import SearchPage from "../pages/SearchPage";
import VerifyEmailPage from "../pages/VerifyEmailPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import VerifyOtpPage from "../pages/VerifyOtpPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import Dashboard from "../layouts/Dashboard";
import ProfilePage from "../pages/ProfilePage";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import ProductAdmin from "../pages/ProductAdmin";
import UploadProductPage from "../pages/UploadProductPage";
import OrdersPage from "../pages/OrdersPage";
import AddressPage from "../pages/AddressPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "verify-email",
        element: <VerifyEmailPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtpPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "dashboard/",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />
          },
          {
            path: "category",
            element: <CategoryPage />
          }, 
          {
            path: "sub-category",
            element: <SubCategoryPage />
          },
          {
            path: "product",
            element: <ProductAdmin />
          },
          {
            path: "upload-product",
            element: <UploadProductPage />
          },
          {
            path: "orders",
            element: <OrdersPage />
          },
          {
            path: "address",
            element: <AddressPage />
          }
        ]
      }
    ],
  },
]);

export default router;

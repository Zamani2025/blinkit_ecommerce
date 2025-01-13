import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import SearchPage from "../pages/SearchPage";
import VerifyEmailPage from "../pages/VerifyEmailPage";

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
                element: <VerifyEmailPage />
            }
        ],
    },
]);

export default router;
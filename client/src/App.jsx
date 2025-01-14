import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import SummaryApi from "./common/Summary";
import Axios from "./config/axios";
import AxiosToastError from "./config/AxiosToastError";
import { useDispatch } from "react-redux";
import { getUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.fetch_user,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        dispatch(getUserDetails(response?.data?.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    window.scrollTo(0, 0);
    document.title = "Blinkit Ecommerce";
  }, []);

  return (
    <>
      <ToastContainer theme="colored" />
      <Header />
      <main className="h-[82vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;

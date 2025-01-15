import React, { useEffect, useState } from "react";
import AxiosToastError from "../config/AxiosToastError";
import SummaryApi from "../common/Summary";
import Axios from "../config/axios";
import ProductAdminCard from "../components/ProductAdminCard";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import NoDataComponent from "../components/NoDataComponent";

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalNoPages, setTotalNoPages] = useState(0);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const user = localStorage.getItem("user");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.get_products,
        data: { limit, page, search },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        setProducts(response?.data?.data);
        setTotalNoPages(response?.data?.totalNoPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
    if (JSON.parse(user)?.role !== "admin") {
      window.location.href = "/";
    }
  }, [limit, page, search]);

  const handleNext = () => {
    if (page < totalNoPages) {
      setPage(page + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <section className="container mx-auto p-4">
      <div className="px-4 py-2 bg-white rounded flex items-center justify-between gap-2">
        <h1 className="font-bold">Products</h1>
        <input
          type="search"
          onChange={handleSearch}
          value={search}
          placeholder="Search here..."
          className="border bg-slate-50 border-gray-300 outline-none focus-within:border-yellow-400 rounded px-2 py-1"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center mt-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-t-2 border-gray-900"></div>
        </div>
      ) : products.length == 0 ? (
        <NoDataComponent />
      ) : (
        <>
          <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6 gap-2 mt-4">
            {products.map((product) => (
              <ProductAdminCard key={product._id} product={product} fetchProducts={fetchProducts} />
            ))}
          </div>
          <div className="flex items-center justify-center lg:justify-between gap-2 mt-8">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="p-2 bg-yellow-400 text-white rounded-full"
            >
              <FaAnglesLeft />
            </button>
            <div className="w-fit py-1 px-4 border border-yellow-400 rounded font-semibold">
              {page} of {totalNoPages}
            </div>
            <button
              onClick={handleNext}
              disabled={page == totalNoPages}
              className={`${
                page == totalNoPages ? "cursor-not-allowed" : "cursor-pointer"
              } p-2  bg-yellow-400 text-white rounded-full`}
            >
              <FaAnglesRight />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductAdmin;

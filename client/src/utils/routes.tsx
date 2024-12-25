import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import ProductPage from "../pages/ProductPage";
import ProductDetail from "../pages/ProductDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/products",
    element: <ProductPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/products/:productName",
    element: <ProductDetail />,
    errorElement: <ErrorPage />,
  },




]);

export default router;
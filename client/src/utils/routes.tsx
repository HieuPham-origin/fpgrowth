import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import ProductPage from "../pages/ProductPage";
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



]);

export default router;
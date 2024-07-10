import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import CreateDeliveryPage from "./pages/CreateDeliveryPage.tsx";
import CreatePackagePage from "./pages/CreatePackagePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import HomePage from "./pages/HomePage.tsx";

import 'leaflet/dist/leaflet.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/create-package",
        element: <CreatePackagePage />,
      },
      {
        path: "/create-delivery",
        element: <CreateDeliveryPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

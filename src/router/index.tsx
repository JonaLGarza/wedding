import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "../layout/MainLayout";
import { LazyWrapper } from "../components/atoms/LazyWrapper/LazyWrapper";

const HomePage = lazy(() => import("../pages/Home"));
const EditRSVPPage = lazy(() => import("../pages/EditRSVP"));
const WeatherDemoPage = lazy(() => import("../pages/WeatherDemo"));
const FallbackMessage = lazy(() => import("../components/molecules/FallBackMessage/FallBackMessage"));

export const router = createBrowserRouter([
  {
    path: "/wedding",
    element: <MainLayout />,
    errorElement: <FallbackMessage />,
    children: [
      {
        element: <LazyWrapper />,
        errorElement: <FallbackMessage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "rsvp/edit/:code", element: <EditRSVPPage /> },
          { path: "weather-demo", element: <WeatherDemoPage /> },
        ],
      },
    ],
  },
]);

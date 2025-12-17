import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import CardDetails from "../components/CardDetails";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MySelection from "../components/MySelection";
import ApplicantInfo from "../components/ApplicantInfo";
import AllScholarShips from "../components/AllScholarShips";
import Payment from "../layouts/Payment";
import PaymentSuccess from "../layouts/PaymentSuccess";
import PaymentCancel from "../layouts/PaymentCancel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-scholarships",
        Component: AllScholarShips,
      },
      {
        path: "/all-scholarships/:id",
        element: <CardDetails></CardDetails>,
      },
      {
        path: "/all-scholarships/payment/:selectId",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-scholarships/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-scholarships/payment-cancelled",
        element: (
          <PrivateRoute>
            <PaymentCancel></PaymentCancel>
          </PrivateRoute>
        ),
      },
      {
        path: "all-scholarships/:id/applicant-info",
        element: (
          <PrivateRoute>
            <ApplicantInfo />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),

    children: [
      {
        path: "my-selection",
        Component: MySelection,
      },
    ],
  },
]);

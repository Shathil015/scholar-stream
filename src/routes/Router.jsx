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
import Payment from "../pages/Dashboard/Payment";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/PaymentCancel";
import AllScholarShips from "../components/AllScholarShips";

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
        path: "payment/:selectId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel,
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

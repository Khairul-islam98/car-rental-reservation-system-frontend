import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import AboutUs from "@/pages/About/AboutUs";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import UserDashboard from "@/pages/dashboard/users/UserDashboard";
import ManageCar from "@/pages/dashboard/admin/managecar/ManageCar";
import Dashboard from "@/pages/dashboard/Dashboard";
import ManageBooking from "@/pages/dashboard/admin/managebooking/ManageBooking";
import ContactUs from "@/pages/contact/ContactUs";
import Car from "@/pages/car/Car";
import CarDetails from "@/pages/cardetails/CarDetails";
import ManageReturnCar from "@/pages/dashboard/admin/managereturncar/ManageReturnCar";
import UserManagement from "@/pages/dashboard/admin/usermanagement/UserManagement";
import BookingManagement from "@/pages/dashboard/users/bookingmanagement/BookingManagement";
import ForgetPassword from "@/pages/forgetpassword/ForgetPassword";
import ChangePassword from "@/pages/changepassword/ChangePassword";
import Booking from "@/pages/booking/Booking";
import BookingForm from "@/pages/bookingform/BookingForm";
import ConfirmBooking from "@/pages/confirmation/ConfirmBooking";
import PaymentManagement from "@/pages/dashboard/users/paymentmanagement/PaymentManagement";
import Success from "@/pages/success/Success";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorPage from "@/components/ErrorPage";

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/booking",
        element: <ProtectedRoute role=""><Booking /></ProtectedRoute>,
      },
      {
        path: "/booking-form/:id",
        element: <ProtectedRoute role=""><BookingForm /></ProtectedRoute>,
      },
      {
        path: "/confirm-booking",
        element: <ProtectedRoute role=""><ConfirmBooking /></ProtectedRoute>,
      },
      {
        path: "/cars",
        element: <Car />,
      },
      {
        path: "/car-details/:id",
        element: <ProtectedRoute role=""><CarDetails /></ProtectedRoute>,
      },
      {
        path: "/success",
        element: <ProtectedRoute role=""><Success  /></ProtectedRoute>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/reset-password",
        element: <ChangePassword />,
      },
  
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>,
    children: [
      {
        path: "dashboard",
        element: <ProtectedRoute role="admin"><Dashboard /></ProtectedRoute>,
      },
      {
        path: "manage-cars",
        element: <ProtectedRoute role="admin"><ManageCar /></ProtectedRoute>,
      },
      {
        path: "manage-bookings",
        element: <ProtectedRoute role="admin"><ManageBooking /></ProtectedRoute>,
      },
      {
        path: "manage-return-cars",
        element: <ProtectedRoute role="admin"><ManageReturnCar /></ProtectedRoute>,
      },
      {
        path: "manage-users",
        element: <ProtectedRoute role="admin"><UserManagement /></ProtectedRoute>,
      },
    ],
  },
  {
    path: "/user",
    element: <ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>,
    children: [
      {
        path: "dashboard",
        element: <ProtectedRoute role="user"><Dashboard /></ProtectedRoute>,
      },
      {
        path: "booking-management",
        element: <ProtectedRoute role="user"><BookingManagement /></ProtectedRoute>,

      },
      {
        path: "payment-management",
        element: <ProtectedRoute role="user"><PaymentManagement  /></ProtectedRoute>

      }
    ]
  },
]);

export default router;

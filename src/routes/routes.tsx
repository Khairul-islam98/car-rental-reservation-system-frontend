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

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        element: <Booking />,
      },
      {
        path: "/booking-form/:id",
        element: <BookingForm />,
      },
      {
        path: "/confirm-booking",
        element: <ConfirmBooking />,
      },
      {
        path: "/cars",
        element: <Car />,
      },
      {
        path: "/car-details/:id",
        element: <CarDetails />,
      },
      {
        path: "/success",
        element: <Success  />,
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
    element: <AdminDashboard />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "manage-cars",
        element: <ManageCar />,
      },
      {
        path: "manage-bookings",
        element: <ManageBooking />,
      },
      {
        path: "manage-return-cars",
        element: <ManageReturnCar />,
      },
      {
        path: "manage-users",
        element: <UserManagement />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserDashboard />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "booking-management",
        element: <BookingManagement />

      },
      {
        path: "payment-management",
        element: <PaymentManagement  />

      }
    ]
  },
]);

export default router;

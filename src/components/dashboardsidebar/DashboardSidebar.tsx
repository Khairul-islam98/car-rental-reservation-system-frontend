import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import ThemeMode from "../ThemeMode";
import { useState } from "react";

const DashboardSidebar = () => {
  const user = useAppSelector(selectCurrentUser);


  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const adminRoutes = [
    {
      name: "Dashboard",
      path: "dashboard",
    },
    {
      name: "Manage Cars",
      path: "manage-cars",
    },
    {
      name: "Manage Bookings",
      path: "manage-bookings",
    },
    {
      name: "Manage Return Cars",
      path: "manage-return-cars",
    },
    {
      name: "User Management",
      path: "manage-users",
    },
  ];

  const userRoutes = [
    {
      name: "Dashboard",
      path: "dashboard",
    },
    {
      name: "Booking Management",
      path: "booking-management",
    },
    {
      name: "Payment Management",
      path: "payment-management",
    },
  ];
  const [, setTheme] = useState<string>('light');

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);

  };
  return (
    <>
      <div className="w-[320px] px-4 py-8 border-r h-[700px]  hidden lg:block">
        {/* Logo */}
        <div className="max-w-[160px] pb-4 text-center mx-auto">
          <h1 className="mb-4 text-gray-600 dark:text-white">
            Welcome Car <span className="text-[#FEA633]">Rental</span> 😍
          </h1>
          <div className="border-y-4 mt-2 size-10 rounded-full animate-bounce mx-auto border-[#FEA633] ..."><ThemeMode onToggleTheme={handleThemeChange} /></div>
          <h2 className="font-bold uppercase text-gray-600 dark:text-white">{user?.name}</h2>
         
        </div>
        <div className="flex flex-col justify-between h-full">
          {/* routes */}
          <div className="flex flex-col gap-4 py-8 border-t">
            {user?.role === "admin"
              ? adminRoutes.map((item) => (
                  <NavLink
                    key={item.path}
                    className={({ isActive }) =>
                      `text-gray-600 hover:text-[#FEA633] p-2 flex gap-3 items-center text-lg rounded-xl dark:text-white ${
                        isActive && "text-[#FEA633] border-l-4 border-[#FEA633]"
                      }`
                    }
                    to={item.path}
                  >
                    {item.name}
                  </NavLink>
                ))
              : userRoutes.map((item) => (
                  <NavLink
                    key={item.path}
                    className={({ isActive }) =>
                      `text-gray-600 hover:text-[#FEA633] p-2 flex gap-3 items-center text-lg rounded-xl dark:text-white ${
                        isActive && "text-[#FEA633] border-l-4 border-[#FEA633]"
                      }`
                    }
                    to={item.path}
                  >
                    {item.name}
                  </NavLink>
                ))}
          </div>
          {/* Profile & Logout */}
          <div className="flex flex-col gap-8 pt-8 border-t">
            {/* Profile */}
            <div className="flex gap-3 items-center">
              <Link to="/" className="w-full">
                <Button className="w-full mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl">
                  <span className="relative z-10 uppercase"> Home</span>
                </Button>
              </Link>
            </div>
            {/* Logout */}
            <Button
              onClick={handleLogout}
              className="w-full mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl"
            >
              <span className="relative z-10">LOGOUT</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between h-20 bg-second  px-3 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="text-xl font-medium bg-transparent p-0 bg-second hover:bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent className=" overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="mb-4 text-gray-600 text-center">
                Welcome Car <span className="text-[#FEA633]">Rental</span> 😍
              </SheetTitle>
              <p className="border-y-4 mt-2 size-10 rounded-full animate-bounce mx-auto border-[#FEA633] ..."></p>
              <SheetTitle className="font-bold uppercase text-gray-600 text-center">
                {user?.name}
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4 py-8 border-t">
                {user?.role === "admin"
                  ? adminRoutes.map((item) => (
                      <SheetClose asChild key={item.path}>
                        <NavLink
                          className={({ isActive }) =>
                            `text-gray-600 hover:text-[#FEA633] flex gap-3 items-center text-lg rounded-xl p-2 border-b dark:text-white${
                              isActive &&
                              "text-[#FEA633] border-l-4 border-[#FEA633]"
                            }`
                          }
                          to={item.path}
                        >
                          {item.name}
                        </NavLink>
                      </SheetClose>
                    ))
                  : userRoutes.map((item) => (
                      <SheetClose asChild key={item.path}>
                       <NavLink
                    key={item.path}
                    className={({ isActive }) =>
                      `text-gray-600 hover:text-[#FEA633] p-2 flex gap-3 items-center text-lg rounded-xl dark:text-white ${
                        isActive && "text-[#FEA633] border-l-4 border-[#FEA633]"
                      }`
                    }
                    to={item.path}
                  >
                    {item.name}
                  </NavLink>
                      </SheetClose>
                    ))}
              </div>
              <div className="flex flex-col pt-8 border-t h-full w-full gap-8">
                <div className="flex gap-3 items-center py-11">
                <Link to="/" className="w-full">
                <Button className="w-full mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl">
                  <span className="relative z-10 uppercase"> Home</span>
                </Button>
              </Link>
                </div>
                {/* Logout */}
                <Button
                  onClick={handleLogout}
                  className="w-full mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl"
                >
                  <span className=" relative z-10">LOGOUT</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default DashboardSidebar;

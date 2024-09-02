import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice"; 
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import logo from "../../assets/images/logo.png";
import { Button } from "../ui/button";
import ThemeMode from "../ThemeMode";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);


  const routes = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/cars",
      name: "Car list",
    },
    {
      path: "/about-us",
      name: "About Us",
    },
    {
      path: "/booking",
      name: "Booking",
    },
    {
      path: "/contact-us",
      name: "Contact",
    },
  ];
  const [, setTheme] = useState<string>('light');

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);

  };

  return (
    <div className="bg-base-100 dark:text-white">
      <div className="max-w-screen-xl min-h-20 mx-auto flex items-center justify-between px-3 ">
        {/* Logo */}
        <Link to="/">
           <div className="flex text-center items-center"> <p className="font-bold text-gray-600">Car <span className="text-[#FEA633]">Rental</span></p>
           <img src={logo} className=" size-12" alt="" /></div>
        </Link>

        <ThemeMode onToggleTheme={handleThemeChange} />

        {/* Mobile device menus */}
        <div className="block lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Button className="text-xl font-medium bg-transparent p-0 bg-second hover:bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 text-[#FEA633]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between items-center">
              <SheetHeader className="w-full">
                <SheetTitle className="text-xl mb-4 ">Menu</SheetTitle>

                <div className="flex flex-col space-y-2">
                  {routes.map((route) => (
                    <SheetClose asChild key={route.path}>
                      <NavLink
                        key={route.path}
                        className={({ isActive }) =>
                          `font-medium text-gray-600 hover:text-[#FEA633] uppercase p-2 border-b ${
                            isActive && "text-[#FEA633] font-medium  uppercase"
                          }`
                        }
                        to={route.path}
                      >
                        {route.name}
                      </NavLink>
                    </SheetClose>
                  ))}
                  {user?.email && (
                    <NavLink
                      className={({ isActive }) =>
                        `font-medium text-gray-600 hover:text-[#FEA633] uppercase p-2 border-b ${
                            isActive && "text-[#FEA633] font-medium  uppercase"
                          }`
                      }
                      to={`/${user?.role}/dashboard`}
                    >
                      Dashboard
                    </NavLink>
                  )}
                </div>
              </SheetHeader>
              <SheetFooter className=" w-full">
                {!user?.email ? (
                  <Link to="/login" className="w-full">
                    <Button className="w-full mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl">
                     <span className="relative z-10">LOGIN →</span> 
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => dispatch(logout())}
                    className="w-full mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl"
                  >
                    <span className=" relative z-10">LOGOUT →</span> 
                  </Button>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Navigation menu */}
        <div className="lg:flex items-center gap-8 hidden">
          {routes.map((route) => (
            <NavLink
            key={route?.path}
            to={route?.path}
            className={({ isActive }) =>
              isActive
                ? "font-medium text-[#FEA633] uppercase" // Active class
                : "font-medium text-gray-600 hover:text-[#FEA633] uppercase" // Default class with hover
            }
          >
            {route?.name}
          </NavLink>
          ))}
          {user?.email && (
            <NavLink
               className={({ isActive }) =>
              isActive
                ? "font-medium text-[#FEA633] uppercase"
                : "font-medium text-gray-600 hover:text-[#FEA633] uppercase" 
              }
              to={`/${user?.role}/dashboard`}
            >
              Dashboard
            </NavLink>
          )}
          {!user?.email ? (
            <Link to="/login">
              <Button className="cursor-pointer bg-[#FEA633] text-white relative  overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl px-3">
              <span className="relative z-10">LOGIN</span> 
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => dispatch(logout())}
              className="cursor-pointer bg-[#FEA633] text-white relative overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold px-3"
            >
             <span className=" relative z-10">LOGOUT</span> 
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

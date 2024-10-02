import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.svg";

const navItems = [
  { id: 1, path: "/", value: "Home" },
  { id: 2, path: "/posts", value: "Posts" },
  { id: 3, path: "/about", value: "About" },
  { id: 4, path: "/contact", value: "Contact Us" },
];

const Navbar = () => {
  return (
    <div className="relative flex h-16 justify-between px-4">
      <div className="flex flex-1 items-center justify-start">
        <div className="flex flex-shrink-0 items-center">
          <img className="h-8 w-auto" src={Logo} alt="Your Company" />
        </div>
        <div className="ml-6 flex space-x-8">
          {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              style={({ isActive }) =>
                isActive ? { borderColor: "#6366f1" } : {}
              }
              className={
                "inline-flex items-center border-b-2 hover:border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
              }
            >
              {item.value}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="inset-y-0 right-0 flex items-center pr-2 inset-auto ml-6 sm:pr-0">
        {/* Profile dropdown */}
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <img
                alt=""
                src="https://lh3.googleusercontent.com/a/ACg8ocKHDO-ahUnPpzUb5rxTv3nzmEjIR1XlGncRbjqohXskGXuJzJmJ=s96-c-rg-br100"
                className="h-8 w-8 rounded-full"
              />
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
              >
                Your Profile
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
              >
                Settings
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 hover:text-red-500"
              >
                Sign out
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;

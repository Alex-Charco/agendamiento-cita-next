import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import NextLink from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const NavbarComponent = ({ menuItems = [], menuServices = [], showExtraOptions = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState({});
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error al parsear el usuario desde localStorage:", error);
      }
    }
  }, []);

  const getInitials = (user) => {
    if (!user) return "?";
    const { primer_nombre, primer_apellido } = user;
    return `${primer_nombre?.charAt(0).toUpperCase() ?? ""}${primer_apellido?.charAt(0).toUpperCase() ?? ""}`;
  };

  const getFullName = (user) => {
    if (!user) return "Datos no disponibles";
    return [
      user.primer_nombre,
      user.segundo_nombre,
      user.primer_apellido,
      user.segundo_apellido,
    ].filter(Boolean).join(" ");
  };

  const toggleSubmenu = (key) => {
    setIsSubmenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Navbar className="px-4">
      <NavbarContent className="w-full flex justify-between items-center">
        <NavbarBrand>
          <Image src="/images/logo.png" alt="Logo" className="h-11 w-auto rounded-none" />
          <p className="font-bold text-inherit mx-3">MiliSalud 17</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive href="/" className="block w-full text-left text-blue-800 font-medium p-2 hover:bg-gray-100">
            Inicio
          </NavbarItem>

          <NavbarItem>
            <NextLink href="/contacto" className="hover:bg-gray-100 text-blue-800 font-medium px-4 py-2 rounded">Contacto</NextLink>
          </NavbarItem>

          {menuItems.map((item) => (
            <NavbarItem key={item.path} href={item.path}>
              {item.name}
            </NavbarItem>
          ))}

          {menuServices.length > 0 && showExtraOptions && (
  <div className="relative">
    <button
      onClick={() => setIsServicesOpen(!isServicesOpen)}
      className="hover:bg-gray-100 px-4 py-2 rounded flex items-center justify-between gap-2 w-full text-blue-800"
    >
      Servicios
      {isServicesOpen ? (
        <FaChevronUp className="ml-2 text-gray-300 text-lg" />
      ) : (
        <FaChevronDown className="ml-2 text-gray-300 text-lg" />
      )}
    </button>
    {isServicesOpen && (
      <div className="absolute left-0 mt-2 w-56 bg-white text-gray-900 shadow-lg rounded-md z-10">
        {menuServices.map((item) =>
          item.subMenu ? (
            <div key={item.name}>
              <button
                className="w-full flex justify-between text-left text-blue-800 px-4 py-2 hover:bg-gray-100"
                onClick={() => toggleSubmenu(item.name)}
              >
                <span>{item.name}</span>
                {isSubmenuOpen[item.name] ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isSubmenuOpen[item.name] && (
                <div className="pl-4">
                  {item.subMenu.map((subItem) => (
                    <NextLink
                      key={subItem.path}
                      href={subItem.path}
                      className="block px-4 py-2 hover:bg-gray-200 text-blue-700"
                    >
                      {subItem.name}
                    </NextLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NextLink
              key={item.path}
              href={item.path}
              className="block px-4 py-2 hover:bg-gray-100 text-blue-800"
            >
              {item.name}
            </NextLink>
          )
        )}
      </div>
    )}
  </div>
)}

        </NavbarContent>

        <NavbarItem>
          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full cursor-pointer hover:bg-blue-700">
                  {getInitials(user)}
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="pt-2 text-gray-700 hover:text-gray-900 transition-colors">
                    {getFullName(user)}
                  </p>
                  <p className="py-2 font-semibold text-gray-700 hover:text-gray-900 transition-colors">
                    {user.rol?.nombre_rol}
                  </p>
                </DropdownItem>
                <DropdownItem
                  className="text-gray-600"
                  key="logout"
                  color="danger"
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/auth/login";
                  }}
                >
                  Salir
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-white font-bold rounded-full">
              ?
            </div>
          )}
        </NavbarItem>

        <NavbarMenuToggle
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarMenu className={isMenuOpen ? "block" : "hidden"}>
        <NavbarMenuItem>
          <NextLink href="/" className="block w-full text-left text-blue-800 font-medium p-2 hover:bg-gray-100">
            Inicio
          </NextLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NextLink href="/contacto" className="block w-full text-left text-blue-800 font-medium p-2 hover:bg-gray-100">
            Contacto
          </NextLink>
        </NavbarMenuItem>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.path}>
            <NextLink href={item.path} className="block w-full text-left text-blue-800 font-medium p-2 hover:bg-gray-100">
              {item.name}
            </NextLink>
          </NavbarMenuItem>
        ))}

        {menuServices.length > 0 && showExtraOptions && (
  <>
    <NavbarMenuItem>
      <button
        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
        className="w-full flex justify-between items-center text-left text-blue-800 mx-2"
      >
        <span>Servicios</span>
        {isMobileServicesOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
    </NavbarMenuItem>

    {isMobileServicesOpen &&
      menuServices.map((item) =>
        item.subMenu ? (
          <div key={item.name}>
            <NavbarMenuItem>
              <button
                onClick={() => toggleSubmenu(item.name)}
                className="flex justify-between items-center w-full text-left text-blue-800 font-medium p-2 hover:bg-gray-100"
              >
                <span>{item.name}</span>
                {isSubmenuOpen[item.name] ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </NavbarMenuItem>
            {isSubmenuOpen[item.name] && (
              <div className="pl-4 bg-gray-50">
                {item.subMenu.map((subItem) => (
                  <NavbarMenuItem key={subItem.path}>
                    <NextLink
                      href={subItem.path}
                      className="block w-full px-4 py-2 hover:bg-gray-200 text-blue-700"
                    >
                      {subItem.name}
                    </NextLink>
                  </NavbarMenuItem>
                ))}
              </div>
            )}
          </div>
        ) : (
          <NavbarMenuItem key={item.path}>
            <NextLink
              href={item.path}
              className="block w-full px-4 py-2 hover:bg-gray-100 text-blue-800"
            >
              {item.name}
            </NextLink>
          </NavbarMenuItem>
        )
      )}
  </>
)}

      </NavbarMenu>
    </Navbar>
  );
};

NavbarComponent.propTypes = {
  menuItems: PropTypes.array,
  menuServices: PropTypes.array,
  showExtraOptions: PropTypes.bool,
};

export default NavbarComponent;

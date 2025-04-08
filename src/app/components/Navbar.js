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
  Link,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
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
    return `${primer_nombre?.charAt(0).toUpperCase() ?? ""}${primer_apellido?.charAt(0).toUpperCase() ?? ""
      }`;
  };

  const getFullName = (user) => {
    if (!user) return "Datos no disponibles";
    return [
      user.primer_nombre,
      user.segundo_nombre,
      user.primer_apellido,
      user.segundo_apellido,
    ]
      .filter(Boolean)
      .join(" ");
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
          <NavbarItem isActive>
            <Link className="hover:bg-gray-200 px-4 py-2 rounded" href="/">Inicio</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="hover:bg-gray-200 px-4 py-2 rounded" href="/contacto">Contacto</Link>
          </NavbarItem>
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <Link href={item.path}>{item.name}</Link>
            </NavbarItem>
          ))}

          {menuServices.length > 0 && showExtraOptions && (

            <NavbarItem className="relative">
              <Link href="#" onPress={() => setIsServicesOpen(!isServicesOpen)} className="hover:bg-gray-200 px-4 py-2 rounded">
                Servicios
                {isMobileServicesOpen ? (
                  <FaChevronUp className="ml-2 text-fray-300 text-lg" />
                ) : (
                  <FaChevronDown className="ml-2 text-gray-300 text-lg" />
                )}
              </Link>
              {isServicesOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white text-gray-900 shadow-lg rounded-md">
                  {menuServices.map((category, index) => (
                    <div key={index}>
                      <button className="w-full flex justify-between text-left text-blue-800 px-4 py-2 hover:bg-gray-100" onClick={() => toggleSubmenu(category.name)}>
                        <span>{category.name}</span>
                        {isSubmenuOpen[category.name] ? (
                          <FaChevronUp className="text-blue-600 text-sm" />
                        ) : (
                          <FaChevronDown className="text-blue-600 text-sm" />
                        )}
                      </button>
                      {isSubmenuOpen[category.name] && (
                        <div className="pl-4 bg-gray-50">
                          {category.subMenu.map((service, subIndex) => (
                            <Link key={subIndex} href={service.path} className="block px-4 py-2 hover:bg-gray-200">
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarItem>
          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div
                  className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full cursor-pointer hover:bg-blue-700"
                >
                  {getInitials(user)}
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="text-gray-700 hover:text-gray-900 transition-colors">
                    {getFullName(user)}
                  </p>
                  <p className="font-semibold text-gray-700 hover:text-gray-900 transition-colors">
                    {user.rol?.nombre_rol}
                  </p>
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  <Link href="/auth/login">Salir</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-white font-bold rounded-full">
              ?
            </div>
          )}
        </NavbarItem>

        <NavbarMenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"} className="sm:hidden" />
      </NavbarContent>

      <NavbarMenu className={isMenuOpen ? "block" : "hidden"}>
        <NavbarMenuItem>
          <Link
            className="block w-full text-left text-blue-800 font-medium p-2 hover:bg-gray-100"
            href="/">Inicio</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="block w-full text-left text-blue-800 font-medium p-2 hover:bg-gray-100"
            href="/contacto">Contacto</Link>
        </NavbarMenuItem>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="block w-full text-left text-blue-800 font-medium p-2 hover:bg-gray-100"
              href={item.path}>{item.name}</Link>
          </NavbarMenuItem>
        ))}

        {/* Servicios en menú móvil */}
        {menuServices.length > 0 && showExtraOptions && (
          <>
            <NavbarMenuItem>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileServicesOpen(!isMobileServicesOpen);
                }}
                className="w-full flex justify-between items-center text-left font-semibold"
              >
                <span>Servicios</span>
                {isMobileServicesOpen ? (
                  <FaChevronUp className="text-blue-600 text-lg" />
                ) : (
                  <FaChevronDown className="text-blue-600 text-lg" />
                )}
              </Link>
            </NavbarMenuItem>

            {isMobileServicesOpen && (
              <div className="pl-4">
                {menuServices.map((category, index) => (
                  <div key={index}>
                    <NavbarMenuItem>
                      <button
                        onClick={() => toggleSubmenu(category.name)}
                        className="flex justify-between items-center w-full text-left text-blue-800 font-medium p-2 hover:bg-gray-100"
                      >
                        <span>{category.name}</span>
                        {isSubmenuOpen[category.name] ? (
                          <FaChevronUp className="text-blue-800 text-sm" />
                        ) : (
                          <FaChevronDown className="text-blue-800 text-sm" />
                        )}
                      </button>
                    </NavbarMenuItem>

                    {isSubmenuOpen[category.name] && (
                      <div className="pl-4 bg-gray-50">
                        {category.subMenu.map((service, subIndex) => (
                          <NavbarMenuItem key={subIndex}>
                            <Link href={service.path}
                              className="block px-4 py-2 hover:bg-gray-200">
                              {service.name}
                            </Link>
                          </NavbarMenuItem>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </NavbarMenu>

    </Navbar>
  );
};

// Validación de props con PropTypes
NavbarComponent.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })),
  menuServices: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    subMenu: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })).isRequired,
  })),
  showExtraOptions: PropTypes.bool,
};

export default NavbarComponent;

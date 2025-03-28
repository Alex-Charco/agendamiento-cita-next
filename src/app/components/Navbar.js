import React, { useState, useEffect } from "react";
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
} from "@heroui/react";

const NavbarComponent = ({ menuItems = [], menuServices = [], showExtraOptions = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);

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
    return [user.primer_nombre, user.segundo_nombre, user.primer_apellido, user.segundo_apellido]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <Navbar className="px-4">
      <NavbarContent className="w-full flex justify-between items-center">
        <NavbarBrand>
          <Image src="/images/logo.png" alt="Logo" className="h-11 w-auto rounded-none" />
          <p className="font-bold text-inherit mx-3">InnovaVida</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link href="/">Inicio</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/contacto">Contacto</Link>
          </NavbarItem>
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <Link href={item.path}>{item.name}</Link>
            </NavbarItem>
          ))}
          
          {/* Servicios */}
          {menuServices.length > 0 && showExtraOptions && (
            <NavbarItem className="relative">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Servicios ▼
              </button>
              {isServicesOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                  {menuServices.map((service, index) => (
                    <Link key={index} href={service.path} className="block px-4 py-2 hover:bg-gray-100">
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </NavbarItem>
          )}
          
          {/* Opciones del usuario */}
          {showExtraOptions && user && (
            <NavbarItem>
              <Link href="/auth/login">Salir</Link>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            {user ? (
              <div className="relative">
                <div
                  className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full cursor-pointer hover:bg-blue-700"
                  onClick={() => setIsUserInfoVisible(!isUserInfoVisible)}
                >
                  {getInitials(user)}
                </div>
                {isUserInfoVisible && (
                  <div className="absolute mt-2 bg-white/90 shadow-md rounded-md p-4 text-black text-xs max-w-[250px] w-auto transform -translate-x-24 break-words">
                    <p>{getFullName(user)}</p>
                    <p>{user.rol?.nombre_rol}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-white font-bold rounded-full">
                ?
              </div>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarMenuToggle
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarMenu className={isMenuOpen ? "block" : "hidden"}>
        <NavbarMenuItem>
          <Link href="/">Inicio</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/contacto">Contacto</Link>
        </NavbarMenuItem>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link href={item.path}>{item.name}</Link>
          </NavbarMenuItem>
        ))}
        {showExtraOptions && user && (
          <NavbarMenuItem>
            <Link href="/auth/login">Salir</Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarComponent;

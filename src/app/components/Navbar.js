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

        {/* Menú de Escritorio */}
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
              <Link
                href="#"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="hover:bg-gray-200 px-4 py-2 rounded"
              >
                Servicios ▼
			  </Link>
              {isServicesOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white text-gray-900 shadow-lg rounded-md">
                  {menuServices.map((category, index) => (
                    <div key={index}>
                      <button
                        className="w-full text-left text-blue-800 px-4 py-2 hover:bg-gray-100"
                        onClick={() => toggleSubmenu(category.name)}
                      >
                        {category.name} ▼
                      </button>
                      {isSubmenuOpen[category.name] && (
                        <div className="pl-4 bg-gray-50">
                          {category.subMenu.map((service, subIndex) => (
                            <Link
                              key={subIndex}
                              href={service.path}
                              className="block px-4 py-2 hover:bg-gray-200"
                            >
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
		  {/* Opción "Salir" en escritorio */}
          {showExtraOptions && user && (
            <NavbarItem>
              <Link 
			  className="hover:bg-gray-200 px-4 py-2 rounded"
			  href="/auth/login">Salir</Link>
            </NavbarItem>
          )}
        </NavbarContent>

        {/* Botón menú móvil */}
        <NavbarMenuToggle
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="sm:hidden"
        />
      </NavbarContent>

      {/* Menú Móvil */}
      <NavbarMenu className={isMenuOpen ? "block" : "hidden"}>
        <NavbarMenuItem>
          <Link  
		  className="w-full px-4 py-2 hover:bg-gray-100"
		  href="/">Inicio</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link 
		  className="w-full px-4 py-2 hover:bg-gray-100"
		  href="/contacto">Contacto</Link>
        </NavbarMenuItem>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link href={item.path}>{item.name}</Link>
          </NavbarMenuItem>
        ))}

        {menuServices.length > 0 && showExtraOptions && (
          <>
            <NavbarMenuItem>
              <Link
                href="#"
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="block w-full text-left font-semibold px-4 py-2 hover:bg-gray-100"
              >
                Servicios ▼
              </Link>
            </NavbarMenuItem>
            {isMobileServicesOpen && (
              <div className="pl-4">
                {menuServices.map((category, index) => (
                  <div key={index} >
                    <button
                      className="w-full text-left text-blue-800 px-4 py-2 hover:bg-gray-100"
                      onClick={() => toggleSubmenu(category.name)}
                    >
                      {category.name} ▼
                    </button>
                    {isSubmenuOpen[category.name] && (
                      <div className="pl-4 bg-gray-50">
                        {category.subMenu.map((service, subIndex) => (
                          <NavbarMenuItem key={subIndex}>
                            <Link href={service.path} className="block px-4 py-2 hover:bg-gray-200">
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
      {showExtraOptions && user && (
          <NavbarMenuItem>
            <Link 
			className="w-full px-4 py-2 hover:bg-gray-100"
			href="/auth/login">Salir</Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarComponent;


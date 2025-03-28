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

const services = [
  { name: "Consultar paciente", path: "/common/consulta-paciente" },
  { name: "Consultar médico", path: "/servicio2" },
  { name: "Consultar cita", path: "/servicio3" },
];

const NavbarComponent = ({ menuItems = [], showExtraOptions = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false); // Estado para controlar la visibilidad de la subsección

  // Función para obtener las iniciales del usuario
  const getInitials = (user) => {
    if (!user) return "?";
    const { primer_nombre, primer_apellido } = user;
    const initial1 = primer_nombre ? primer_nombre.charAt(0).toUpperCase() : "";
    const initial2 = primer_apellido ? primer_apellido.charAt(0).toUpperCase() : "";
    return `${initial1}${initial2}`;
  };

  // Función para obtener el nombre completo sin espacios innecesarios
  const getFullName = (user) => {
    if (!user) return "Datos no disponibles";
    return [user.primer_nombre, user.segundo_nombre, user.primer_apellido, user.segundo_apellido]
      .filter(Boolean) // Filtra los valores null o vacíos
      .join(" ");
  };

  // Cargar datos del usuario desde localStorage al montar el componente
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Navbar className="px-4">
      <NavbarContent className="w-full flex justify-between items-center">
        {/* Logo alineado a la izquierda */}
        <NavbarBrand>
          <Image src="/images/logo.png" alt="Logo" className="h-11 w-auto rounded-none" />
          <p className="font-bold text-inherit mx-3">InnovaVida</p>
        </NavbarBrand>

        {/* Menú de navegación principal */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link href="#" className="hover:bg-gray-100 px-3 py-2 rounded-md transition-colors">
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" className="hover:bg-gray-100 px-3 py-2 rounded-md transition-colors">
              Contacto
            </Link>
          </NavbarItem>
          
          {/* Menú desplegable de Servicios */}
          {showExtraOptions && (
            <NavbarItem className="relative">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Servicios ▼
              </button>
              <div
                className={`absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md transition-opacity ${isServicesOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
              >
                {services.map((service, index) => (
                  <Link
                    key={index}
                    href={service.path}
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </NavbarItem>
          )}

          {/* Mostrar botón "Salir" en escritorio */}
          {user && (
            <NavbarItem>
              <Link href="/auth/login" className="hover:bg-gray-100 px-3 py-2 rounded-md transition-colors">
                Salir
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>

        {/* Círculo con iniciales del usuario */}
        <NavbarContent justify="end">
          <NavbarItem>
            {user ? (
              <div className="relative">
                <div
                  className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full cursor-pointer hover:bg-blue-700"
                  onClick={() => setIsUserInfoVisible(!isUserInfoVisible)} // Al hacer clic, cambia la visibilidad
                >
                  {getInitials(user)}
                </div>
                {/* Sub-sección con el nombre completo y rol */}
                {isUserInfoVisible && (
                  <div className="absolute mt-2 bg-white/90 shadow-md rounded-md p-4 text-black text-xs max-w-[250px] w-auto transform -translate-x-24 break-words">
                    <p>{getFullName(user)}</p>
                    <p>{user.rol?.nombre_rol}</p> {/* Asegúrate de acceder a las propiedades correctamente */}
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

        {/* Menú desplegable para móviles */}
        <NavbarMenuToggle
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="sm:hidden"
        />
      </NavbarContent>

      {/* Menú móvil */}
      <NavbarMenu className={`transition-all ${isMenuOpen ? "block" : "hidden"}`}>
        <NavbarMenuItem>
          <Link href="#" className="block py-2 px-4 hover:bg-gray-100 transition-colors rounded-md">
            Inicio
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#" className="block py-2 px-4 hover:bg-gray-100 transition-colors rounded-md">
            Contacto
          </Link>
        </NavbarMenuItem>

        {/* Botón de salir en móvil */}
        {user && (
          <NavbarMenuItem>
            <Link href="/auth/login" className="block py-2 px-4 hover:bg-gray-100 transition-colors rounded-md">
              Salir
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarComponent;

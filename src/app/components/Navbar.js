"use client";

import React, { useState } from "react";
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

          {/* Opciones adicionales */}
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
              >
                {item}
              </Link>
            </NavbarItem>
          ))}

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
                className={`absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md transition-opacity ${
                  isServicesOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
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
        </NavbarContent>

        {/* Botón de salir en escritorio */}
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/auth/login" className="hover:bg-gray-100 px-3 py-2 rounded-md transition-colors">
              Salir
            </Link>
          </NavbarItem>
        </NavbarContent>

        {/* Menú desplegable para móviles */}
        <NavbarMenuToggle
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="sm:hidden"
        />
      </NavbarContent>

      {/* Menú móvil corregido con hover */}
      <NavbarMenu className={`transition-all ${isMenuOpen ? "block" : "hidden"}`}>
        {/* Links principales en móvil */}
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

        {/* Opciones adicionales en móvil */}
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              href={`/${item.toLowerCase()}`}
              className="block py-2 px-4 hover:bg-gray-100 transition-colors rounded-md"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}

        {/* Submenú de Servicios en móvil */}
        {showExtraOptions && (
          <NavbarMenuItem>
            <button
              className="w-full text-left py-2 px-4 flex justify-between items-center hover:bg-gray-100 transition-colors rounded-md"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              Servicios ▼
            </button>
            <div className={`${isServicesOpen ? "block" : "hidden"} pl-4 transition-all`}>
              {services.map((service, index) => (
                <Link
                  key={index}
                  href={service.path}
                  className="block py-2 px-4 hover:bg-gray-100 transition-colors rounded-md"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </NavbarMenuItem>
        )}

        {/* Botón de salir en móvil */}
        <NavbarMenuItem>
          <Link href="/auth/login" className="block py-2 px-4 hover:bg-gray-100 transition-colors rounded-md">
            Salir
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarComponent;

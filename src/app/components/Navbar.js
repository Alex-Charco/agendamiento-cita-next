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

const NavbarComponent = ({ menuItems = [], showExtraOptions = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar className="px-4">
      <NavbarContent className="w-full flex justify-between items-center">
        {/* Logo alineado a la izquierda */}
        <NavbarBrand>
          <Image src="/images/logo.png" alt="Logo" className="h-11 w-auto" />
          <p className="font-bold text-inherit mx-5">InnovaVida</p>
        </NavbarBrand>

        {/* Menú de navegación principal */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#">Crear cita</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#">Contacto</Link>
          </NavbarItem>

          {/* Se agregan las opciones del prop menuItems */}
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <Link href={`/${item.toLowerCase()}`}>{item}</Link>
            </NavbarItem>
          ))}

          {/* Si `showExtraOptions` es `true`, mostramos más opciones */}
          {showExtraOptions && (
            <>
              <NavbarItem>
                <Link href="#">Servicios</Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="#">Blog</Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>

        {/* Botón de salir en escritorio */}
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Salir</Link>
          </NavbarItem>
        </NavbarContent>

        {/* Menú desplegable para móviles */}
        <NavbarMenuToggle
          onClick={() => setIsMenuOpen(!isMenuOpen)} // ✅ Usamos onPress en lugar de onClick
          isMenuOpen={isMenuOpen} // ✅ Pasamos el estado del menú correctamente
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="sm:hidden"
        />
      </NavbarContent>

      {/* Menú móvil */}
      {isMenuOpen && (
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link
                className="w-full"
                href={`/${item.toLowerCase()}`}
                color={index === menuItems.length - 1 ? "danger" : "foreground"}
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    </Navbar>
  );
};

export default NavbarComponent;
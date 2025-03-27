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
          <p className="font-bold text-inherit">InnovaVida</p>
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
          onPress={() => setIsMenuOpen(!isMenuOpen)} // ✅ Usamos onPress en lugar de onClick
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






/*"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Image
} from "@heroui/react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="px-2">
      <NavbarContent className="w-full flex justify-between items-center">

        <NavbarBrand >
        <Image src="/images/logo.png" alt="Logo" className="h-11 w-auto" />
          <p className="font-bold text-inherit">InnovaVida</p>
        </NavbarBrand>


        <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
            <Link aria-current="page" href="#">
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
            Crear cita
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
            Contacto
            </Link>
          </NavbarItem>
        </NavbarContent>


        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Salir</Link>
          </NavbarItem>

        </NavbarContent>


        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>


      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
*/


/*
"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Image
} from "@heroui/react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="flex items-center ml-0">
        <Image src="/images/logo.png" alt="Logo" className="h-11 w-auto" />
          <p className="font-bold text-inherit">InnovaVida</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
*/






/*"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

const Navbar = ({ userType }) => {
  const router = useRouter();

  return (
    <nav className="bg-azul text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Hospital Plus</h1>
      <div className="flex gap-4">
        <Link href="/perfil" className="hover:underline">Perfil</Link>
        <Link href="/contacto" className="hover:underline">Contacto</Link>
        <Button
          onClick={() => router.push(userType ? `/${userType}/dashboard` : "/login")}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition"
        >
          {userType ? "Dashboard" : "Cerrar Sesión"}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
*/
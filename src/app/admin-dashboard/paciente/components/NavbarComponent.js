"use client";

import { useState } from "react";
import { FaTimes, FaSearch, FaPlus, FaCalendarAlt, FaSave } from "react-icons/fa";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Image,
  Button,
} from "@heroui/react";

export default function NavbarComponent({ buttons, onAction }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar 
      isMenuOpen={isMenuOpen} 
      onMenuOpenChange={setIsMenuOpen} 
      className="bg-gradient-to-b from-celeste-fuerte to-[#F5F7FC]"
    >
      {/* Logo a la izquierda */}
      <NavbarContent justify="start" className="flex items-center">
        <NavbarBrand>
        <Image src="/images/logo-hospital.png" alt="Logo" className="h-11 w-auto rounded-none" />
        </NavbarBrand>
      </NavbarContent>

      {/* Menú de navegación en pantallas grandes */}
      <NavbarContent className="hidden lg:flex gap-4" justify="end">
        {buttons.map(({ label, icon: Icon, action, color, textColor, hoverEffect }) => (
          <NavbarItem key={label}>
            <Button
              as="a"
              color={color}
              variant="flat"
              onClick={() => onAction(action)}  
              className={`flex items-center gap-2 ${textColor} ${hoverEffect} px-4 py-2 rounded lg:text-black`}
            >
              <Icon /> {label}
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Botón de menú en pantallas pequeñas, alineado a la derecha */}
      <NavbarContent justify="end" className="lg:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={`text-${isMenuOpen ? "red-500" : "black"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        />
      </NavbarContent>

      {/* Menú desplegable en pantallas pequeñas */}
      {isMenuOpen && (
        <NavbarMenu>
          {buttons.map(({ label, icon: Icon, action, color, textColor, hoverEffect }) => (
            <NavbarMenuItem key={label}>
              <Button
                as="a"
                color={color}
                variant="flat"
                onClick={() => onAction(action)} 
                className={`flex flex-col items-start gap-2 ${textColor} ${hoverEffect} px-4 rounded lg:flex-row lg:text-black`}
              >
                <Icon />
                <span className="lg:text-right">{label}</span>
              </Button>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    </Navbar>
  );
}

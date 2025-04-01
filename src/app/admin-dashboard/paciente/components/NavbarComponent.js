"use client";

import { useState } from "react";
import Link from "next/link";
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
        {buttons.map(({ label, icon: Icon, action, color, textColor, hoverEffect, href }) => (
          <NavbarItem key={label}>
            {href ? (
              <Link href={href} className={`flex items-center gap-2 px-4 py-2 rounded lg:text-black ${textColor} ${hoverEffect}`}>
                <Icon />
                {label}
              </Link>
            ) : (
              <Button
                as="a"
                color={color}
                variant="flat"
                onClick={() => onAction(action)}
                className={`flex items-center gap-2 px-4 py-2 rounded lg:text-black ${textColor} ${hoverEffect}`}
              >
                <Icon /> {label}
              </Button>
            )}
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Botón de menú en pantallas pequeñas */}
      <NavbarContent justify="end" className="lg:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={`text-${isMenuOpen ? "red-500" : "black"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        />
      </NavbarContent>

      {/* Menú desplegable en pantallas pequeñas */}
      {isMenuOpen && (
        <NavbarMenu className="text-left">
          {buttons.map(({ label, icon: Icon, action, color, textColor, hoverEffect, href }) => (
            <NavbarMenuItem key={label} className="w-full">
              {href ? (
                <Link href={href} className={`flex justify-start items-center gap-2 px-4 rounded w-full ${textColor} ${hoverEffect}`}>
                  <Icon />
                  <span>{label}</span>
                </Link>
              ) : (
                <Button
                  as="a"
                  color={color}
                  variant="flat"
                  onClick={() => onAction(action)}
                  className={`flex justify-start items-center gap-2 px-4 rounded w-full ${textColor} ${hoverEffect}`}
                >
                  <Icon />
                  <span>{label}</span>
                </Button>
              )}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    </Navbar>
  );
}

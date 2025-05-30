"use client";

import PropTypes from "prop-types";
import React, { useState } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import Image from "next/image";

function NavbarComponent({ title, buttons, onAction }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-gradient-to-b from-celeste-fuerte to-[#F5F7FC]"
    >

      {/* Logo + Título alineados a la izquierda */}
      <NavbarContent justify="start" className="flex items-center space-x-2">
        <NavbarBrand className="flex items-center gap-3">
          <Image
            src="/images/logo-hospital.png"
            alt="Logo"
            width={44}
            height={44}
            className="max-h-[55px] min-h-[44px] w-auto rounded-none min-w-[44px]"
          />
          <h1 className="text-lg font-semibold text-white whitespace-nowrap">
            {title}
          </h1>
        </NavbarBrand>
      </NavbarContent>


      {/* Menú de navegación en pantallas grandes */}
      <NavbarContent className="hidden lg:flex gap-4" justify="end">
        {buttons.map(({
          label,
          icon: Icon,
          action,
          color = "bg-gray-400",
          textColor = "bg-gray-100 text-black",
          hoverEffect = "hover:bg-gray-200 hover:text-gray-700",
          href
        }) => (
          <NavbarItem key={label}>
            {href ? (
              <Link
                href={href}
                className={`flex items-center gap-2 px-2 py-2 mt-4 rounded 
                transition duration-200 ease-in-out 
                shadow hover:shadow-md 
                active:scale-95 
                ${textColor} ${hoverEffect}`}
              >
                <Icon className="text-xs" />
                <span className="text-xs">{label}</span>
              </Link>
            ) : (
              <Button
                color={color}
                variant="flat"
                onClick={() => onAction(action)}
                className={`flex items-center gap-2 px-2 py-2 mt-4 rounded 
							  transition duration-200 ease-in-out 
							  shadow hover:shadow-md 
							  active:scale-95 
							  ${textColor} ${hoverEffect}`}
              >
                <Icon className="text-xs" />
                <span className="text-xs">{label}</span>
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
          {buttons.map(({
            label,
            icon: Icon,
            action,
            color = "bg-gray-400",
            textColor = "text-black",
            hoverEffect = "hover:bg-gray-200 hover:text-gray-700",
            href
          }) => (
            <NavbarMenuItem key={label} className="w-full">
              {href ? (
                <Link href={href}
                  className={`flex justify-start items-center gap-2 btn-primary px-4 rounded w-full ${textColor} ${hoverEffect}`}>
                  <Icon className="text-lg" />
                  <span>{label}</span>
                </Link>
              ) : (
                <Button
                  color={color}
                  variant="flat"
                  onClick={() => onAction(action)}
                  className={`flex justify-start items-center gap-2 btn-primary btn-primary:hover px-4 py-4 rounded w-full ${textColor} ${hoverEffect}`}
                >
                  <Icon className="text-lg" />
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

NavbarComponent.propTypes = {
  title: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      action: PropTypes.string, // o lo que sea que represente
      color: PropTypes.string,
      textColor: PropTypes.string,
      hoverEffect: PropTypes.string,
      href: PropTypes.string,
    })
  ).isRequired,
  onAction: PropTypes.func.isRequired,
};

export default NavbarComponent; 
"use client"; 
import { Button as HeroButton } from "@heroui/react";

const Button = ({ text, onPress, variant = "primary" }) => {  // Cambié onClick por onPress
  const baseStyles = "px-6 py-3 rounded-lg font-semibold shadow-md transition";
  const primaryStyles = "bg-azul text-white hover:bg-blue-700";
  const secondaryStyles = "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <HeroButton
      onPress={onPress}  // Cambié onClick por onPress
      className={`${baseStyles} ${variant === "primary" ? primaryStyles : secondaryStyles}`}
    >
      {text}
    </HeroButton>
  );
};

export default Button;

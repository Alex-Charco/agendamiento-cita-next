"use client";
import { Button as HeroButton } from "@heroui/react";

const Button = ({ text, onClick, variant = "primary" }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold shadow-md transition";
  const primaryStyles = "bg-azul text-white hover:bg-blue-700";
  const secondaryStyles = "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <HeroButton
      onClick={onClick}
      className={`${baseStyles} ${variant === "primary" ? primaryStyles : secondaryStyles}`}
    >
      {text}
    </HeroButton>
  );
};

export default Button;




/*"use client";
import { Button as HeroButton } from "@heroui/react";

const Button = ({ text, onClick }) => {
  return (
    <HeroButton
      onClick={onClick}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
    >
      {text}
    </HeroButton>
  );
};

export default Button;
*/
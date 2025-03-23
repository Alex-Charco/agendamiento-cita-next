"use client";
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

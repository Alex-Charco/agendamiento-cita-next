"use client";
import { Card } from "@heroui/react";

const CardFeature = ({ icon, title, description }) => {
  return (
    <Card className="bg-white p-6 shadow-md rounded-lg text-center">
      <h4 className="text-xl font-bold flex items-center justify-center gap-2">
        {icon} {title}
      </h4>
      <p className="text-gray-600">{description}</p>
    </Card>
  );
};

export default CardFeature;

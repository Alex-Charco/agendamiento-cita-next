"use client";
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

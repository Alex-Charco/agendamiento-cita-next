import { redirect } from "next/navigation";

export default function Home() {
  // Redirige inmediatamente a la ruta /login
  redirect('/auth/login');
}

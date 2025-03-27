import { redirect } from "next/navigation";  // Importa la función de redirección

export default function Home() {
  // Redirige inmediatamente a la ruta /login
  redirect('/auth/login');
}

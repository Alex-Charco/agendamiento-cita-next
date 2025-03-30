import RegistrarPaciente from "@/admin-dashboard/paciente/components/RegistrarPaciente";

export default function RegistrarPacientePage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Registrar Pacientes</h1>
            <RegistrarPaciente />
        </div>
    );
}

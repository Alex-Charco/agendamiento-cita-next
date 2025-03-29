import PacienteSearch from "@/admin-dashboard/paciente/components/PacienteSearch";

export default function ConsultaPacientePage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Consulta de Pacientes</h1>
            <PacienteSearch />
        </div>
    );
}

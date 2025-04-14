"use client";

import PropTypes from "prop-types";
import { useEffect } from "react";
import { useHorarioSearch } from "@/hooks/useHorarioSearch";

function HorarioSearch({ onSelectHorario }) {
    const {
        query,
        setQuery,
        fetchHorario,
        loading,
        error,
    } = useHorarioSearch(onSelectHorario);

    useEffect(() => {
        if (query.trim()) {
            localStorage.setItem("horario_query", query);
        }
    }, [query]);

    return (
        <div className="bg-gray-200 px-6 pt-10 flex flex-col items-center h-[52vh] rounded-lg">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">Buscar Horario</h1>
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Ingresar ID de horario..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full border border-gray-300 text-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={fetchHorario}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Buscar
                    </button>
                </div>

                {loading && <p className="text-blue-500 mt-4">Cargando...</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
}

HorarioSearch.propTypes = {
    onSelectHorario: PropTypes.func.isRequired,
};

export default HorarioSearch;

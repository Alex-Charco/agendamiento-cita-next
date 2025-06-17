"use client";

import React from "react";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";

export default function Search({
  query,
  setQuery,
  onBuscarClick,
  label = "No. Identificación",
  placeholder = "Ingresar identificación...",
  inputClassName = "",
  buttonClassName = "",
  loading,
  error,
}) {
  return (
    <div>
      <div className="flex flex-row items-center space-x-4">
        <p className="text-xs font-bold text-gray-600 ml-4">{label}</p>

        <div className="flex space-x-2 w-full max-w-sm">
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full border bg-white border-gray-300 text-gray-600 placeholder:text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClassName}`}
            style={{
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.1)",
            }}
          />
          <button
            onClick={onBuscarClick}
            className="bg-gray-100 text-gray-600 text-sm px-4 py-1 rounded-lg hover:bg-gray-200 flex items-center gap-2 shadow-md active:translate-y-0.5 active:shadow-inner transition-all duration-150"
          >
            <FaSearch />
            Buscar
          </button>
        </div>
      </div>

      {loading && <p className="text-blue-500 mt-4">Cargando...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

Search.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  onBuscarClick: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inputClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
};


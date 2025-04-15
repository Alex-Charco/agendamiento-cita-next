import { FaSearch } from "react-icons/fa";

const SearchInput = ({
    label = "Buscar",
    placeholder = "Buscar...",
    value,
    onChange,
    onClick,
    loading,
    error,
}) => {
    return (
        <div className="flex justify-center bg-white p-4 border rounded">
            <div className="flex flex-row items-center space-x-4">
                <p className="text-xs text-left font-bold text-gray-600 ml-4">{label}</p>
                <div className="flex space-x-2 w-full max-w-sm">
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        className="w-full border border-gray-300 text-gray-600 text-xs rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{
                            boxShadow:
                                "inset 0 2px 4px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.1)",
                        }}
                    />
                    <button
                        onClick={onClick}
                        className="bg-gray-100 text-gray-600 text-xs px-4 py-1 rounded-lg hover:bg-gray-200 flex items-center gap-2 shadow-md active:translate-y-0.5 active:shadow-inner transition-all duration-150"
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
};

export default SearchInput;
import React from "react";
import PropTypes from "prop-types";

const SubmitButton = ({
    isLoading = false,
    text = "Enviar",
    textWhenLoading = "Enviando...",
    className = "",
}) => {
    return (
        <div className="text-center">
            <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50 ${className}`}
            >
                {isLoading ? textWhenLoading : text}
            </button>
        </div>
    );
};

SubmitButton.propTypes = {
    text: PropTypes.string,
    textWhenLoading: PropTypes.string,
    isLoading: PropTypes.bool,
    className: PropTypes.string,
};

export default SubmitButton;


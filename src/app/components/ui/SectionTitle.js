import React from "react";
import PropTypes from "prop-types";
import { FaHospitalUser } from "react-icons/fa";

function SectionTitle({ icon: Icon, text }) {
    return (
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <FaHospitalUser className="text-blue-600" /> {text}
        </h2>
    );
}

SectionTitle.propTypes = {
    icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
};

export default SectionTitle;

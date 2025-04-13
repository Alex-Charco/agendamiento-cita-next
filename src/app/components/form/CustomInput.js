import { Input } from "@heroui/react";
import PropTypes from "prop-types";

function CustomInput({ name, label, placeholder, value, onChange, type = "text", isRequired = true, className = "", isReadOnly = false, }) {
	return (
		<Input
			isRequired={isRequired}
			className={`w-full ${className}`}
			label={label}
			name={name}
			placeholder={placeholder}
			type={type}
			value={value}
			readOnly={isReadOnly}
			onChange={(e) => onChange(name, e.target.value)} // Llamada a handleChange con el nombre y el valor del input
		/>
	);
}

CustomInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.any.isRequired,
	onChange: PropTypes.func.isRequired,
	type: PropTypes.string,
	isRequired: PropTypes.bool,
	className: PropTypes.string,
	isReadOnly: PropTypes.bool,
};

export default CustomInput;


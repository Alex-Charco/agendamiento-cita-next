import { Select, SelectItem } from "@heroui/react";
import PropTypes from "prop-types";

function CustomSelect({ name, label, value, onChange, items, placeholder = "Seleccionar una opción", isRequired = true }) {
	// Cambiar el valor seleccionado usando onChange
	const handleSelectionChange = (keys) => {
		onChange(name, Array.from(keys)[0]); // Llamada a handleChange con el nombre y el valor seleccionado
	};

	return (
		<Select
			isRequired={isRequired}
			className="w-full"
			label={label}
			placeholder={placeholder}
			selectedKeys={value ? [value] : []}
			onSelectionChange={handleSelectionChange} // Usamos el nuevo manejador de cambio
			items={items}
		>
			{(item) => (
				<SelectItem key={item.key} className="text-gray-600">
					{item.label}
				</SelectItem>
			)}
		</Select>
	);
}

CustomSelect.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired,
	placeholder: PropTypes.string,
	isRequired: PropTypes.bool,
};

export default CustomSelect;


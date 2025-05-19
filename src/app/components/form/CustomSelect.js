import React from "react";
import { Select, SelectItem } from "@heroui/react";
import PropTypes from "prop-types";

function CustomSelect({
	name,
	label,
	value,
	onChange,
	items,
	placeholder = "Seleccionar una opción",
	isRequired = true,
	transformValue = (val) => String(val), // convierte el valor actual a string para seleccionarlo
	parseValue = (val) => val,             // convierte la selección a booleano, número, string, etc.
}) {
	const handleSelectionChange = (keys) => {
		const selectedKey = Array.from(keys)[0];
		onChange(name, parseValue(selectedKey)); // Notifica al padre con el valor parseado
	};

	return (
		<Select
			isRequired={isRequired}
			className="w-full"
			label={label}
			placeholder={placeholder}
			selectedKeys={
				value !== null && value !== undefined ? [transformValue(value)] : []
			}
			onSelectionChange={handleSelectionChange}
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
	value: PropTypes.any,
	onChange: PropTypes.func.isRequired,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	placeholder: PropTypes.string,
	isRequired: PropTypes.bool,
	transformValue: PropTypes.func,
	parseValue: PropTypes.func,
};

export default CustomSelect;

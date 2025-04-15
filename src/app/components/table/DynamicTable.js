import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    Pagination,
} from "@heroui/react";

// Función para Capitalizar el Texto
export const capitalize = (s) => {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
};

// Componente de Tabla Genérica
export default function DynamicTable({
    columns = [], // Columnas configurables
    data = [], // Datos configurables
    rowsPerPage = 5, // Número de filas por página
    filterPlaceholder = "Buscar", // Texto del filtro de búsqueda
}) {
    const [filterValue, setFilterValue] = React.useState("");
    const [page, setPage] = React.useState(1);

    // Filtrar los datos
    const filteredItems = React.useMemo(() => {
        return data.filter((item) => {
            return columns.some((column) =>
                item[column.uid]?.toString().toLowerCase().includes(filterValue.toLowerCase())
            );
        });
    }, [data, filterValue, columns]);

    // Paginación
    const pages = Math.ceil(filteredItems.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    return (
        <div className="text-gray-600">
            {/* Filtro de Búsqueda */}
            <Input
                type="text"
                placeholder={filterPlaceholder}
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="mb-4"
            />

            {/* Tabla */}
            <Table aria-label="Tabla dinámica">
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.uid}>{column.name}</TableColumn>
                    ))}
                </TableHeader>

                <TableBody>
    {items.map((item, index) => (
        <TableRow key={index}>
            {columns.map((column) => (
                <TableCell key={column.uid}>
                    {/* Si la columna tiene una función 'render', úsala */}
                    {column.render
                        ? column.render(item)
                        : column.uid === "status"
                        ? (
                            <Chip color={item[column.uid] === "active" ? "success" : "danger"}>
                                {capitalize(item[column.uid])}
                            </Chip>
                        )
                        : item[column.uid]}
                </TableCell>
            ))}
        </TableRow>
    ))}
</TableBody>

            </Table>

            {/* Paginación */}
            <Pagination
                total={pages}
                current={page}
                onChange={setPage}
            />
        </div>
    );
}

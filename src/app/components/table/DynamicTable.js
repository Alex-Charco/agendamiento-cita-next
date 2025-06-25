import PropTypes from "prop-types";
import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Chip,
    Pagination,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@heroui/react";
import { FaSearch, FaChevronDown } from "react-icons/fa";

// Función para Capitalizar el Texto
export const capitalize = (s) => {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
};

// Componente de Tabla Genérica
export default function DynamicTable({
    columns = [],
    data = [],
    rowsPerPage = 5,
    filterPlaceholder = "Buscar",
    actionLabel = "",
    actionRoute = "/admin-dashboard/medico/consultar-medico",
    showActionButton = true,

    // 🚩 NUEVOS PARAMETROS PARA PAGINACIÓN REMOTA
    remotePagination = false,
    currentPage = 1,
    totalPages = 1,
    onPageChange = () => {},
}) {
    const [filterValue, setFilterValue] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [visibleColumns, setVisibleColumns] = React.useState(
        new Set(columns.map((c) => c.uid))
    );

    const extractText = (node) => {
        if (typeof node === 'string') return node;
        if (typeof node === 'number') return node.toString();
        if (React.isValidElement(node)) {
            return extractText(node.props.children);
        }
        if (Array.isArray(node)) {
            return node.map(extractText).join(' ');
        }
        return '';
    };

    const visibleColumnObjects = columns.filter((col) =>
        visibleColumns.has(col.uid)
    );

    // Filtrado local (se aplica en ambos modos)
		const filteredItems = React.useMemo(() => {
		if (remotePagination) {
			// Si es paginación remota, no aplicar filtro local
			return data;
		}
		return data.filter((item) =>
			visibleColumnObjects.some((column) => {
				let cellContent;
				if (column.render) {
					const rendered = column.render(item);
					cellContent = extractText(rendered);
				} else {
					cellContent = item[column.uid];
				}
				return cellContent?.toString().toLowerCase().includes(filterValue.toLowerCase());
			})
		);
	}, [data, filterValue, visibleColumnObjects, remotePagination]);

    // Paginación local (solo si no es remoto)
    const pages = remotePagination ? totalPages : Math.ceil(filteredItems.length / rowsPerPage);
    const items = React.useMemo(() => {
        if (remotePagination) return filteredItems; // Backend ya entrega datos paginados
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [filteredItems, page, remotePagination, rowsPerPage]);

    // Cambio de página
    const handlePageChange = (newPage) => {
        if (remotePagination) {
            onPageChange(newPage);
        } else {
            setPage(newPage);
        }
    };

    // Obtener el rol desde localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userRole = user?.rol?.nombre_rol || "";
    const hasPermission = userRole === "ADMINISTRADOR";

    // Redirección (si tiene actionRoute)
    const handleRedirect = () => {
        window.location.href = actionRoute;
    };

    const renderCellContent = (uid, item) => {
        const value = item[uid];
        if (uid === "status") {
            const color = value === "active" ? "success" : "danger";
            return <Chip color={color}>{capitalize(value)}</Chip>;
        }
        if (uid === "correo") {
            return value;
        }
        return typeof value === "string" ? capitalize(value) : value;
    };

    return (
        <div className="text-gray-600">
            {/* Filtros y acciones */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <Input
                    type="text"
                    placeholder={filterPlaceholder}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    startContent={<FaSearch className="text-gray-500 mr-2" />}
                    className="max-w-xs border shadow-inner rounded-2xl"
                />
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="capitalize flex items-center gap-2 text-gray-600"
                            endContent={<FaChevronDown className="text-sm" />}
                        >
                            Columnas
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        className="text-gray-600"
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectedKeys={visibleColumns}
                        selectionMode="multiple"
                        onSelectionChange={setVisibleColumns}
                    >
                        {columns.map((column) => (
                            <DropdownItem key={column.uid} className="capitalize">
                                {capitalize(column.name)}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>

                {showActionButton && actionLabel && actionRoute && (
                    <Button
                        color="primary"
                        className="text-white"
                        onClick={handleRedirect}
                        isDisabled={!hasPermission}
                    >
                        {actionLabel}
                    </Button>
                )}
            </div>

            <Table 
				aria-label="Tabla dinámica"
				pagination={!remotePagination}
				>
                <TableHeader>
                    {visibleColumnObjects.map((column) => (
                        <TableColumn key={column.uid} className="text-center">
                            {column.name}
                        </TableColumn>
                    ))}
                </TableHeader>

                <TableBody items={[]}>
                    {items.map((item, index) => (
                        <TableRow key={item.id || index}>
                            {visibleColumnObjects.map((column) => (
                                <TableCell key={column.uid} className="text-center">
                                    {column.render
                                        ? column.render(item)
                                        : renderCellContent(column.uid, item)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination
                className="py-4"
                isCompact
                showControls
                showShadow
                total={pages}
                current={remotePagination ? currentPage : page}
                onChange={handlePageChange}
            />
        </div>
    );
}

DynamicTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            uid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            render: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    rowsPerPage: PropTypes.number,
    filterPlaceholder: PropTypes.string,
    actionLabel: PropTypes.string,
    actionRoute: PropTypes.string,
    showActionButton: PropTypes.bool,

    // 🚩 Nuevos props de paginación remota
    remotePagination: PropTypes.bool,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    onPageChange: PropTypes.func,
};

DynamicTable.defaultProps = {
    rowsPerPage: 5,
    filterPlaceholder: "Buscar",
    actionLabel: "Nuevo horario",
    actionRoute: "/admin-dashboard/medico/consultar-medico",
    showActionButton: false,

    // 🚩 Nuevos default
    remotePagination: false,
    currentPage: 1,
    totalPages: 1,
    onPageChange: () => {},
};

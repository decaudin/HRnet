import { useState } from "react";
import { EmployeeData } from "../../../utils/store/employee.ts";
import { columns } from "../../../data/columns.ts";
import { SortConfig } from "../EmployeeTable";

interface EmployeeTableBodyProps {
    displayedEmployees: EmployeeData[];
    searchTerm: string;
    sortConfig: { key: keyof EmployeeData; direction: "asc" | "desc" };
    setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
};

export default function EmployeeTableBody({ displayedEmployees, searchTerm, sortConfig, setSortConfig }: EmployeeTableBodyProps) {
    
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    const handleSort = (key: keyof EmployeeData) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    return (
        <table className="table-auto w-full border-collapse">
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th 
                            key={index}
                            scope="col"
                            tabIndex={0}
                            role="columnheader"
                            aria-sort={sortConfig.key === col.key ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}
                            aria-label={`Sort by ${col.label}`}
                            onKeyDown={(e) => {if (e.key === "Enter" || e.key === " ") handleSort(col.key)}} 
                            onClick={() => handleSort(col.key)} 
                            className="border-b pb-2 relative pr-8 cursor-pointer focus:outline-none focus:border-2 focus:border-blue-500"
                        >
                            {col.label}
                            {sortConfig.key === col.key && sortConfig.direction === "asc" && (
                                <span className="absolute top-[5px] right-5 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-transparent border-b-blue-400"></span>
                            )}
                            {sortConfig.key === col.key && sortConfig.direction === "desc" && (
                                <span className="absolute bottom-[14px] right-5 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-transparent border-t-blue-400"></span>
                            )}
                            {sortConfig.key !== col.key && (
                                <>
                                    <span className="absolute top-[5px] right-5 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-transparent border-b-gray-400"></span>
                                    <span className="absolute bottom-[14px] right-5 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-transparent border-t-gray-400"></span>
                                </>
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {displayedEmployees.length > 0 ? (
                    displayedEmployees.map((employee, index) => {
                        const isEven = index % 2 === 0;
                        const isHovered = hoveredRow === index;
                        const isLastRow = index === displayedEmployees.length - 1;

                        return (
                            <tr 
                                key={index}                            
                                onMouseEnter={() => setHoveredRow(index)}
                                onMouseLeave={() => setHoveredRow(null)}
                                className={`${isHovered ? isEven ? "bg-gray-100" : "bg-gray-200" : isEven ? "bg-white" : "bg-gray-100"}`}
                            >
                                {columns.map((col) => (
                                    <td key={col.key} className={`border-b ${isLastRow ? "border-black" : "border-gray-300"} p-2 ${sortConfig.key === col.key ? isHovered ? "bg-gray-300" : "bg-gray-200" : ""}`}>
                                        {employee[col.key]}
                                    </td>
                                ))}
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan={columns.length} className="text-center border-b p-4">
                            {searchTerm ? "No matching records found" : "No data available in table"}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
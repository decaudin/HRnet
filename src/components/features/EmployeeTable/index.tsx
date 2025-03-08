import { useState, useMemo } from "react";
import { EmployeeData, useEmployeeStore } from "../../../utils/store/employee.ts";
import EmployeeTableHeader from "../EmpoyeeTableHeader";
import EmployeeTableBody from "../EmployeeTableBody";
import EmployeeTableFooter from "../EmployeeTableFooter";

export interface SortConfig {
    key: keyof EmployeeData;
    direction: 'asc' | 'desc';
};

export default function EmployeeTable() {

    const employees = useEmployeeStore((state) => state.employees);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'firstName', direction: 'asc' });

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
    };

    const sortedEmployees = useMemo(() => {
        const filteredEmployees = searchTerm ? employees.filter((employee) =>
            Object.values(employee).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        ) : employees;
    
        return filteredEmployees.sort((a, b) => {
            let comparison = 0;
    
            if (sortConfig.key === 'zipCode') {
                comparison = Number(a.zipCode) - Number(b.zipCode);
            } else if (sortConfig.key === 'birthDate' || sortConfig.key === 'startDate') {
                const dateA = new Date(a[sortConfig.key]).getTime();
                const dateB = new Date(b[sortConfig.key]).getTime();
                comparison = dateA - dateB;
            } else {
                comparison = a[sortConfig.key].localeCompare(b[sortConfig.key]);
            }
    
            if (comparison === 0) {
                comparison = a.firstName.localeCompare(b.firstName);
            }

            if (comparison === 0) {
                comparison = a.lastName.localeCompare(b.lastName);
            }
            
            if (comparison === 0) {
                const dateA = new Date(a.startDate).getTime();
                const dateB = new Date(b.startDate).getTime();
                comparison = dateA - dateB;
            }
    
            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });
    }, [employees, searchTerm, sortConfig]);
    
    const totalEntries = sortedEmployees.length;
    const totalPages = Math.ceil(totalEntries / limit);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalEntries);

    const displayedEmployees = sortedEmployees.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="mt-8 flex flex-col w-4/5">
            <EmployeeTableHeader limit={limit} onLimitChange={handleLimitChange} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <EmployeeTableBody displayedEmployees={displayedEmployees} searchTerm={searchTerm} sortConfig={sortConfig} setSortConfig={setSortConfig} />
            <EmployeeTableFooter searchTerm={searchTerm} totalEntries={totalEntries} employeesLength={employees.length} startIndex={startIndex} endIndex={endIndex} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>
    );
}
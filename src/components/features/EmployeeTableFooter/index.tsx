interface EmployeeTableFooterProps {
    searchTerm: string;
    totalEntries: number;
    employeesLength: number;
    startIndex: number;
    endIndex: number;
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
};

export default function EmployeeTableFooter({ searchTerm, totalEntries, employeesLength, startIndex, endIndex, currentPage, totalPages, handlePageChange }: EmployeeTableFooterProps) {
    
    return (
        <div className="flex justify-between mt-4">
            {totalEntries === 0 ? (
                <span>
                    Showing 0 to 0 of 0 entries
                    {searchTerm && ` (filtered from ${employeesLength} total entries)`}
                </span>
            ) : (
                <span>
                    Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
                    {employeesLength !== totalEntries && ` (filtered from ${employeesLength} total entries)`}
                </span>
            )}
            <div>
                <button className="cursor-pointer" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                {totalEntries > 0 ? (
                    <span className="border border-gray-400 bg-gray-200 mx-2 px-4 py-2 rounded-sm">{currentPage}</span>
                ) : (
                    <span className="border border-[#FCF7E9] bg-[#FCF7E9] mx-2 px-4 py-2"></span>
                )}
                <button className="cursor-pointer" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}
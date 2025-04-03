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

    const isNextButtonDisabled = totalEntries === 0 || currentPage === totalPages;
    
    return (
        <div className="flex justify-between items-center mt-1.5">
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
                <button className={`px-4 py-1.5 rounded-sm ${currentPage === 1 ? "text-gray-500" : "cursor-pointer hover:bg-black hover:text-white"} ${totalEntries ? "" : "mr-2"}`} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-1.5 mx-0.5 rounded-sm cursor-pointer ${currentPage === index + 1 ? "border border-gray-400 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 active:ring-1 active:ring-gray-400" : "hover:bg-black hover:text-white"}`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button className={`px-4 py-1.5 rounded-sm ${isNextButtonDisabled ? "text-gray-500" : "cursor-pointer hover:bg-black hover:text-white"}`} onClick={() => handlePageChange(currentPage + 1)} disabled={isNextButtonDisabled}>
                    Next
                </button>
            </div>
        </div>
    );
}
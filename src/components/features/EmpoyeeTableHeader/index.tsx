import Select from "../../ui/Select";
import Input from "../../ui/Input";

interface EmployeeTableHeaderProps {
    limit: number;
    onLimitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export default function EmployeeTableHeader({ limit, onLimitChange, searchTerm, onSearchChange }: EmployeeTableHeaderProps) {
    
    return(
        <div className="w-full flex justify-between mb-8">
            <div>
                <label htmlFor="limit">Show</label>
                <Select id="limit" value={limit} options={[10, 25, 50, 100]} onChange={onLimitChange} className="h-[25px] border-white m-2 px-1 bg-white shadow" />
                <label htmlFor="limit">entries</label>
            </div>
            <Input id="search" label="Search :" type="search" name="" value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} wrapperClassName="flex-row items-center my-0" inputClassName="!mt-0 ml-2" />
        </div>
    )
}
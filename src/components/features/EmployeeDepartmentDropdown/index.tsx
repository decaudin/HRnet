import { Dispatch, SetStateAction } from "react";
import { CustomDropdown } from "xd-react-custom-dropdown";
import { handleStringInputChange } from "../../../utils/functions/handleStringInputChange";

interface EmployeeDepartmentDropdownProps {
    departments: Array<{
        value: string;
        label: string;
    }>;
    departmentInfo: string;
    setDepartmentInfo: Dispatch<SetStateAction<string>>;
}

export default function EmployeeDepartmentDropdown({ departments, departmentInfo, setDepartmentInfo }: EmployeeDepartmentDropdownProps) {

    const departmentOptions = departments.map((department) => ({
        value: department.value,
        label: department.label,
    }));

    return <CustomDropdown label="Department" options={departmentOptions} selected={departmentInfo} onChange={handleStringInputChange(setDepartmentInfo)} buttonClassName="focus:outline-none focus:ring-2 focus:ring-blue-700" />
}
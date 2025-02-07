import { Dispatch, SetStateAction } from "react";
import { handleStringInputChange } from "../../../utils/functions/handleStringInputChange";
import { departments } from "../../../data/departments";
import CustomDropdown from "../../ui/Dropdown";

interface EmployeeDepartmentDropdownProps {
    departmentInfo: string;
    setDepartmentInfo: Dispatch<SetStateAction<string>>;
}

const departmentOptions = departments.map((department) => ({
    value: department.value,
    label: department.label,
}));

export default function EmployeeDepartmentDropdown({ departmentInfo, setDepartmentInfo }: EmployeeDepartmentDropdownProps) {

    return <CustomDropdown label="Department" options={departmentOptions} selected={departmentInfo} onChange={handleStringInputChange(setDepartmentInfo)} />
}
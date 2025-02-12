import { Dispatch, SetStateAction } from "react";
import { CustomDropdown } from "xd-react-custom-dropdown";
import { handleStringInputChange } from "../../../utils/functions/handleStringInputChange";
import { departments } from "../../../data/departments";

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
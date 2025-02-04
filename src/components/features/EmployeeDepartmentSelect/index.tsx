import { Dispatch, SetStateAction } from "react";
import SelectInput from "../../ui/SelectInput";
import { handleStringInputChange } from "../../../utils/functions/handleStringInputChange";
import { departments } from "../../../data/departments";

interface EmployeeDepartmentSelectProps {
    departmentInfo: string;
    setDepartmentInfo: Dispatch<SetStateAction<string>>;
}

const departmentOptions = departments.map((department) => ({
    value: department.value,
    label: department.label,
}));

export default function EmployeeDepartmentSelect({ departmentInfo, setDepartmentInfo }: EmployeeDepartmentSelectProps) {

    return <SelectInput id="department" label="Department" name="department" options={departmentOptions} value={departmentInfo} onChange={handleStringInputChange(setDepartmentInfo)}/>
}
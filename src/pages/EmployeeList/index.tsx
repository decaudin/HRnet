import EmployeeTable from "../../components/features/EmployeeTable";
import Title from "../../components/ui/Title";

export default function EmployeeList() {

    return (
        <div className="flex flex-col items-center">
            <Title>Current Employees</Title>
            <EmployeeTable />
        </div>
    )
}
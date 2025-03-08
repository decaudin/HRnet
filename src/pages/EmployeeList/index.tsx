import Title from "../../components/ui/Title";
import EmployeeTable from "../../components/features/EmployeeTable";
import CustomLink from "../../components/ui/CustomLink";

export default function EmployeeList() {

    return (
        <div className="flex flex-col items-center">
            <Title>Current Employees</Title>           
            <EmployeeTable />
            <CustomLink to="/">Home</CustomLink>
        </div>
    )
}
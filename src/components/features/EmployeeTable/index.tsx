import { useEmployeeStore } from "../../../utils/store/employee.ts";
import CustomLink from "../../ui/CustomLink";

export default function EmployeeTable() {

    const employees = useEmployeeStore((state) => state.employees);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birth Date</th>
                        <th>Start Date</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.birthDate}</td>
                            <td>{employee.startDate}</td>
                            <td>{employee.street}</td>
                            <td>{employee.city}</td>
                            <td>{employee.state}</td>
                            <td>{employee.zipCode}</td>
                            <td>{employee.departmentInfo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CustomLink to="/">Home</CustomLink>
        </>
    );
}
import { useState, FormEvent } from "react";
import { states } from "../../../data/states.ts";
import EmployeeBasicForm from "../EmployeeBasicForm";
import EmployeeAdressForm from "../EmployeeAdressForm";
import EmployeeDepartmentDropdown from "../EmployeeDepartmentDropdown";
import SubmitInput from "../../ui/SubmitInput";

export default function CreateEmployeeForm() {
    
    const [basicInfo, setBasicInfo] = useState({ firstName: '', lastName: ''/*, birthDate: '', startDate: ''*/ });
    const [addressInfo, setAddressInfo] = useState({ street: '', city: '', state: states[0]?.abbreviation || '', zipCode: '' });
    const [departmentInfo, setDepartmentInfo] = useState('')

    const formData = { ...basicInfo, ...addressInfo, departmentInfo };
   
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <form className="flex flex-col items-center mx-auto pt-4 pb-8 bg-sky-100 shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.15),0px_2px_4px_0px_rgba(0,0,0,0.15)] sm:shadow-lg sm:rounded-lg sm:w-3/5 lg:w-2/5" onSubmit={handleSubmit}>
            <EmployeeBasicForm formData={basicInfo} setFormData={setBasicInfo} />
            <EmployeeAdressForm states={states} formData={addressInfo} setFormData={setAddressInfo} />
            <EmployeeDepartmentDropdown departmentInfo={departmentInfo} setDepartmentInfo={setDepartmentInfo} />
            <SubmitInput value="Save"/>
        </form>
    )
}
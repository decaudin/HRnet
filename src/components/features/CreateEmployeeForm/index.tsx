import { useState, FormEvent } from "react";
import EmployeeBasicForm from "../EmployeeBasicForm";
import EmployeeAdressForm from "../EmployeeAdressForm";
import EmployeeDepartmentSelect from "../EmployeeDepartmentSelect";
import SubmitInput from "../../ui/SubmitInput";

export default function CreateEmployeeForm() {
    
    const [basicInfo, setBasicInfo] = useState({ firstName: '', lastName: ''/*, birthDate: '', startDate: ''*/ });
    const [addressInfo, setAddressInfo] = useState({ street: '', city: '', state: ''/*, zipCode: ''*/ });
    const [departmentInfo, setDepartmentInfo] = useState('')

    const formData = { ...basicInfo, ...addressInfo, departmentInfo };
   
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <form className="flex flex-col items-center mx-auto pt-4 pb-8 bg-sky-100 shadow-lg sm:rounded-lg sm:w-3/5 lg:w-2/5" onSubmit={handleSubmit}>
            <EmployeeBasicForm formData={basicInfo} setFormData={setBasicInfo} />
            <EmployeeAdressForm formData={addressInfo} setFormData={setAddressInfo} />
            <EmployeeDepartmentSelect departmentInfo={departmentInfo} setDepartmentInfo={setDepartmentInfo} />
            <SubmitInput value="Save"/>
        </form>
    )
}
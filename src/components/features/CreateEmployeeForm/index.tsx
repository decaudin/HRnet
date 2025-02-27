import { useState, FormEvent } from "react";
import { states } from "../../../data/states.ts";
import { departments } from "../../../data/departments.ts";
import EmployeeBasicForm from "../EmployeeBasicForm";
import EmployeeAdressForm from "../EmployeeAdressForm";
import EmployeeDepartmentDropdown from "../EmployeeDepartmentDropdown";
import SubmitInput from "../../ui/SubmitInput";
import Modal from "../../ui/Modal/index.tsx";

export default function CreateEmployeeForm() {
    
    const [basicInfo, setBasicInfo] = useState({ firstName: '', lastName: '', birthDate: '', startDate: '' });
    const [addressInfo, setAddressInfo] = useState({ street: '', city: '', state: states[0]?.abbreviation || '', zipCode: '' });
    const [departmentInfo, setDepartmentInfo] = useState(departments[0]?.value || '')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    const formData = { ...basicInfo, ...addressInfo, departmentInfo };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
    
        const newErrors: { [key: string]: boolean } = {};
        let hasError = false;
    
        (Object.keys(basicInfo) as Array<keyof typeof basicInfo>).forEach((key) => {
            if (!basicInfo[key].trim()) {
                newErrors[key] = true;
                hasError = true;
            }
        });
    
        (Object.keys(addressInfo) as Array<keyof typeof addressInfo>).forEach((key) => {
            if (!addressInfo[key].trim()) {
                newErrors[key] = true;
                hasError = true;
            }
        });
    
        if (hasError) {
            setErrors(newErrors);
            return;
        }
    
        console.log(formData);
        openModal();
    };
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center mx-auto pt-4 pb-8 bg-sky-100 shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.15),0px_2px_4px_0px_rgba(0,0,0,0.15)] sm:shadow-lg sm:rounded-lg sm:w-3/5 lg:w-2/5">
            <EmployeeBasicForm formData={basicInfo} setFormData={setBasicInfo} errors={errors} setErrors={setErrors} />
            <EmployeeAdressForm states={states} formData={addressInfo} setFormData={setAddressInfo} errors={errors} setErrors={setErrors} />
            <EmployeeDepartmentDropdown departments={departments} departmentInfo={departmentInfo} setDepartmentInfo={setDepartmentInfo} />
            <SubmitInput value="Save"/>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-label="Success check mark">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
                <div role="status" aria-live="assertive">Employee successfully created!</div>
            </Modal>
        </form>
    )
}
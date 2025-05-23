import { useState, FormEvent } from "react";
import { states } from "../../../data/states.ts";
import { departments } from "../../../data/departments.ts";
import { useEmployeeStore } from "../../../utils/store/employee.ts";
import EmployeeBasicForm from "../EmployeeBasicForm";
import EmployeeAdressForm from "../EmployeeAdressForm";
import EmployeeDepartmentDropdown from "../EmployeeDepartmentDropdown";
import SubmitButton from "../../ui/SubmitButton";
import Modal from "../../ui/Modal";

export default function CreateEmployeeForm() {
    
    const [basicInfo, setBasicInfo] = useState({ firstName: '', lastName: '', birthDate: '', startDate: '' });
    const [addressInfo, setAddressInfo] = useState({ street: '', city: '', state: states[0]?.abbreviation || '', zipCode: '' });
    const [departmentInfo, setDepartmentInfo] = useState(departments[0]?.value || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [textErrors, setTextErrors] = useState<{ [key: string]: boolean }>({});
    const [emptyErrors, setEmptyErrors] = useState<{ [key: string]: boolean }>({});
    const [isStartDateUnder18Error, setIsStartDateUnder18Error] = useState(false);
    const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

    const addEmployee = useEmployeeStore((state) => state.addEmployee);
    const formData = { ...basicInfo, ...addressInfo, departmentInfo };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    const hasStartedBefore18 = (birthDate: Date | null, startDate: Date | null): boolean => {
        if (!birthDate || !startDate) return false;
    
        const eighteenthBirthday = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());
        const normalizedStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    
        return normalizedStartDate < eighteenthBirthday;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
    
        const newEmptyErrors: { [key: string]: boolean } = {};
        let hasEmptyError = false;
    
        (Object.keys(basicInfo) as Array<keyof typeof basicInfo>).forEach((key) => {
            if (!basicInfo[key].trim()) {
                newEmptyErrors[key] = true;
                hasEmptyError = true;
            };
        });
    
        (Object.keys(addressInfo) as Array<keyof typeof addressInfo>).forEach((key) => {
            if (!addressInfo[key].trim()) {
                newEmptyErrors[key] = true;
                hasEmptyError = true;
            };
        });   

        const isUnder18 = hasStartedBefore18(new Date(formData.birthDate), new Date(formData.startDate));
        setIsStartDateUnder18Error(isUnder18);

        if (isUnder18) {
            setBasicInfo((prev) => ({ ...prev, startDate: '' }));
            setTimeout(() => setIsStartDateUnder18Error(false), 100);
        };

        if (hasEmptyError || isUnder18) {
            setEmptyErrors(newEmptyErrors);
            setTextErrors({});
            return;
        };
    
        setIsSubmittedSuccessfully(true);
        addEmployee(formData);
        openModal();

        setBasicInfo({ firstName: '', lastName: '', birthDate: '', startDate: '' });
        setAddressInfo({ street: '', city: '', state: states[0]?.abbreviation || '', zipCode: '' });
        setDepartmentInfo(departments[0]?.value || '');

        setTimeout(() => setIsSubmittedSuccessfully(false), 100);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center mx-auto pt-4 pb-8 bg-sky-100 shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.15),0px_2px_4px_0px_rgba(0,0,0,0.15)] sm:shadow-lg sm:rounded-lg sm:w-3/5 lg:w-2/5">
            <EmployeeBasicForm formData={basicInfo} setFormData={setBasicInfo} emptyErrors={emptyErrors} setEmptyErrors={setEmptyErrors} textErrors={textErrors} setTextErrors={setTextErrors} isStartDateUnder18Error={isStartDateUnder18Error} isSubmittedSuccessfully={isSubmittedSuccessfully} />
            <EmployeeAdressForm states={states} formData={addressInfo} setFormData={setAddressInfo} emptyErrors={emptyErrors} setEmptyErrors={setEmptyErrors} textErrors={textErrors} setTextErrors={setTextErrors} />
            <EmployeeDepartmentDropdown departments={departments} departmentInfo={departmentInfo} setDepartmentInfo={setDepartmentInfo} />
            <SubmitButton>Save</SubmitButton>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-label="Success check mark">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
                <div role="status" aria-live="assertive">Employee successfully created!</div>
            </Modal>
        </form>
    )
}
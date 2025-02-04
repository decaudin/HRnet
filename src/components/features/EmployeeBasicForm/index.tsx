import { Dispatch, SetStateAction } from "react";
import { handleObjectInputChange } from "../../../utils/functions/handleObjectInputChange";
import Input from "../../ui/Input";

interface EmployeeBasicFormProps {
    formData: {
        firstName: string;
        lastName: string;
    };
    setFormData: Dispatch<SetStateAction<{
        firstName: string;
        lastName: string;
    }>>;
}

export default function EmployeeBasicForm({formData, setFormData}: EmployeeBasicFormProps) {

    return (
        <>
            <Input id="firstName" label="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleObjectInputChange(setFormData)} />
            <Input id="lastName" label="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleObjectInputChange(setFormData)} />
        </>
    )
}
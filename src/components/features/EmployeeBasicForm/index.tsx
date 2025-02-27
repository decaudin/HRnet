import { Dispatch, SetStateAction } from "react";
import { handleObjectInputChange } from "../../../utils/functions/handleObjectInputChange";
import Input from "../../ui/Input";
import DatePicker from "../../ui/DatePicker";
import { formatDate } from "../../../utils/functions/formatDate";

interface EmployeeBasicFormProps {
    formData: {
        firstName: string;
        lastName: string;
        birthDate: string;
        startDate: string;
    };
    setFormData: Dispatch<SetStateAction<{
        firstName: string;
        lastName: string;
        birthDate: string;
        startDate: string;
    }>>;
    errors: { [key:string]: boolean };
}

export default function EmployeeBasicForm({formData, setFormData, errors }: EmployeeBasicFormProps) {

    return (
        <>
            <Input id="firstName" label="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleObjectInputChange(setFormData)} isError={errors.firstName} />
            <Input id="lastName" label="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleObjectInputChange(setFormData)} isError={errors.lastName} />
            <DatePicker onChange={(date) => setFormData({ ...formData, birthDate: formatDate(date) })} inputId="birthDate" inputLabel="Date of Birth" inputName="birthDate" isError={errors.birthDate} />
            <DatePicker onChange={(date) => setFormData({ ...formData, startDate: formatDate(date) })} inputId="startDate" inputLabel="Start Date" inputName="startDate" isError={errors.startDate} /> 
        </>
    )
}
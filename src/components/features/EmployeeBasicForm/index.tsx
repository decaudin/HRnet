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
    setErrors: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
}

export default function EmployeeBasicForm({formData, setFormData, errors, setErrors }: EmployeeBasicFormProps) {

    return (
        <>
            <Input id="firstName" label="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleObjectInputChange(setFormData, setErrors)} isError={errors.firstName} />
            <Input id="lastName" label="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleObjectInputChange(setFormData, setErrors)} isError={errors.lastName} />
            <DatePicker onChange={(date) => setFormData({ ...formData, birthDate: formatDate(date) })} inputId="birthDate" inputLabel="Date of Birth" inputName="birthDate" errorKey="birthDate" isError={errors.birthDate} setErrors={setErrors} />
            <DatePicker onChange={(date) => setFormData({ ...formData, startDate: formatDate(date) })} inputId="startDate" inputLabel="Start Date" inputName="startDate" errorKey="startDate" isError={errors.startDate} setErrors={setErrors} /> 
        </>
    )
}
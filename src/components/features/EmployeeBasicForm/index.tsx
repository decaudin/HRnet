import { Dispatch, SetStateAction } from "react";
import { handleObjectInputChange } from "../../../utils/functions/handleObjectInputChange";
import { handleBlur, validateNoDigitsOrSpecialChars } from "../../../utils/functions/handleBlur";
import { formatDate } from "../../../utils/functions/formatDate";
import Input from "../../ui/Input";
import DatePicker from "../../ui/DatePicker";

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
    emptyErrors: { [key:string]: boolean };
    setEmptyErrors: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
    textErrors: { [key:string]: boolean};
    setTextErrors: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
    isSubmittedSuccessfully: boolean;
}

export default function EmployeeBasicForm({formData, setFormData, emptyErrors, setEmptyErrors, textErrors, setTextErrors, isSubmittedSuccessfully }: EmployeeBasicFormProps) {

    return (
        <>
            <Input id="firstName" label="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleObjectInputChange(setFormData, setEmptyErrors)} onBlur={(e) => handleBlur({ e, setTextErrors, setFormData, validate: validateNoDigitsOrSpecialChars })} isEmptyError={emptyErrors.firstName} isTextError={textErrors.firstName} />
            <Input id="lastName" label="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleObjectInputChange(setFormData, setEmptyErrors)} onBlur={(e) => handleBlur({ e, setTextErrors, setFormData, validate: validateNoDigitsOrSpecialChars})} isEmptyError={emptyErrors.lastName} isTextError={textErrors.lastName} />
            <DatePicker onChange={(date) => setFormData({ ...formData, birthDate: formatDate(date) })} inputId="birthDate" inputLabel="Date of Birth" inputName="birthDate" errorKey="birthDate" isEmptyError={emptyErrors.birthDate} setEmptyErrors={setEmptyErrors} isSubmittedSuccessfully={isSubmittedSuccessfully} />
            <DatePicker onChange={(date) => setFormData({ ...formData, startDate: formatDate(date) })} inputId="startDate" inputLabel="Start Date" inputName="startDate" errorKey="startDate" isEmptyError={emptyErrors.startDate} setEmptyErrors={setEmptyErrors} isSubmittedSuccessfully={isSubmittedSuccessfully} /> 
        </>
    )
}
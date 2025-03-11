import { Dispatch, SetStateAction } from "react";
import { CustomDropdown } from "xd-react-custom-dropdown";
import { handleObjectInputChange } from "../../../utils/functions/handleObjectInputChange";
import { handleBlur, validateNoDigitsOrSpecialChars, validateNoSpecialChars } from "../../../utils/functions/handleBlur";
import Input from "../../ui/Input";

interface EmployeeAdressFormProps {
    states: Array<{
        name: string;
        abbreviation: string;
    }>;
    formData: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    setFormData: Dispatch<SetStateAction<{
        street: string;
        city: string;
        state: string;
        zipCode: string;
    }>>;
    emptyErrors: { [key:string]: boolean };
    setEmptyErrors: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
    textErrors: { [key:string]: boolean};
    setTextErrors: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
}

export default function EmployeeAdressForm({ states, formData, setFormData, emptyErrors, setEmptyErrors, textErrors, setTextErrors }: EmployeeAdressFormProps) {

    const stateOptions = states.map((state) => ({
        value: state.abbreviation,
        label: state.name,
    }));
    
    return (
        <div className="relative border px-4 py-4 mt-8 mb-6">
            <p className="absolute left-4 top-[-14px] px-1 bg-sky-100">Address</p>
            <Input id="street" label="Street" type="text" name="street" value={formData.street} onChange={handleObjectInputChange(setFormData, setEmptyErrors)} onBlur={(e) =>handleBlur({ e, setTextErrors, setFormData, validate: validateNoSpecialChars})} isEmptyError={emptyErrors.street} isTextError={textErrors.street} />
            <Input id="city" label="City" type="text" name="city" value={formData.city} onChange={handleObjectInputChange(setFormData, setEmptyErrors)} onBlur={(e) => handleBlur({ e, setTextErrors, setFormData, validate: validateNoDigitsOrSpecialChars })} isEmptyError={emptyErrors.city} isTextError={textErrors.city} />
            <CustomDropdown label="State" options={stateOptions} selected={formData.state} onChange={handleObjectInputChange(setFormData)} wrapperClassName="z-1" buttonClassName="focus:outline-none focus:ring-2 focus:ring-blue-700" />
            <Input id="zipCode" label="Zip Code" type="number" name="zipCode" value={formData.zipCode} onChange={handleObjectInputChange(setFormData, setEmptyErrors)} isEmptyError={emptyErrors.zipCode}/>
        </div>
    )
}
import { Dispatch, SetStateAction } from "react";
import { CustomDropdown } from "xd-react-custom-dropdown";
import { handleObjectInputChange } from "../../../utils/functions/handleObjectInputChange/index.tsx";
import Input from "../../ui/Input"

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
    errors: { [key:string]: boolean };
    setErrors: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
}

export default function EmployeeAdressForm({ states, formData, setFormData, errors, setErrors }: EmployeeAdressFormProps) {

    const stateOptions = states.map((state) => ({
        value: state.abbreviation,
        label: state.name,
    }));
    
    return (
        <div className="relative border px-4 py-4 mt-8 mb-6">
            <p className="absolute left-4 top-[-14px] px-1 bg-sky-100">Address</p>
            <Input id="street" label="Street" type="text" name="street" value={formData.street} onChange={handleObjectInputChange(setFormData, setErrors)} isError={errors.street} />
            <Input id="city" label="City" type="text" name="city" value={formData.city} onChange={handleObjectInputChange(setFormData, setErrors)} isError={errors.city} />
            <CustomDropdown label="State" options={stateOptions} selected={formData.state} onChange={handleObjectInputChange(setFormData)} wrapperClassName="z-1" />
            <Input id="zipCode" label="Zip Code" type="number" name="zipCode" value={formData.zipCode} onChange={handleObjectInputChange(setFormData, setErrors)} isError={errors.zipCode}/>
        </div>
    )
}
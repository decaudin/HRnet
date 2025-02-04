import { Dispatch, SetStateAction } from "react";
import { handleObjectInputChange } from "../../../utils/functions/handleObjectInputChange/index.tsx";
import Input from "../../ui/Input"
import SelectInput from "../../ui/SelectInput";
import { states } from "../../../data/states.ts";

interface EmployeeAdressFormProps {
    formData: {
        street: string;
        city: string;
        state: string;
    };
    setFormData: Dispatch<SetStateAction<{
        street: string;
        city: string;
        state: string;
    }>>;
}

export default function EmployeeAdressForm({ formData, setFormData }: EmployeeAdressFormProps) {

    const stateOptions = states.map((state) => ({
        value: state.abbreviation,
        label: state.name,
    }));
    
    return (
        <div className="relative border px-4 py-4 my-4">
            <p className="absolute left-4 bottom-58 px-1 bg-sky-100">Address</p>
            <Input id="street" label="Street" type="text" name="street" value={formData.street} onChange={handleObjectInputChange(setFormData)} />
            <Input id="city" label="City" type="text" name="city" value={formData.city} onChange={handleObjectInputChange(setFormData)} />
            <SelectInput id="state" label="State" name="state" options={stateOptions} value={formData.state} onChange={handleObjectInputChange(setFormData)}/>
        </div>
    )
}
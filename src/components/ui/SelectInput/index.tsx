interface Option {
    value: string;
    label: string;
}

interface SelectInputProps {
    id: string;
    label: string;
    name: string;
    options: Option[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectInput({ id, label, name, value, onChange, options }: SelectInputProps) {
  
    return (
        <div className="flex flex-col">
            <label htmlFor={id}>{label}</label>
            <select className="w-[260px] border border-gray-400 bg-gray-100 hover:bg-gray-200 rounded mt-2 p-2 font-sans cursor-pointer" id={id} name={name} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
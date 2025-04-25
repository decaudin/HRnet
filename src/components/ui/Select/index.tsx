interface SelectProps {
    value: string | number;
    options: (string | number)[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    id?: string;
    className?: string;
}
  
  export default function Select({ value, options, onChange, id, className = "" }: SelectProps) {

    return (
        <select id={id} value={value} onChange={onChange} className={`border cursor-pointer ${className}`}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};
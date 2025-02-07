interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    wrapperClassName?: string;
}

export default function Input({ id, label, type, name, value, onChange, wrapperClassName = "", ...props }: InputProps) {

    return (
        <div className={`flex flex-col my-2 ${wrapperClassName}`}>
            <label htmlFor={id}>
                {label}
            </label>
            <input className="pl-2 pr-1 mt-2 w-[180px] bg-white shadow" type={type} id={id} name={name} value={value} onChange={onChange} {...props} />
        </div>
    );
}

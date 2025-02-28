interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    wrapperClassName?: string;
    isError?: boolean;
}

export default function Input({ id, label, type, name, value, onChange, wrapperClassName = "", isError, ...props }: InputProps) {

    return (
        <div className={`flex flex-col my-2 ${wrapperClassName}`}>
            <label htmlFor={id}>
                {label}
            </label>
            <input type={type} id={id} name={name} value={value} onChange={onChange} className={`pl-2 pr-1 mt-2 w-[180px] bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-700 ${isError && "border border-red-500 focus:ring-red-500"}`} {...props} />
            {isError && <p className="text-red-500 mt-2">This field is required</p>}
        </div>
    );
}
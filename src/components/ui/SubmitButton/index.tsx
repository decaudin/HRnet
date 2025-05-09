interface SubmitButtonProps {
    children: React.ReactNode;
}

export default function SubmitButton({ children }: SubmitButtonProps) {

    return (
        <button type="submit" className="border bg-gray-100 px-2 mx-auto mt-8 cursor-pointer hover:bg-gray-200">
            {children}
        </button>
    )
}
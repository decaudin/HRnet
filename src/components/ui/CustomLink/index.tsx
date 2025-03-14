import { Link } from "react-router-dom";

type LinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

export default function CustomLink({ to, children, className="" }: LinkProps) {

    return (
        <Link to={to} className={`border border-gray-400 mx-auto mt-6 mb-8 px-4 py-2 bg-gray-200 rounded-xl shadow hover:bg-gray-300 ${className}`}>
            {children}
        </Link>
    );
}
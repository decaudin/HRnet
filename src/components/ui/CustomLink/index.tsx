import { Link } from "react-router-dom";

type LinkProps = {
  to: string;
  children: React.ReactNode;
};

export default function CustomLink({ to, children }: LinkProps) {

    return (
        <Link to={to} className="border border-gray-400 mb-6 mx-auto my-4 px-4 py-2 bg-gray-200 rounded-xl shadow hover:bg-gray-300">
            {children}
        </Link>
    );
}
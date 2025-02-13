import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import Title from "../../ui/Title";

export default function HomeHeader() {

    return (
        <div className="flex flex-col text-center">
            <div className="flex items-center mx-auto mb-4 w-4/5 justify-between md:w-3/5">
                <img src={logo} alt="logo" className="w-18 h-auto" />
                <Title heading="HRnet" />
            </div>
            <Link to="/employee-list" className="w-[196px] border border-gray-400 mb-6 mx-auto my-4 px-4 py-2 bg-gray-200 rounded-xl shadow hover:bg-gray-300">View Current Employees</Link>
            <h2 className="font-bold text-2xl my-2 mb-6">Create Employee</h2>
        </div>
    )
}
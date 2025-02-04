import { Link } from "react-router-dom";
import Title from "../../ui/Title";
import logo from "../../../assets/logo.png";

export default function HomeHeader() {

    return (
        <div className="flex flex-col text-center">
            <div className="flex items-center mx-auto mb-4 w-4/5 justify-between md:w-3/5">
                <img className="w-18 h-auto" src={logo} alt="logo" />
                <Title heading="HRnet" />
            </div>
            <Link className="border border-gray-400 !text-black mb-6 w-[196px] mx-auto my-4 px-4 py-2 bg-gray-200 rounded-xl shadow hover:bg-gray-300" to="/employee-list" >View Current Employees</Link>
            <h2 className="font-bold text-2xl my-2 mb-6">Create Employee</h2>
        </div>
    )
}
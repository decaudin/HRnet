import logo from "../../../assets/logo.png";
import Title from "../../ui/Title";
import CustomLink from "../../ui/CustomLink";

export default function HomeHeader() {

    return (
        <div className="flex flex-col text-center">
            <div className="flex items-center mx-auto mb-4 w-4/5 justify-between md:w-3/5">
                <img src={logo} alt="logo" className="w-18 h-auto" />
                <Title>HRnet</Title>
            </div>
            <CustomLink to="/employee-list">View Current Employees</CustomLink>
            <h2 className="font-bold text-2xl my-2 mb-6">Create Employee</h2>
        </div>
    )
}
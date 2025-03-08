import { EmployeeData } from "../utils/store/employee";

export const columns: Array<{ label: string; key: keyof EmployeeData }> = [
    { 
        label: "First Name", 
        key: "firstName" 
    },
    { 
        label: "Last Name", 
        key: "lastName" 
    },
    { 
        label: "Start Date", 
        key: "startDate" 
    },
    { 
        label: "Department", 
        key: "departmentInfo" 
    },
    { 
        label: "Birth Date", 
        key: "birthDate" 
    },
    { 
        label: "Street", 
        key: "street" 
    },
    { 
        label: "City", 
        key: "city" 
    },
    { 
        label: "State", 
        key: "state" 
    },
    { 
        label: "Zip Code", 
        key: "zipCode" 
    }
];
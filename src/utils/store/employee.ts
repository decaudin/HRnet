import { create } from "zustand";
import { persist } from "zustand/middleware";

type EmployeeData = {
    firstName: string;
    lastName: string;
    birthDate: string;
    startDate: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    departmentInfo: string;
};

type Store = {
    employees: EmployeeData[];
    addEmployee: (employee: EmployeeData) => void;
};

export const useEmployeeStore = create<Store>()(
    persist(
        (set) => ({
            employees: [],
            addEmployee: (employee) =>
                set((state) => ({ employees: [...state.employees, employee] })),
        }),
        {
            name: "employee-storage",
        }
    )
);
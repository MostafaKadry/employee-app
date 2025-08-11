"use client";
import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMPANIES":
      return { ...state, companies: action.payload };
    case "ADD_COMPANY":
      return { ...state, companies: [...state.companies, action.payload] };
    case "UPDATE_COMPANY":
      return {
        ...state,
        companies: state.companies.map((company) =>
          company.name === action.payload.name ? action.payload : company
        ),
      };
    case "DELETE_COMPANY":
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company.name !== action.payload
        ),
      };

    case "SET_DEPARTMENTS":
      return { ...state, departments: action.payload };
    case "ADD_DEPARTMENT":
      return { ...state, departments: [...state.departments, action.payload] };
    case "UPDATE_DEPARTMENT":
      return {
        ...state,
        departments: state.departments.map((dept) =>
          dept.id === action.payload.id ? action.payload : dept
        ),
      };
    case "DELETE_DEPARTMENT":
      return {
        ...state,
        departments: state.departments.filter(
          (dept) => dept.id !== action.payload
        ),
      };

    case "SET_EMPLOYEES":
      return { ...state, employees: action.payload };
    case "ADD_EMPLOYEE":
      return { ...state, employees: [...state.employees, action.payload] };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };
    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.payload),
      };

    default:
      return state;
  }
};

const initialState = {
  companies: [],
  departments: [],
  employees: [],
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Company actions
  const addCompany = (company) => {
    const newCompany = { ...company, id: Date.now() };
    dispatch({ type: "ADD_COMPANY", payload: newCompany });
    toast.success("Company added successfully");
  };

  const updateCompany = (company) => {
    dispatch({ type: "UPDATE_COMPANY", payload: company });
    toast.success("Company updated successfully");
  };

  const deleteCompany = (id) => {
    dispatch({ type: "DELETE_COMPANY", payload: id });
    toast.success("Company deleted successfully");
  };

  // Department actions
  const addDepartment = (department) => {
    const company = state.companies.find((c) => c.id === department.companyId);
    const newDepartment = {
      ...department,
      id: Date.now(),
      companyName: company?.name || "",
    };
    dispatch({ type: "ADD_DEPARTMENT", payload: newDepartment });
    toast.success("Department added successfully");
  };

  const updateDepartment = (department) => {
    const company = state.companies.find((c) => c.id === department.companyId);
    const updatedDepartment = {
      ...department,
      companyName: company?.name || "",
    };
    dispatch({ type: "UPDATE_DEPARTMENT", payload: updatedDepartment });
    toast.success("Department updated successfully");
  };

  const deleteDepartment = (id) => {
    dispatch({ type: "DELETE_DEPARTMENT", payload: id });
    toast.success("Department deleted successfully");
  };

  // Employee actions
  const addEmployee = (employee) => {
    const department = state.departments.find(
      (d) => d.id === employee.departmentId
    );
    const company = state.companies.find((c) => c.id === employee.companyId);
    const newEmployee = {
      ...employee,
      id: Date.now(),
      departmentName: department?.name || "",
      companyName: company?.name || "",
    };
    dispatch({ type: "ADD_EMPLOYEE", payload: newEmployee });
    toast.success("Employee added successfully");
  };

  const updateEmployee = (employee) => {
    const department = state.departments.find(
      (d) => d.id === employee.departmentId
    );
    const company = state.companies.find((c) => c.id === employee.companyId);
    const updatedEmployee = {
      ...employee,
      departmentName: department?.name || "",
      companyName: company?.name || "",
    };
    dispatch({ type: "UPDATE_EMPLOYEE", payload: updatedEmployee });
    toast.success("Employee updated successfully");
  };

  const deleteEmployee = (id) => {
    dispatch({ type: "DELETE_EMPLOYEE", payload: id });
    toast.success("Employee deleted successfully");
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        addCompany,
        updateCompany,
        deleteCompany,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

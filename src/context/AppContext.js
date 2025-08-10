'use client';
import { createContext, useContext, useReducer } from 'react';
import toast from 'react-hot-toast';

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COMPANIES':
      return { ...state, companies: action.payload };
    case 'ADD_COMPANY':
      return { ...state, companies: [...state.companies, action.payload] };
    case 'UPDATE_COMPANY':
      return {
        ...state,
        companies: state.companies.map(company =>
          company.id === action.payload.id ? action.payload : company
        ),
      };
    case 'DELETE_COMPANY':
      return {
        ...state,
        companies: state.companies.filter(company => company.id !== action.payload),
      };
    
    case 'SET_DEPARTMENTS':
      return { ...state, departments: action.payload };
    case 'ADD_DEPARTMENT':
      return { ...state, departments: [...state.departments, action.payload] };
    case 'UPDATE_DEPARTMENT':
      return {
        ...state,
        departments: state.departments.map(dept =>
          dept.id === action.payload.id ? action.payload : dept
        ),
      };
    case 'DELETE_DEPARTMENT':
      return {
        ...state,
        departments: state.departments.filter(dept => dept.id !== action.payload),
      };
    
    case 'SET_EMPLOYEES':
      return { ...state, employees: action.payload };
    case 'ADD_EMPLOYEE':
      return { ...state, employees: [...state.employees, action.payload] };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(emp =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter(emp => emp.id !== action.payload),
      };
    
    default:
      return state;
  }
};

const initialState = {
  companies: [
    { id: 1, name: 'Tech Corp', address: '123 Tech Street', phone: '+1234567890', email: 'contact@techcorp.com' },
    { id: 2, name: 'Innovation Ltd', address: '456 Innovation Ave', phone: '+1987654321', email: 'info@innovation.com' },
  ],
  departments: [
    { id: 1, name: 'Engineering', description: 'Software development team', companyId: 1, companyName: 'Tech Corp' },
    { id: 2, name: 'Marketing', description: 'Marketing and sales team', companyId: 1, companyName: 'Tech Corp' },
    { id: 3, name: 'HR', description: 'Human resources department', companyId: 2, companyName: 'Innovation Ltd' },
  ],
  employees: [
    { 
      id: 1, 
      firstName: 'John', 
      lastName: 'Doe', 
      email: 'john.doe@techcorp.com', 
      phone: '+1234567890', 
      position: 'Senior Developer', 
      departmentId: 1, 
      departmentName: 'Engineering',
      companyId: 1,
      companyName: 'Tech Corp',
      hireDate: '2023-01-15'
    },
    { 
      id: 2, 
      firstName: 'Jane', 
      lastName: 'Smith', 
      email: 'jane.smith@techcorp.com', 
      phone: '+1234567891', 
      position: 'Marketing Manager', 
      departmentId: 2, 
      departmentName: 'Marketing',
      companyId: 1,
      companyName: 'Tech Corp',
      hireDate: '2023-02-20'
    },
    { 
      id: 3, 
      firstName: 'Bob', 
      lastName: 'Johnson', 
      email: 'bob.johnson@innovation.com', 
      phone: '+1234567892', 
      position: 'HR Specialist', 
      departmentId: 3, 
      departmentName: 'HR',
      companyId: 2,
      companyName: 'Innovation Ltd',
      hireDate: '2023-03-10'
    },
  ],
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Company actions
  const addCompany = (company) => {
    const newCompany = { ...company, id: Date.now() };
    dispatch({ type: 'ADD_COMPANY', payload: newCompany });
    toast.success('Company added successfully');
  };

  const updateCompany = (company) => {
    dispatch({ type: 'UPDATE_COMPANY', payload: company });
    toast.success('Company updated successfully');
  };

  const deleteCompany = (id) => {
    dispatch({ type: 'DELETE_COMPANY', payload: id });
    toast.success('Company deleted successfully');
  };

  // Department actions
  const addDepartment = (department) => {
    const company = state.companies.find(c => c.id === department.companyId);
    const newDepartment = { 
      ...department, 
      id: Date.now(),
      companyName: company?.name || ''
    };
    dispatch({ type: 'ADD_DEPARTMENT', payload: newDepartment });
    toast.success('Department added successfully');
  };

  const updateDepartment = (department) => {
    const company = state.companies.find(c => c.id === department.companyId);
    const updatedDepartment = { 
      ...department,
      companyName: company?.name || ''
    };
    dispatch({ type: 'UPDATE_DEPARTMENT', payload: updatedDepartment });
    toast.success('Department updated successfully');
  };

  const deleteDepartment = (id) => {
    dispatch({ type: 'DELETE_DEPARTMENT', payload: id });
    toast.success('Department deleted successfully');
  };

  // Employee actions
  const addEmployee = (employee) => {
    const department = state.departments.find(d => d.id === employee.departmentId);
    const company = state.companies.find(c => c.id === employee.companyId);
    const newEmployee = { 
      ...employee, 
      id: Date.now(),
      departmentName: department?.name || '',
      companyName: company?.name || ''
    };
    dispatch({ type: 'ADD_EMPLOYEE', payload: newEmployee });
    toast.success('Employee added successfully');
  };

  const updateEmployee = (employee) => {
    const department = state.departments.find(d => d.id === employee.departmentId);
    const company = state.companies.find(c => c.id === employee.companyId);
    const updatedEmployee = { 
      ...employee,
      departmentName: department?.name || '',
      companyName: company?.name || ''
    };
    dispatch({ type: 'UPDATE_EMPLOYEE', payload: updatedEmployee });
    toast.success('Employee updated successfully');
  };

  const deleteEmployee = (id) => {
    dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
    toast.success('Employee deleted successfully');
  };

  return (
    <AppContext.Provider value={{
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
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
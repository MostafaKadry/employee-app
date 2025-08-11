import instance from "../apiConfig";
const BASE_ROUTE = "v2/document";


export const getAllEmployees = () => instance.get(`${BASE_ROUTE}/Employee/?fields=["*"]`);
export const getEmployeeById = (id) => instance.get(`${BASE_ROUTE}/Employee/${id}`);
export const createEmployee = (employee) => instance.post(`${BASE_ROUTE}/Employee`, employee);
export const updateEmployee = (employee) => instance.put(`${BASE_ROUTE}/Employee/${employee.name}`, employee);
export const deleteEmployee = (id) => instance.delete(`${BASE_ROUTE}/Employee/${id}`);


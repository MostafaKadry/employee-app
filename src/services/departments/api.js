import instance from "../apiConfig";
const BASE_ROUTE = "v2/document";


export const getAllDepartments = () => instance.get(`${BASE_ROUTE}/Department/?fields=["*"]`);
export const getDepartmentById = (id) => instance.get(`${BASE_ROUTE}/Department/${id}`);
export const createDepartment = (department) => instance.post(`${BASE_ROUTE}/Department`, department);
export const updateDepartment = (department) => instance.put(`${BASE_ROUTE}/Department/${department.name}`, department);
export const deleteDepartment = (id) => instance.delete(`${BASE_ROUTE}/Department/${id}`);


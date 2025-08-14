import instance from "../apiConfig";
const BASE_ROUTE = "method/employee_app.employee_app.api.department.";


export const getAllDepartments = () => instance.get(`${BASE_ROUTE}list_departments`);
export const getDepartmentById = (id) => instance.get(`${BASE_ROUTE}get_department/?name=${id}`);
export const createDepartment = (department) => instance.post(`${BASE_ROUTE}create_department`, department);
export const updateDepartment = (department) => instance.put(`${BASE_ROUTE}update_department/?name=${department.name}`, department);
export const deleteDepartment = (id) => instance.delete(`${BASE_ROUTE}delete_department/?name=${id}`);
export const getDepartmentsCount = () => instance.get(`${BASE_ROUTE}get_all_depratments_count`)

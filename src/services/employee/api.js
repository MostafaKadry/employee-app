import instance from "../apiConfig";
const BASE_ROUTE = "method/employee_app.employee_app.api.employee.";


export const getAllEmployees = () => instance.get(`${BASE_ROUTE}list_employees`);
export const getEmployeesCount = () => instance.get(`${BASE_ROUTE}get_all_employees_count`);
export const getEmployeeById = (id) => instance.get(`${BASE_ROUTE}get_employee/?name=${id}`);
export const createEmployee = (employee) => instance.post(`${BASE_ROUTE}create_employee`, employee);
export const updateEmployee = (employee) => instance.put(`${BASE_ROUTE}update_employee/?name=${employee.name}`, employee);
export const deleteEmployee = (id) => instance.delete(`${BASE_ROUTE}delete_employee/?name=${id}`);


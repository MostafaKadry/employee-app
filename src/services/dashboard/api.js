import instance from "../apiConfig";
const EMPLOYEE_BASE_ROUTE = "method/employee_app.employee_app.api.employee.";
export const getRecentlyHiredEmployees = () => instance.get(`${EMPLOYEE_BASE_ROUTE}get_recently_hired_employees`);

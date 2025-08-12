import instance from "../apiConfig";
const BASE_ROUTE = "method/employee_app.employee_app.api.company.";


export const getAllCompanies = () => instance.get(`${BASE_ROUTE}list_companies`);
export const getCompanyById = (id) => instance.get(`${BASE_ROUTE}get_company/?name=${id}`);
export const createCompany = (company) => instance.post(`${BASE_ROUTE}create_company`, company);
export const updateCompany = (company) => {
    console.log(company)
    instance.put(`${BASE_ROUTE}update_company/?name=${company.name}`, company);}
export const deleteCompany = (id) => instance.delete(`${BASE_ROUTE}delete_company/?name=${id}`);


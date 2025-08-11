import instance from "../apiConfig";
const BASE_ROUTE = "v2/document";


export const getAllCompanies = () => instance.get(`${BASE_ROUTE}/Company/?fields=["*"]`);
export const getCompanyById = (id) => instance.get(`${BASE_ROUTE}/Company/${id}`);
export const createCompany = (company) => instance.post(`${BASE_ROUTE}/Company`, company);
export const updateCompany = (company) => instance.put(`${BASE_ROUTE}/Company/${company.name}`, company);
export const deleteCompany = (id) => instance.delete(`${BASE_ROUTE}/Company/${id}`);


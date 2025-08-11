import instance from "../apiConfig";
const BASE_ROUTE = "method";

export const login = async (credentials) => {
    try {
        console.log(credentials);
        const response = await instance.post(`${BASE_ROUTE}/login`, credentials);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};
export const logout = async () => instance.post(`${BASE_ROUTE}/logout`);
import API_ROUTES from "./apiRoutes";
import ApiService from "./ApiService";

const login = async (email, password) => {
    return ApiService.post(API_ROUTES.AUTH.login, { email, password })
};

const register = async (firstName, lastName, email, password) => {
    return ApiService.post(API_ROUTES.AUTH.register, { email, password, firstName, lastName })
};

const AUTH_API = {
    login,
    register
};

export default AUTH_API;

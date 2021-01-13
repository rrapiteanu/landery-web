import API_ROUTES from "./apiRoutes";
import ApiService from "./ApiService";

const getListings = async (): Promise<any> => {
    return ApiService.get(API_ROUTES.LANLORD.listings);
};

const getListing = async (property_id) => {
    return ApiService.get(API_ROUTES.LANLORD.listing(property_id));
};

const uploadProperty = async (data) => {
    return ApiService.post(API_ROUTES.LANLORD.uploadProperty, data);
};


const LANDLORD_API = {
    getListings,
    getListing,
    uploadProperty,
};

export default LANDLORD_API;

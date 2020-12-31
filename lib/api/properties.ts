import API_ROUTES from "./apiRoutes";
import ApiService from "./ApiService";

const getProperties = async (): Promise<any> => {
    return ApiService.get(API_ROUTES.PROPERTIES.properties);
};

const getAmenities = async (): Promise<any> => {
    return ApiService.get(API_ROUTES.PROPERTIES.amenities);
};

const getFavorites = async (): Promise<any> => {
    return ApiService.get(API_ROUTES.PROPERTIES.favorites);
};

const getProperty = async (property_id): Promise<any> => {
    return ApiService.get(API_ROUTES.PROPERTIES.property(property_id));
};

const favoriteProperty = async (property_id): Promise<any> => {
    return true

    // return ApiService.get(API_ROUTES.PROPERTIES.favoriteProperty(property_id));
};

const unfavoriteProperty = async (property_id): Promise<any> => {
    return true
    // return ApiService.get(API_ROUTES.PROPERTIES.unfavoriteProperty(property_id));
};

const PROPERTIES_API = {
    getProperties,
    getAmenities,
    getFavorites,
    getProperty,
    favoriteProperty,
    unfavoriteProperty
};

export default PROPERTIES_API;

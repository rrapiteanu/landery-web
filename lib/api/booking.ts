import API_ROUTES from "./apiRoutes";
import ApiService from "./ApiService";

const getBookings = async () => {
    return ApiService.get(API_ROUTES.BOOKING.bookings);
};

const bookProperty = async (property_id) => {
    return ApiService.get(API_ROUTES.BOOKING.bookProperty(property_id));
};

const BOOKING_API = {
    getBookings,
    bookProperty,
};

export default BOOKING_API;

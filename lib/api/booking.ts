import API_ROUTES from "./apiRoutes";
import ApiService from "./ApiService";

const getBookings = async (): Promise<any> => {
    return ApiService.get(API_ROUTES.BOOKING.bookings);
};

const getBookingsForProperty = async (property_id): Promise<any> => {
    return ApiService.get(API_ROUTES.BOOKING.bookingsForProperty(property_id));
};


const bookProperty = async (property_id, startDate, endDate): Promise<any> => {
    return ApiService.post(API_ROUTES.BOOKING.bookProperty(property_id), { startDate, endDate });
};

const BOOKING_API = {
    getBookings,
    getBookingsForProperty,
    bookProperty,
};

export default BOOKING_API;

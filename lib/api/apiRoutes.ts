const API_ROUTES = {
    AUTH: {
        register: "/register",
        login: "/login",
    },
    PROPERTIES: {
        properties: "/properties",
        amenities: "/amenities",
        favorites: "/favorites",
        favoriteProperty: property_id => {
            return `/properties/${property_id}/favorite`;
        },
        unfavoriteProperty: property_id => {
            return `/properties/${property_id}/unfavorite`;
        },
        property: property_id => {
            return `/properties/${property_id}`;
        },
    },
    LANLORD: {
        uploadProperty: "/landlord/new",
        listings: "/landlord/listings",
        listing: property_id => {
            return `/landlord/listings/${property_id}`;
        },
    },
    BOOKING: {
        bookings: "/bookings",
        bookProperty: property_id => {
            return `/properties/${property_id}/book`;
        },
    }
};

export default API_ROUTES;

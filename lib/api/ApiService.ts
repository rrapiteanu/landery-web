import axios from "axios";

const ApiService = {
    // baseRoute: "https://5fec7402595e420017c2bdf8.mockapi.io",
    baseRoute: "https://localhost:44390/api",
    currentlyLoggedInUserToken: null,

    initHeaders(userToken) {
        return new Promise((resolve, reject) => {
            if (userToken) {
                this.currentlyLoggedInUserToken = userToken;
                axios.defaults.headers.common = {
                    Authorization: `Bearer ${userToken}`
                };
                axios.defaults.headers.post["Content-Type"] = "application/json";
                axios.defaults.headers.put["Content-Type"] = "application/json";
            }
            else {
                this.currentlyLoggedInUserToken = null;
                axios.defaults.headers.common = {
                };
                axios.defaults.headers.post["Content-Type"] = "application/json";
                axios.defaults.headers.put["Content-Type"] = "application/json";
            }
            resolve(true);
        });
    },

    customImageHeaders(contentType) {
        const requestConfig = {
            headers: { "Content-Type": contentType }
        };

        return requestConfig;
    },

    handleError(error) {
        // if (window !== undefined) {
        //     if (error.response && error.response.data && error.response.data.error) {
        //         toast.error(error.response.data.error);
        //     } else if (error.message) {
        //         return toast.error(error.message);
        //     } else {
        //         toast.error("Something went wrong");
        //     }
        // }
    },

    getRoute(route) {
        return route.indexOf("http") > -1 ? route : this.baseRoute + route;
    },

    get(route, config = {}) {
        return new Promise((resolve, reject) => {
            return axios
                .get(this.getRoute(route), config)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    this.handleError(error);
                    reject(error);
                });
        });
    },

    post(route, data = null, config = {}) {
        return new Promise((resolve, reject) => {
            axios
                .post(this.getRoute(route), data, config)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    this.handleError(error);
                    reject(error);
                });
        });
    },

    put(route, data, config = {}) {
        return new Promise((resolve, reject) => {
            return axios
                .put(this.getRoute(route), data, config)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    this.handleError(error);
                    reject(error);
                });
        });
    },

    delete(route, config = {}) {
        return new Promise((resolve, reject) => {
            return axios
                .delete(this.getRoute(route), config)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    this.handleError(error);
                    reject(error);
                });
        });
    }
};

export default ApiService;

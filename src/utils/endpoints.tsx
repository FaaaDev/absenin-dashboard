import { ApiConfig } from "../data/config";

const endpoints = {
    /// Login
    login: {
      endpoint: "/v1/api/login",
      method: "POST",
      data: {},
    },

    image: {
      endpoint: ApiConfig.baseUrl+"/v1/api/upload/",
      method: "GET",
      data: {},
    },

    getAttendanceAll: {
      endpoint: "/v1/api/attendance/all",
      method: "GET",
      data: {},
    },

    getAttendanceDetail: {
      endpoint: "/v1/api/attendance/",
      method: "GET",
      data: {},
    },

    getUser: {
      endpoint: "/v1/api/user",
      method: "GET",
      data: {},
    },

    getShift: {
      endpoint: "/v1/api/shift",
      method: "GET",
      data: {},
    },

    addShift: {
      endpoint: "/v1/api/shift",
      method: "POST",
      data: {},
    },

    updateShift: {
      endpoint: "/v1/api/shift/",
      method: "PUT",
      data: {},
    },
}

export default endpoints;
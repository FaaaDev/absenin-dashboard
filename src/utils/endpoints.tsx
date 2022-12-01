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
}

export default endpoints;
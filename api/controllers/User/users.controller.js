"use strict";
const axios = require('axios');

class Users {
  async getListUsers() {
    try {
      const response = await axios.get("https://gorest.co.in/public/v1/users");
      return response;
    } catch (error) {
      console.info(`[ERROR]: ${error}`);
    }
  }

  getResponseStatus(response) {
    return response.status;
  }

  getResponseHeaders(response) {
    return response.headers;
  }

  getResponseTime(response) {
    return Number(response.headers['x-runtime'])
  }

  getTotalUsers(response) {
    return response.data.meta.pagination.total;
  }
};

module.exports = Users;
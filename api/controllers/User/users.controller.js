"use strict";
const axios = require('axios');
const urls = require('../urls');

class Users {
  /**
   * Get all users
   * @returns {Object}
   */
  async getUsersList() {
    try {
      const response = await axios.get(urls.usersBaseLink);
      return response;
    } catch (error) {
      console.info(`[ERROR]: ${error}`);
    }
  }

  /**
   * Get users by status
   * @param {String} status 
   * @returns {Object}
   */
  async getUsersByStatus(status) {
    try {
      const response = await axios.get(urls.usersBaseLink, {
        params: {
          status
        }
      });
      return response;
    } catch (error) {
      console.info(`[ERROR]: ${error}`);
    }
  }

  /**
   * Get status of response
   * @param {Object} response 
   * @returns {String}
   */
  getResponseStatus(response) {
    return response.status;
  }

  /**
   * Get headers of response
   * @param {Object} response 
   * @returns {Object}
   */
  getResponseHeaders(response) {
    return response.headers;
  }

  /**
   * Get time of response
   * @param {Object} response 
   * @returns {Number}
   */
  getResponseTime(response) {
    return Number(this.getResponseHeaders(response)['x-runtime'])
  }

  /**
   * Get total users in system
   * @param {Object} response 
   * @returns {Number}
   */
  getTotalUsers(response) {
    return response.data.meta.pagination.total;
  }
};

module.exports = Users;
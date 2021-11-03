"use strict";
const axios = require('axios');
const urls = require('../urls');
const commonHelper = require('../../helpers/common.helper');

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
   * @param {Number} page
   * @returns {Object}
   */
  async getUsersByStatus(status, page = 1) {
    try {
      const response = await axios.get(urls.usersBaseLink, {
        params: {
          status,
          page
        }
      });
      return response;
    } catch (error) {
      console.info(`[ERROR]: ${error}`);
    }
  }

  /**
   * Check that user's list only has valid status
   * @param {String} status 
   * @returns {Boolean}
   */
  async checkListOfUsersByStatus(status) {
    let response, result, arr = [], arrNumb = [], i = 0;
    response = await this.getUsersByStatus(status);

    const lastPage = this.getTotalPages(response);
    arrNumb.push(commonHelper.getRandomNumber(2, lastPage));
    arrNumb.push(lastPage);

    do {
      Object.values(response.data.data)
      .map( item => {
        arr.push(item);
      });

    response = await this.getUsersByStatus(status, arrNumb[i]);
    i++;
    } while (i <= arrNumb.length);

    arr.map( item => {
        if (item.status !== status) 
        {
          result = false;
        }
      });

      return result === false ? false: true;
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

    /**
   * Get total pages in user's list
   * @param {Object} response 
   * @returns {Number}
   */
     getTotalPages(response) {
      return response.data.meta.pagination.pages;
    }
};

module.exports = Users;
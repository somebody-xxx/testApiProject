"use strict";
const axios = require('axios');
const urls = require('../../../params/urls');
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
      console.info(`[ERROR] getUsersList: ${error}`);
    }
  }

  /**
   * Get users by status
   * @param {String} status 
   * @param {String} gender 
   * @param {Number} page
   * @returns {Object}
   */
  async getUsersWithParams(gender, status, page = 1) {
    try {
      const response = await axios.get(`${urls.usersBaseLink}?page=${page}&gender=${gender}&status=${status}`);
      return response;
    } catch (error) {
      console.info(`[ERROR] getUsersWithParams: ${error}`);
    }
  }

  /**
   * Generate array of value from user's list
   * @param {String} gender 
   * @param {String} status 
   * @returns {Array<String>}
   */
  async generateArrayWithParamsFromUsersList(gender, status) {
    let response, i = 0;
    let arr = [], arrNumb = [];

    response = await this.getUsersWithParams(gender, status);
    const lastPage = this.getTotalPages(response);
    arrNumb.push(commonHelper.getRandomNumber(2, lastPage));
    arrNumb.push(lastPage);

    while (i < arrNumb.length) {
      Object.values(response.data.data)
        .map( item => {
          arr.push(item);
      });

      response = await this.getUsersWithParams(gender, status, arrNumb[i]);
      i++;
    };

    return arr;
  }

  /**
   * Check valid status in geterated array
   * @param {Array<String>} arr 
   * @param {String} status 
   * @returns {Boolean}
   */
  checkValidStatus(arr, status) {
    let result;
    arr.map( item => {
      if (item.status !== status)
        {
          result = false;
        }
    });

    return result === false ? false : true;
  };

    /**
   * Check valid gender in geterated array
   * @param {Array<String>} arr 
   * @param {String} gender 
   * @returns {Boolean}
   */
  checkValidGender(arr, gender) {
    let result;
    arr.map( item => {
      if (item.gender !== gender)
        {
          result = false;
        }
    });

    return result === false ? false : true;
  };

    /**
   * Check valid status in geterated array
   * @param {Array<String>} arr 
   * @param {String} status 
   * @param {String} gender 
   * @returns {Boolean}
   */
  checkValidGenderAndStatus(arr, gender, status) {
    let result;
    arr.map( item => {
      if ((item.gender !== gender) && (item.status !== status))
        {
          result = false;
        }
    });

    return result === false ? false : true;
  }

    /**
   * Check that user's list only has valid status
   * @param {String} status 
   * @param {String} gender 
   * @returns {Boolean}
   */
     async checkListOfUsersByParameters(gender, status) {
      const arr = await this.generateArrayWithParamsFromUsersList(gender, status);

      if (status === '%C2%A0') {
        return this.checkValidGender(arr, gender);
      } else if (gender === '%C2%A0') {
        return this.checkValidStatus(arr, status);
      } else {
        return this.checkValidGenderAndStatus(arr, gender, status);
      }
    };
  

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

module.exports = new Users();